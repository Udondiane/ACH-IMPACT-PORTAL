'use client';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  iconBgColor?: string;
}

export function MetricCard({ title, value, subtitle, icon, iconBgColor = 'bg-gray-100' }: MetricCardProps) {
  return (
    <div className="card">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {icon && (
          <div className={`p-2 rounded-lg ${iconBgColor}`}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}
