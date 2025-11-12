import { MessageCircle } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  hasUnread?: boolean;
}

export const ChatButton = ({ onClick, hasUnread = false }: ChatButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-[1000] w-16 h-16 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-full shadow-2xl hover:shadow-[#667eea]/50 hover:scale-105 transition-all duration-300 flex items-center justify-center group animate-pulse-subtle"
      aria-label="Open AI Chat Assistant"
    >
      <MessageCircle className="w-7 h-7 text-white group-hover:scale-110 transition-transform" />
      {hasUnread && (
        <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
      )}
      {hasUnread && (
        <span className="absolute top-1 right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
      )}

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% {
            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.3);
          }
          50% {
            box-shadow: 0 10px 60px rgba(102, 126, 234, 0.5);
          }
        }

        .animate-pulse-subtle {
          animation: pulse-subtle 3s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
};
