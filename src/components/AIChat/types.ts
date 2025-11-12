export interface Message {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: Date;
  type: 'text' | 'action-card' | 'confirmation';
  metadata?: {
    actions?: Action[];
    data?: any;
  };
}

export interface Action {
  label: string;
  variant: 'primary' | 'secondary' | 'danger';
  onClick: () => void;
  icon?: string;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: string;
  message: string;
}
