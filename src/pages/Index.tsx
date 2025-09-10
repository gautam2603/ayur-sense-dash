import { useState } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { DeviceStatusCard } from "@/components/DeviceStatusCard";
import { LiveSensorCard } from "@/components/LiveSensorCard";
import { AnalysisResultsCard } from "@/components/AnalysisResultsCard";

const Index = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(true); // Set to true to show sample results

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    // Simulate analysis completion after 3 seconds
    setTimeout(() => {
      setIsAnalyzing(false);
      setHasResults(true);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-background flex w-full">
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top row - Device Status */}
            <DeviceStatusCard 
              onStartAnalysis={handleStartAnalysis}
              isAnalyzing={isAnalyzing}
            />
            
            {/* Middle row - Live Sensors */}
            <LiveSensorCard isAnalyzing={isAnalyzing} />
            
            {/* Bottom row - Analysis Results */}
            {hasResults && (
              <AnalysisResultsCard />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;