import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { MixIngredient } from '../types';
import { MAX_BOWL_SIZE } from '../constants';

interface BowlChartProps {
  mix: MixIngredient[];
  totalWeight: number;
}

const BowlChart: React.FC<BowlChartProps> = ({ mix, totalWeight }) => {
  // Prepare data: Add an "Empty" slice if bowl isn't full
  const remaining = MAX_BOWL_SIZE - totalWeight;
  
  const data = [
    ...mix.map(item => ({
      name: item.name,
      value: item.grams,
      color: item.color
    })),
    ...(remaining > 0 ? [{ name: 'Свободно', value: remaining, color: '#334155' }] : [])
  ];

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const item = data[index];
    // Safety check: during animations or rapid updates, index might be out of bounds
    if (!item) return null;

    if (item.name === 'Свободно' || percent < 0.05) return null;
    
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={12} fontWeight="bold">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full h-64 relative flex items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={80}
            innerRadius={40}
            fill="#8884d8"
            dataKey="value"
            stroke="none"
            isAnimationActive={true}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
             contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '8px', color: '#fff' }}
             itemStyle={{ color: '#fff' }}
             formatter={(value: number, name: string) => [name === 'Свободно' ? `${value.toFixed(1)}г свободно` : `${value}г`, name === 'Свободно' ? '' : name]}
          />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-3xl font-bold text-white drop-shadow-md">{totalWeight}г</span>
        <span className="text-xs text-slate-400 uppercase tracking-wider">из {MAX_BOWL_SIZE}г</span>
      </div>
    </div>
  );
};

export default BowlChart;