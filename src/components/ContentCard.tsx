import { Calendar, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { ContentItem } from '../lib/supabase';
import { Link } from 'react-router-dom';

type ContentCardProps = {
  content: ContentItem;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
};

const platformIcons = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
};

export const ContentCard = ({ content, onApprove, onReject }: ContentCardProps) => {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Not scheduled';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden hover:shadow-lg transition-all">
      <Link to={`/content/${content.id}`}>
        <div className="aspect-video bg-slate-100 relative overflow-hidden">
          {content.image_url ? (
            <img
              src={content.image_url}
              alt="Content preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              <span className="text-sm">No preview available</span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`px-2 py-1 rounded text-xs font-medium ${
              content.status === 'pending_approval'
                ? 'bg-amber-50 text-amber-700'
                : content.status === 'approved'
                ? 'bg-green-50 text-green-700'
                : content.status === 'published'
                ? 'bg-blue-50 text-blue-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {content.type.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        <p className="text-sm text-slate-700 mb-3 line-clamp-2">
          {content.caption || 'No caption provided'}
        </p>

        <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
          <Calendar className="w-4 h-4" />
          <span>{formatDate(content.scheduled_for)}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {content.platforms.map((platform) => {
            const Icon = platformIcons[platform as keyof typeof platformIcons];
            return Icon ? (
              <div
                key={platform}
                className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center"
                title={platform}
              >
                <Icon className="w-3 h-3 text-slate-600" />
              </div>
            ) : null;
          })}
        </div>

        {content.status === 'pending_approval' && (
          <div className="flex gap-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                onApprove?.(content.id);
              }}
              className="flex-1 py-2 px-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors"
            >
              Approve
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                onReject?.(content.id);
              }}
              className="flex-1 py-2 px-3 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
              Reject
            </button>
          </div>
        )}

        <Link
          to={`/content/${content.id}`}
          className="block mt-2 text-center py-2 px-3 text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
