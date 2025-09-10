interface RadarChartData {
  taste: string;
  score: number;
  color: string;
}

interface RadarChartProps {
  data: RadarChartData[];
}

export const RadarChart = ({ data }: RadarChartProps) => {
  const size = 300;
  const center = size / 2;
  const maxRadius = 120;
  const levels = 5;

  // Calculate points for each data point
  const getPoint = (index: number, value: number) => {
    const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
    const radius = (value / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Generate level circles
  const levelCircles = Array.from({ length: levels }, (_, i) => {
    const radius = ((i + 1) / levels) * maxRadius;
    return (
      <circle
        key={i}
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke="hsl(var(--border))"
        strokeWidth="1"
        opacity="0.5"
      />
    );
  });

  // Generate axis lines
  const axisLines = data.map((_, index) => {
    const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
    const endX = center + maxRadius * Math.cos(angle);
    const endY = center + maxRadius * Math.sin(angle);
    
    return (
      <line
        key={index}
        x1={center}
        y1={center}
        x2={endX}
        y2={endY}
        stroke="hsl(var(--border))"
        strokeWidth="1"
        opacity="0.5"
      />
    );
  });

  // Generate data polygon
  const polygonPoints = data
    .map((item, index) => {
      const point = getPoint(index, item.score);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  // Generate labels
  const labels = data.map((item, index) => {
    const angle = (index * 2 * Math.PI) / data.length - Math.PI / 2;
    const labelRadius = maxRadius + 25;
    const x = center + labelRadius * Math.cos(angle);
    const y = center + labelRadius * Math.sin(angle);
    
    return (
      <g key={index}>
        <text
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-sm font-medium fill-foreground"
        >
          {item.taste}
        </text>
        <text
          x={x}
          y={y + 16}
          textAnchor="middle"
          dominantBaseline="central"
          className="text-xs fill-muted-foreground"
        >
          {item.score}%
        </text>
      </g>
    );
  });

  // Generate data points
  const dataPoints = data.map((item, index) => {
    const point = getPoint(index, item.score);
    return (
      <circle
        key={index}
        cx={point.x}
        cy={point.y}
        r="4"
        fill={item.color}
        stroke="white"
        strokeWidth="2"
      />
    );
  });

  return (
    <div className="flex items-center justify-center p-4">
      <svg width={size + 100} height={size + 100} className="overflow-visible">
        {/* Grid */}
        {levelCircles}
        {axisLines}
        
        {/* Data area */}
        <polygon
          points={polygonPoints}
          fill="hsl(var(--primary))"
          fillOpacity="0.1"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
        />
        
        {/* Data points */}
        {dataPoints}
        
        {/* Labels */}
        {labels}
      </svg>
    </div>
  );
};