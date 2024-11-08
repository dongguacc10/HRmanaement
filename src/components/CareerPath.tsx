import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface CareerPathProps {
  currentPosition: string;
}

interface PathNode {
  title: string;
  level: string;
  timeframe: string;
  requirements: string[];
  opportunities: string[];
}

const CAREER_PATHS: PathNode[] = [
  {
    title: '初级前端工程师',
    level: 'P4-P5',
    timeframe: '0-2年',
    requirements: [
      '掌握前端基础技术栈',
      '能够独立完成业务需求开发'
    ],
    opportunities: [
      '参与业务项目开发',
      '积累实践经验'
    ]
  },
  {
    title: '高级前端工程师',
    level: 'P6-P7',
    timeframe: '3-5年',
    requirements: [
      '精通前端技术栈',
      '具备架构设计能力'
    ],
    opportunities: [
      '负责核心功能开发',
      '指导初级工程师'
    ]
  },
  {
    title: '前端架构师',
    level: 'P8',
    timeframe: '5-8年',
    requirements: [
      '深入理解前端技术体系',
      '具备团队管理能力'
    ],
    opportunities: [
      '负责技术架构设计',
      '带领团队技术创新'
    ]
  },
  {
    title: '技术专家',
    level: 'P9',
    timeframe: '8年以上',
    requirements: [
      '具备跨领域技术视野',
      '能够进行技术战略规划'
    ],
    opportunities: [
      '参与技术决策',
      '推动技术创新'
    ]
  }
];

export function CareerPath({ currentPosition }: CareerPathProps) {
  const [selectedNode, setSelectedNode] = useState<PathNode | null>(null);
  
  const currentIndex = CAREER_PATHS.findIndex(node => node.title === currentPosition);

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg p-6">
      {/* Path nodes */}
      <div className="flex items-center justify-between mb-8">
        {CAREER_PATHS.map((node, index) => {
          const isPast = index < currentIndex;
          const isCurrent = node.title === currentPosition;
          const isFuture = index > currentIndex;

          return (
            <div key={node.title} className="flex items-center">
              {/* Node */}
              <button
                className={cn(
                  "relative group",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 rounded-lg",
                  "transition-all duration-200"
                )}
                onClick={() => setSelectedNode(selectedNode?.title === node.title ? null : node)}
              >
                <div className={cn(
                  "w-32 p-3 rounded-lg text-center transition-all duration-200",
                  "hover:transform hover:scale-105",
                  isPast && "bg-gray-700 text-gray-300",
                  isCurrent && "bg-blue-600 text-white shadow-lg shadow-blue-500/30",
                  isFuture && "bg-gray-700/50 text-gray-400"
                )}>
                  <div className="text-sm font-medium mb-1">{node.title}</div>
                  <div className="text-xs opacity-80">{node.level}</div>
                </div>

                {/* Time indicator */}
                <div className={cn(
                  "absolute -bottom-6 left-1/2 transform -translate-x-1/2",
                  "text-xs whitespace-nowrap",
                  isPast && "text-gray-500",
                  isCurrent && "text-blue-400",
                  isFuture && "text-gray-600"
                )}>
                  {node.timeframe}
                </div>
              </button>

              {/* Connector */}
              {index < CAREER_PATHS.length - 1 && (
                <div className="flex-1 mx-2">
                  <ChevronRight className={cn(
                    "w-5 h-5",
                    isPast && "text-gray-600",
                    isCurrent && "text-blue-500",
                    isFuture && "text-gray-700"
                  )} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Details panel */}
      {selectedNode && (
        <div className="mt-12 bg-gray-800/50 rounded-lg p-4 animate-fadeIn">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">要求</h4>
              <ul className="space-y-2">
                {selectedNode.requirements.map((req, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 mt-1.5 mr-2 bg-gray-600 rounded-full" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">发展机会</h4>
              <ul className="space-y-2">
                {selectedNode.opportunities.map((opp, index) => (
                  <li key={index} className="flex items-start text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 mt-1.5 mr-2 bg-gray-600 rounded-full" />
                    {opp}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}