import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { RadarChart } from "@/components/RadarChart";

export const AnalysisResultsCard = () => {
  const authenticityScore = 98;
  const isAuthentic = authenticityScore >= 90;
  const noAdulterants = true;

  const rasaData = [
    { taste: "Madhura", score: 15, color: "hsl(var(--chart-madhura))" },
    { taste: "Amla", score: 8, color: "hsl(var(--chart-amla))" },
    { taste: "Lavana", score: 5, color: "hsl(var(--chart-lavana))" },
    { taste: "Katu", score: 82, color: "hsl(var(--chart-katu))" },
    { taste: "Tikta", score: 78, color: "hsl(var(--chart-tikta))" },
    { taste: "Kashaya", score: 25, color: "hsl(var(--chart-kashaya))" },
  ];

  return (
    <Card className="shadow-soft col-span-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-primary">Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Primary Result */}
          <div className="lg:col-span-1 space-y-6">
            <div className="text-center p-6 rounded-lg bg-muted/30">
              <h2 className="text-2xl font-bold text-primary mb-2">Authentic Turmeric</h2>
              <p className="text-lg text-muted-foreground">(Haridra)</p>
            </div>

            {/* Authenticity Score */}
            <div className="text-center p-6 rounded-lg bg-success/5 border border-success/20">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="hsl(var(--muted))"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="hsl(var(--success))"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - authenticityScore / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">{authenticityScore}%</div>
                    <div className="text-xs text-muted-foreground">Match</div>
                  </div>
                </div>
              </div>
              <p className="font-semibold text-success">Highly Authentic</p>
            </div>

            {/* Adulteration Alert */}
            <div className={`p-4 rounded-lg border flex items-center space-x-3 ${
              noAdulterants 
                ? "bg-success/5 border-success/20 text-success" 
                : "bg-destructive/5 border-destructive/20 text-destructive"
            }`}>
              {noAdulterants ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertTriangle className="h-5 w-5" />
              )}
              <span className="font-medium">
                {noAdulterants ? "No Adulterants Detected" : "Adulterants Found"}
              </span>
            </div>
          </div>

          {/* Rasa Profile Chart */}
          <div className="lg:col-span-2">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-primary mb-2">Rasa Profile (Taste Analysis)</h3>
              <p className="text-muted-foreground">Six Fundamental Ayurvedic Tastes</p>
            </div>
            <div className="flex justify-center">
              <RadarChart data={rasaData} />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};