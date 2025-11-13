interface DifficultyBadgeProps {
  difficulty: string;
  size?: 'sm' | 'md' | 'lg';
}

const difficultyConfig: Record<string, { stars: string; color: string; label: string }> = {
  easy: { stars: '⭐', color: 'text-green-600 dark:text-green-400', label: 'Easy' },
  medium: { stars: '⭐⭐', color: 'text-amber-600 dark:text-amber-400', label: 'Medium' },
  hard: { stars: '⭐⭐⭐', color: 'text-red-600 dark:text-red-400', label: 'Hard' },
};

const sizeClasses = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
};

export const DifficultyBadge = ({ difficulty, size = 'md' }: DifficultyBadgeProps) => {
  const config = difficultyConfig[difficulty] || difficultyConfig.medium;

  return (
    <span className={`inline-flex items-center gap-1 font-medium ${config.color} ${sizeClasses[size]}`}>
      <span>{config.stars}</span>
      <span className="capitalize">{config.label}</span>
    </span>
  );
};
