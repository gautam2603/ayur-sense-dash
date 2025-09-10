interface SensorData {
  ph: number;
  tds: number;
  temperature: number;
}

interface SensorResponse {
  success: boolean;
  data?: SensorData;
  error?: string;
}

class SensorApiService {
  private baseUrl: string;

  constructor() {
    // Default ngrok URL - user can update this
    this.baseUrl = 'https://your-ngrok-url.ngrok.io';
  }

  setBaseUrl(url: string) {
    this.baseUrl = url;
  }

  async getSensorData(): Promise<SensorResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/sensors`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return {
        success: true,
        data: {
          ph: parseFloat(data.ph) || 0,
          tds: parseInt(data.tds) || 0,
          temperature: parseFloat(data.temperature) || 0,
        }
      };
    } catch (error) {
      console.error('Failed to fetch sensor data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }
}

export const sensorApi = new SensorApiService();
export type { SensorData, SensorResponse };