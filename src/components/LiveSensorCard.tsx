import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplet, Zap, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { sensorApi, SensorData } from "@/services/sensorApi";
import { ApiConfigDialog } from "@/components/ApiConfigDialog";

interface LiveSensorCardProps {
  isAnalyzing: boolean;
}

export const LiveSensorCard = ({ isAnalyzing }: LiveSensorCardProps) => {
  const [sensorData, setSensorData] = useState<SensorData>({
    ph: 6.8,
    tds: 142,
    temperature: 23.5
  });
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSensorData = async () => {
    const response = await sensorApi.getSensorData();
    
    if (response.success && response.data) {
      setSensorData(response.data);
      setIsConnected(true);
      setError(null);
    } else {
      setIsConnected(false);
      setError(response.error || 'Failed to fetch sensor data');
    }
  };

  useEffect(() => {
    if (!isAnalyzing) return;
    
    // Fetch data immediately when analysis starts
    fetchSensorData();
    
    // Then fetch every 1 second during analysis
    const interval = setInterval(fetchSensorData, 1000);

    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const sensors = [
    {
      label: "pH Level",
      value: sensorData.ph,
      unit: "",
      icon: Droplet,
      color: "text-data",
      bgColor: "bg-data/10"
    },
    {
      label: "TDS",
      value: sensorData.tds,
      unit: "ppm",
      icon: Zap,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      label: "Temperature",
      value: sensorData.temperature,
      unit: "°C",
      icon: Thermometer,
      color: "text-success",
      bgColor: "bg-success/10"
    }
  ];

  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-primary">Live Sensor Readings</CardTitle>
          <div className="flex items-center space-x-2">
            <ApiConfigDialog onUrlUpdate={() => setError(null)} />
            {isAnalyzing && (
              <Badge 
                variant="outline" 
                className={`border-0 animate-pulse ${
                  isConnected 
                    ? 'gradient-success text-success-foreground' 
                    : 'bg-destructive/10 text-destructive'
                }`}
              >
                {isConnected ? 'LIVE' : 'OFFLINE'}
              </Badge>
            )}
          </div>
        </div>
        {error && (
          <div className="flex items-center space-x-2 text-sm text-destructive">
            <AlertTriangle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sensors.map((sensor) => {
            const Icon = sensor.icon;
            return (
              <div key={sensor.label} className="flex items-center space-x-4 p-4 rounded-lg bg-muted/30">
                <div className={`p-3 rounded-full ${sensor.bgColor}`}>
                  <Icon className={`h-6 w-6 ${sensor.color}`} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{sensor.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {sensor.value} <span className="text-lg text-muted-foreground">{sensor.unit}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};