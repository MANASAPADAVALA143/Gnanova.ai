import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import { Message, QuickAction } from './types';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/useToast';

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState<QuickAction[]>([]);
  const location = useLocation();
  const { user, profile } = useAuth();
  const toast = useToast();

  useEffect(() => {
    const savedMessages = localStorage.getItem('chat-messages');
    if (savedMessages) {
      try {
        const parsed = JSON.parse(savedMessages);
        setMessages(parsed.map((m: any) => ({
          ...m,
          timestamp: new Date(m.timestamp),
        })));
      } catch (e) {
        console.error('Failed to parse saved messages');
      }
    } else if (user) {
      sendWelcomeMessage();
    }
  }, [user]);

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chat-messages', JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    updateSuggestionsForPage();
  }, [location.pathname, isOpen]);

  const sendWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      sender: 'bot',
      content: `👋 Hi ${profile?.full_name?.split(' ')[0] || 'there'}! I'm your AI marketing assistant.

I can help you:
• Regenerate content with new topics
• Update your posting schedule
• Approve or reject pending posts
• Fetch analytics and insights
• Modify brand settings

What would you like to do today?`,
      timestamp: new Date(),
      type: 'text',
    };
    setMessages([welcomeMessage]);
  };

  const updateSuggestionsForPage = () => {
    const path = location.pathname;
    let newSuggestions: QuickAction[] = [];

    if (path === '/dashboard') {
      newSuggestions = [
        { id: '1', label: 'Show pending approvals', icon: '⏰', message: 'Show me my pending approvals' },
        { id: '2', label: 'Engagement rate', icon: '📊', message: 'What\'s my engagement rate?' },
        { id: '3', label: 'Generate content', icon: '✨', message: 'Generate content for today' },
      ];
    } else if (path === '/analytics') {
      newSuggestions = [
        { id: '1', label: 'Best posts', icon: '🏆', message: 'Show me my best performing posts' },
        { id: '2', label: 'Engagement trends', icon: '📈', message: 'Show engagement trends' },
        { id: '3', label: 'Compare weeks', icon: '📊', message: 'Compare this week vs last week' },
      ];
    } else if (path === '/content') {
      newSuggestions = [
        { id: '1', label: 'Approve all', icon: '✅', message: 'Approve all pending posts' },
        { id: '2', label: 'Change topic', icon: '💡', message: 'Change quiz topic' },
        { id: '3', label: 'Reschedule', icon: '📅', message: 'Reschedule posts' },
      ];
    } else if (path === '/settings') {
      newSuggestions = [
        { id: '1', label: 'Brand colors', icon: '🎨', message: 'Update my brand colors' },
        { id: '2', label: 'Posting schedule', icon: '⏰', message: 'Change posting schedule' },
        { id: '3', label: 'Brand tone', icon: '✍️', message: 'Modify brand tone' },
      ];
    } else {
      newSuggestions = [
        { id: '1', label: 'Analytics', icon: '📊', message: 'Show my analytics' },
        { id: '2', label: 'Create content', icon: '✨', message: 'Create new content' },
        { id: '3', label: 'Approve posts', icon: '✅', message: 'Show pending approvals' },
      ];
    }

    setSuggestions(newSuggestions);
  };

  const addMessage = (message: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString(),
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const simulateBotResponse = async (userMessage: string) => {
    setIsTyping(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('pending') || lowerMessage.includes('approval')) {
      addMessage({
        sender: 'bot',
        content: 'Let me check your pending approvals...',
        type: 'action-card',
        metadata: {
          data: {
            icon: '📝',
            title: 'Pending Approvals',
            subtitle: 'You have 3 posts waiting for review',
            details: [
              'Quiz #47 - Kinematics (Today 6 PM)',
              'Reel #23 - Newton\'s Laws (Today 7 PM)',
              'Post #89 - Study Tips (Tomorrow 10 AM)',
            ],
          },
          actions: [
            {
              label: 'View All',
              variant: 'primary',
              onClick: () => {
                window.location.href = '/content';
                toast.success('Navigating to content page');
              },
            },
            {
              label: 'Approve All',
              variant: 'secondary',
              onClick: () => {
                handleBulkApproval();
              },
            },
          ],
        },
      });
    } else if (lowerMessage.includes('topic') || lowerMessage.includes('change')) {
      addMessage({
        sender: 'bot',
        content: `Sure! I can help you change the content topic.

What would you like the new topic to be? For example:
• Electromagnetism
• Thermodynamics
• Quantum Physics
• Optics`,
        type: 'text',
      });
    } else if (lowerMessage.includes('analytics') || lowerMessage.includes('engagement')) {
      addMessage({
        sender: 'bot',
        content: '📊 Here\'s your performance overview:',
        type: 'action-card',
        metadata: {
          data: {
            icon: '📈',
            title: 'Analytics Summary',
            subtitle: 'Last 7 days',
            details: [
              '❤️ 1,234 total likes (+15%)',
              '💬 342 comments (+8%)',
              '🔄 89 shares (+22%)',
              '📊 4.2% engagement rate',
            ],
          },
          actions: [
            {
              label: 'View Details',
              variant: 'primary',
              onClick: () => {
                window.location.href = '/analytics';
                toast.success('Navigating to analytics');
              },
            },
            {
              label: 'Best Posts',
              variant: 'secondary',
              onClick: () => {
                addMessage({
                  sender: 'user',
                  content: 'Show me my best posts',
                  type: 'text',
                });
                setTimeout(() => simulateBotResponse('best posts'), 100);
              },
            },
          ],
        },
      });
    } else if (lowerMessage.includes('best') || lowerMessage.includes('top')) {
      addMessage({
        sender: 'bot',
        content: '🏆 Your top 3 posts this month:',
        type: 'action-card',
        metadata: {
          data: {
            icon: '⭐',
            title: 'Top Performing Content',
            subtitle: 'Based on engagement',
            details: [
              '1. Quiz #44 - Newton\'s Laws (5.8% engagement)',
              '2. Reel #21 - Physics Fails (4.9% engagement)',
              '3. Quote #12 - Einstein (4.2% engagement)',
            ],
          },
          actions: [
            {
              label: 'Create Similar',
              variant: 'primary',
              onClick: () => {
                toast.success('Creating similar content...');
                addMessage({
                  sender: 'bot',
                  content: '✨ I\'ll create more content similar to your top posts! This might take a minute...',
                  type: 'text',
                });
              },
            },
          ],
        },
      });
    } else if (lowerMessage.includes('schedule') || lowerMessage.includes('time')) {
      addMessage({
        sender: 'bot',
        content: 'I can help you update your posting schedule. What time would you like to post? (e.g., "8 PM", "10:30 AM")',
        type: 'text',
      });
    } else if (lowerMessage.includes('approve all')) {
      handleBulkApproval();
    } else {
      addMessage({
        sender: 'bot',
        content: `I understand you're asking about "${userMessage}".

I'm currently in demo mode, but I can help you with:
• Viewing and approving pending content
• Checking analytics and insights
• Changing content topics
• Updating schedules
• Managing your brand settings

Try asking me something specific, or click one of the quick actions below!`,
        type: 'text',
      });
    }

    setIsTyping(false);
  };

  const handleBulkApproval = () => {
    addMessage({
      sender: 'bot',
      content: `⚠️ You're about to approve 3 posts:

• Quiz #47 - Kinematics
• Reel #23 - Newton's Laws
• Post #89 - Study Tips

Are you sure you want to approve all of them?`,
      type: 'confirmation',
      metadata: {
        actions: [
          {
            label: 'Yes, approve all',
            variant: 'primary',
            onClick: () => {
              toast.success('All posts approved!');
              addMessage({
                sender: 'bot',
                content: '✅ Great! All 3 posts have been approved and scheduled.\n\n🎉 They\'ll be published at their scheduled times. You can view them in the Content section.',
                type: 'text',
              });
            },
          },
          {
            label: 'Cancel',
            variant: 'secondary',
            onClick: () => {
              addMessage({
                sender: 'bot',
                content: 'No problem! The posts remain pending. Let me know if you need anything else.',
                type: 'text',
              });
            },
          },
        ],
      },
    });
  };

  const handleSendMessage = async (message: string) => {
    addMessage({
      sender: 'user',
      content: message,
      type: 'text',
    });

    await simulateBotResponse(message);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!user) return null;

  return (
    <>
      <ChatButton onClick={toggleChat} hasUnread={false} />
      <ChatWindow
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        messages={messages}
        isTyping={isTyping}
        onSendMessage={handleSendMessage}
        suggestions={suggestions}
      />
    </>
  );
};
