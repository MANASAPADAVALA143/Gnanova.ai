import { useState, useRef, useEffect } from 'react';
import { X, Send, Paperclip, Mic, Smile } from 'lucide-react';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { QuickActions } from './QuickActions';
import { Message, QuickAction } from './types';

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isTyping: boolean;
  onSendMessage: (message: string) => void;
  suggestions: QuickAction[];
}

export const ChatWindow = ({
  isOpen,
  onClose,
  messages,
  isTyping,
  onSendMessage,
  suggestions,
}: ChatWindowProps) => {
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] animate-fadeIn"
        onClick={onClose}
      ></div>

      <div className="fixed bottom-24 right-6 w-[400px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl z-[999] flex flex-col animate-slideUpChat overflow-hidden border border-slate-200 dark:border-slate-700">
        <div className="bg-gradient-to-r from-[#667eea] to-[#764ba2] p-4 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="font-bold">Gnanova AI Assistant</h3>
              <div className="flex items-center gap-2 text-sm text-white/80">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Online • Ready to help</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
            aria-label="Close chat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {suggestions.length > 0 && (
          <QuickActions
            suggestions={suggestions}
            onSelect={(suggestion) => onSendMessage(suggestion.message)}
          />
        )}

        <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="flex items-end gap-2">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... (e.g., 'Change quiz topic')"
                className="w-full px-4 py-3 pr-24 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-[#667eea] text-slate-900 dark:text-white placeholder-slate-500"
                rows={1}
                style={{
                  minHeight: '48px',
                  maxHeight: '120px',
                }}
              />
              <div className="absolute right-2 bottom-2 flex items-center gap-1">
                <button
                  className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-slate-600 dark:text-slate-400"
                  aria-label="Attach file"
                  title="Attach file (coming soon)"
                >
                  <Paperclip className="w-4 h-4" />
                </button>
                <button
                  className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-slate-600 dark:text-slate-400"
                  aria-label="Voice input"
                  title="Voice input (coming soon)"
                >
                  <Mic className="w-4 h-4" />
                </button>
                <button
                  className="w-8 h-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center text-slate-600 dark:text-slate-400"
                  aria-label="Emoji"
                  title="Emoji (coming soon)"
                >
                  <Smile className="w-4 h-4" />
                </button>
              </div>
            </div>
            <button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="w-12 h-12 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center text-white hover:shadow-lg hover:shadow-[#667eea]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none flex-shrink-0"
              aria-label="Send message"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpChat {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .animate-slideUpChat {
          animation: slideUpChat 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </>
  );
};
