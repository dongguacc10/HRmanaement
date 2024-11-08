import { useState, useEffect, useRef } from 'react';
import { cn } from '../lib/utils';

interface Dimension {
  key: string;
  label: string;
  weight: number;
  description?: string;
  color: string;
}

interface CompetencyRadarProps {
  dimensions: Dimension[];
  hoveredDimension: string | null;
  onHover: (key: string | null) => void;
}

export default function CompetencyRadar({ dimensions, hoveredDimension, onHover }: CompetencyRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size based on container width
    const containerWidth = container.clientWidth;
    const size = {
      width: containerWidth,
      height: 320
    };
    const padding = {
      top: 40,
      right: 40,
      bottom: 60,
      left: 50
    };

    canvas.width = size.width;
    canvas.height = size.height;

    // Clear canvas
    ctx.clearRect(0, 0, size.width, size.height);

    // Calculate dimensions
    const chartWidth = size.width - (padding.left + padding.right);
    const chartHeight = size.height - (padding.top + padding.bottom);
    const barWidth = Math.min(50, (chartWidth / dimensions.length) - 10);
    const maxBarHeight = chartHeight;

    // Draw title
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.fillText('胜任力模型', size.width / 2, 15);

    // Draw bars
    dimensions.forEach((dim, index) => {
      const x = padding.left + (chartWidth / dimensions.length) * (index + 0.5) - (barWidth / 2);
      const barHeight = (dim.weight / 100) * maxBarHeight;
      const y = size.height - padding.bottom - barHeight;

      // Draw bar
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, 4);
      ctx.fillStyle = hoveredDimension === dim.key ? 
        `${dim.color}FF` : // Full opacity when hovered
        `${dim.color}CC`; // Slight transparency when not hovered
      ctx.fill();

      // Draw percentage on top of bar
      ctx.font = 'bold 12px sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(`${dim.weight}%`, x + barWidth / 2, y - 4);

      // Draw label below bar
      ctx.font = '12px sans-serif';
      ctx.fillStyle = hoveredDimension === dim.key ? '#ffffff' : 'rgba(148, 163, 184, 0.8)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      
      // Split label into multiple lines if too long
      const maxWidth = chartWidth / dimensions.length - 8;
      const words = dim.label.split('');
      let line = '';
      let lines = [];
      
      for (let word of words) {
        const testLine = line + word;
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > maxWidth && line !== '') {
          lines.push(line);
          line = word;
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      // Draw each line of the label
      lines.forEach((line, lineIndex) => {
        ctx.fillText(
          line, 
          x + barWidth / 2, 
          size.height - padding.bottom + 8 + (lineIndex * 14)
        );
      });
    });

    // Draw grid lines
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = 1;
    
    // Draw horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = padding.top + chartHeight * (i / 10);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(size.width - padding.right, y);
      ctx.stroke();

      // Draw percentage labels
      ctx.font = '10px sans-serif';
      ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${(10 - i) * 10}%`, padding.left - 8, y);
    }

  }, [dimensions, hoveredDimension]);

  return (
    <div className="bg-gray-900/80 backdrop-blur rounded-xl p-6">
      <div ref={containerRef} className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="w-full h-[320px]"
        />
      </div>

      <div className="mt-4 space-y-2 bg-gray-900/90 backdrop-blur rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-medium text-gray-300">维度详情</h4>
        </div>
        {dimensions.map((dim) => (
          <div
            key={dim.key}
            className={cn(
              "flex items-start justify-between p-1.5 rounded-lg transition-colors",
              hoveredDimension === dim.key && "bg-gray-800/60"
            )}
            onMouseEnter={() => onHover(dim.key)}
            onMouseLeave={() => onHover(null)}
          >
            <div className="flex items-start space-x-2">
              <div 
                className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: dim.color }}
              />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-gray-300 block">{dim.label}</span>
                {dim.description && (
                  <p className="text-xs text-gray-500 mt-0.5 break-words">{dim.description}</p>
                )}
              </div>
            </div>
            <div className="text-right ml-4">
              <span className="text-xs text-gray-400 whitespace-nowrap">
                {dim.weight}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}