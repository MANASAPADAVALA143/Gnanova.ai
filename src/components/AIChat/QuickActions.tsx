import { QuickAction } from './types';

interface QuickActionsProps {
  suggestions: QuickAction[];
  onSelect: (suggestion: QuickAction) => void;
}

export const QuickActions = ({ suggestions, onSelect }: QuickActionsProps) => {
  if (suggestions.length === 0) return null;

  return (
    <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion.id}
            onClick={() => onSelect(suggestion)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap transition-all hover:scale-105 hover:shadow-md"
          >
            <span>{suggestion.icon}</span>
            <span>{suggestion.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
