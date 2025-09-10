import { Wifi, Play, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DeviceStatusCardProps {
  onStartAnalysis: () => void;
  isAnalyzing: boolean;
}

export const DeviceStatusCard = ({ onStartAnalysis, isAnalyzing }: DeviceStatusCardProps) => {
  return (
    <Card className="shadow-soft">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-primary">Device Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="live-indicator">
              <div className="pulse-dot"></div>
            </div>
            <div>
              <p className="font-medium text-success">Connected</p>
              <p className="text-sm text-muted-foreground">Electronic Tongue v2.1</p>
            </div>
            <Wifi className="h-5 w-5 text-success" />
          </div>
          
          <Button 
            onClick={onStartAnalysis}
            disabled={isAnalyzing}
            className="gradient-accent text-accent-foreground shadow-accent hover:opacity-90 px-6"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Start Analysis
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};