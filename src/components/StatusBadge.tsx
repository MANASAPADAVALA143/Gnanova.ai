interface StatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<string, { bg: string; text: string; icon: string; label: string }> = {
  draft: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-700 dark:text-yellow-300', icon: '📝', label: 'Draft' },
  pending_approval: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', icon: '⏰', label: 'Pending' },
  approved: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', icon: '✅', label: 'Approved' },
  published: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', icon: '🌐', label: 'Published' },
  rejected: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: '❌', label: 'Rejected' },
  scheduled: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', icon: '📅', label: 'Scheduled' },
  failed: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', icon: '⚠️', label: 'Failed' },
};

const sizeClasses = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
};

export const StatusBadge = ({ status, size = 'md' }: StatusBadgeProps) => {
  const config = statusConfig[status] || statusConfig.draft;

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${config.bg} ${config.text} ${sizeClasses[size]}`}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};
