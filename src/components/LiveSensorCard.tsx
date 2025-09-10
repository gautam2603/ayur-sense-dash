import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplet, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface LiveSensorCardProps {
  isAnalyzing: boolean;
}

export const LiveSensorCard = ({ isAnalyzing }: LiveSensorCardProps) => {
  const [sensorData, setSensorData] = useState({
    ph: 6.8,
    tds: 142,
    temperature: 23.5
  });

  useEffect(() => {
    if (!isAnalyzing) return;
    
    const interval = setInterval(() => {
      setSensorData(prev => ({
        ph: +(prev.ph + (Math.random() - 0.5) * 0.2).toFixed(1),
        tds: Math.round(prev.tds + (Math.random() - 0.5) * 10),
        temperature: +(prev.temperature + (Math.random() - 0.5) * 1).toFixed(1)
      }));
    }, 500);

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
          {isAnalyzing && (
            <Badge variant="outline" className="gradient-success text-success-foreground border-0 animate-pulse">
              LIVE
            </Badge>
          )}
        </div>
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