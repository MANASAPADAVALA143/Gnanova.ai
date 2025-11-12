import { Sparkles, User, CheckCircle2, X } from 'lucide-react';
import { Message } from './types';
import { useAuth } from '../../contexts/AuthContext';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const { profile } = useAuth();
  const isBot = message.sender === 'bot';

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  if (message.type === 'action-card') {
    return (
      <div className="flex items-start gap-3 mb-6 animate-slideUp">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 max-w-[80%]">
          <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm p-4">
            <p className="text-slate-700 dark:text-slate-300 mb-4 whitespace-pre-wrap">
              {message.content}
            </p>

            {message.metadata?.data && (
              <div className="bg-white dark:bg-slate-900 rounded-xl p-4 mb-4 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{message.metadata.data.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      {message.metadata.data.title}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {message.metadata.data.subtitle}
                    </p>
                  </div>
                </div>
                {message.metadata.data.details && (
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    {message.metadata.data.details.map((detail: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {message.metadata?.actions && message.metadata.actions.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {message.metadata.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={action.onClick}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      action.variant === 'primary'
                        ? 'bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white hover:shadow-lg'
                        : action.variant === 'danger'
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  if (message.type === 'confirmation') {
    return (
      <div className="flex items-start gap-3 mb-6 animate-slideUp">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 max-w-[80%]">
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl rounded-tl-sm p-4">
            <div className="flex items-start gap-2 mb-3">
              <span className="text-xl">⚠️</span>
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap flex-1">
                {message.content}
              </p>
            </div>

            {message.metadata?.actions && (
              <div className="flex gap-2 mt-4">
                {message.metadata.actions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={action.onClick}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                      action.variant === 'primary'
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300'
                    }`}
                  >
                    {action.variant === 'primary' ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <X className="w-4 h-4" />
                    )}
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <span className="text-xs text-slate-500 mt-1 block">
            {formatTime(message.timestamp)}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex items-start gap-3 mb-6 animate-slideUp ${
        isBot ? '' : 'flex-row-reverse'
      }`}
    >
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isBot
            ? 'bg-gradient-to-br from-[#667eea] to-[#764ba2]'
            : 'bg-slate-300 dark:bg-slate-700'
        }`}
      >
        {isBot ? (
          <Sparkles className="w-4 h-4 text-white" />
        ) : profile?.full_name ? (
          <span className="text-xs font-bold text-white">
            {profile.full_name.charAt(0).toUpperCase()}
          </span>
        ) : (
          <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
        )}
      </div>

      <div className={`flex-1 ${isBot ? 'max-w-[80%]' : 'max-w-[80%] flex flex-col items-end'}`}>
        <div
          className={`rounded-2xl p-4 ${
            isBot
              ? 'bg-slate-100 dark:bg-slate-800 rounded-tl-sm text-slate-700 dark:text-slate-300'
              : 'bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-tr-sm text-white'
          }`}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        <span className="text-xs text-slate-500 mt-1">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
};

export const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center flex-shrink-0">
        <Sparkles className="w-4 h-4 text-white" />
      </div>
      <div className="bg-slate-100 dark:bg-slate-800 rounded-2xl rounded-tl-sm p-4 px-6">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};
