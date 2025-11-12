import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';
import { Link } from 'react-router-dom';

type MetricCardProps = {
  icon: LucideIcon;
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: {
    value: string;
    positive: boolean;
  };
  link?: string;
  gradient?: string;
};

export const MetricCard = ({ icon: Icon, title, value, subtitle, trend, link, gradient }: MetricCardProps) => {
  const content = (
    <div
      className={`bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all ${
        link ? 'cursor-pointer' : ''
      } ${gradient ? 'bg-gradient-to-br' : ''} ${gradient || ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg ${gradient ? 'bg-white/20' : 'bg-indigo-50'}`}>
          <Icon className={`w-6 h-6 ${gradient ? 'text-white' : 'text-indigo-600'}`} />
        </div>
        {trend && (
          <div
            className={`flex items-center gap-1 text-sm font-medium ${
              trend.positive ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {trend.positive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {trend.value}
          </div>
        )}
      </div>

      <div className={gradient ? 'text-white' : ''}>
        <h3 className="text-sm font-medium opacity-80 mb-1">{title}</h3>
        <div className="text-3xl font-bold mb-2">{value}</div>
        {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
      </div>
    </div>
  );

  if (link) {
    return <Link to={link}>{content}</Link>;
  }

  return content;
};
