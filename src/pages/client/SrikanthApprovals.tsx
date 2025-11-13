import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { useClient } from '../../contexts/ClientContext';
import { useToast } from '../../hooks/useToast';
import { supabase } from '../../lib/supabase';
import { CurriculumBadge } from '../../components/CurriculumBadge';
import { DifficultyBadge } from '../../components/DifficultyBadge';
import { CheckCircle2, Edit, RefreshCw, X, Calendar } from 'lucide-react';

interface ContentItem {
  id: string;
  curriculum: string;
  topic: string;
  difficulty: string;
  content_type_detail: string;
  caption: string;
  scheduled_for: string;
  platforms: string[];
  tags: string[];
  metadata: any;
}

export const SrikanthApprovals = () => {
  const { currentClient } = useClient();
  const toast = useToast();
  const [pendingContent, setPendingContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<ContentItem>>({});

  useEffect(() => {
    if (currentClient) {
      fetchPendingContent();
    }
  }, [currentClient]);

  const fetchPendingContent = async () => {
    if (!currentClient) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('client_id', currentClient.id)
        .eq('status', 'pending_approval')
        .order('scheduled_for', { ascending: true });

      if (error) throw error;
      setPendingContent(data || []);
    } catch (error) {
      console.error('Error fetching pending content:', error);
      toast.error('Failed to load pending content');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content_items')
        .update({ status: 'approved' })
        .eq('id', id);

      if (error) throw error;

      toast.success('Content approved successfully!');
      fetchPendingContent();
    } catch (error) {
      console.error('Error approving content:', error);
      toast.error('Failed to approve content');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('content_items')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;

      toast.success('Content rejected');
      fetchPendingContent();
    } catch (error) {
      console.error('Error rejecting content:', error);
      toast.error('Failed to reject content');
    }
  };

  const handleApproveAll = async () => {
    try {
      const { error } = await supabase
        .from('content_items')
        .update({ status: 'approved' })
        .eq('client_id', currentClient?.id)
        .eq('status', 'pending_approval');

      if (error) throw error;

      toast.success('All content approved!');
      fetchPendingContent();
    } catch (error) {
      console.error('Error approving all:', error);
      toast.error('Failed to approve all content');
    }
  };

  const handleEdit = (content: ContentItem) => {
    setEditingId(content.id);
    setEditForm(content);
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    try {
      const { error } = await supabase
        .from('content_items')
        .update({
          topic: editForm.topic,
          caption: editForm.caption,
          scheduled_for: editForm.scheduled_for,
          difficulty: editForm.difficulty,
          curriculum: editForm.curriculum,
        })
        .eq('id', editingId);

      if (error) throw error;

      toast.success('Content updated successfully!');
      setEditingId(null);
      fetchPendingContent();
    } catch (error) {
      console.error('Error updating content:', error);
      toast.error('Failed to update content');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return `Today, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return `Tomorrow, ${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
            <Link to="/client/srikanth-academy/dashboard" className="hover:text-indigo-600">← Back to Dashboard</Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Pending Approvals ({pendingContent.length})</h1>
              <p className="text-gray-600 dark:text-gray-400">Review and approve generated content</p>
            </div>
            <div className="flex gap-3">
              {pendingContent.length > 0 && (
                <>
                  <button
                    onClick={handleApproveAll}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    Approve All
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {pendingContent.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-6xl mb-4">✨</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">All Caught Up!</h3>
            <p className="text-gray-600 dark:text-gray-400">No pending content to review at the moment.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {pendingContent.map((content, index) => (
              <div key={content.id} className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">🎯</span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {content.curriculum} {content.content_type_detail} #{content.metadata?.question_number || index + 1}
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">Topic: {content.topic}</p>
                    <div className="flex gap-2 mb-3">
                      <CurriculumBadge curriculum={content.curriculum} />
                      <DifficultyBadge difficulty={content.difficulty} />
                      <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium capitalize">
                        {content.content_type_detail}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Scheduled</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white">{formatDate(content.scheduled_for)}</p>
                  </div>
                </div>

                <div className="aspect-video bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg mb-4 flex items-center justify-center text-white text-6xl">
                  🎓
                </div>

                {editingId === content.id ? (
                  <div className="space-y-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic</label>
                      <input
                        type="text"
                        value={editForm.topic || ''}
                        onChange={(e) => setEditForm({ ...editForm, topic: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Caption</label>
                      <textarea
                        value={editForm.caption || ''}
                        onChange={(e) => setEditForm({ ...editForm, caption: e.target.value })}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveEdit}
                        className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">📝 Caption:</p>
                      <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg whitespace-pre-wrap">
                        {content.caption}
                      </p>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">📱 Platforms:</p>
                      <div className="flex gap-2">
                        {content.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg text-sm font-medium capitalize"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>
                    </div>

                    {content.tags.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">🏷️ Tags:</p>
                        <div className="flex flex-wrap gap-2">
                          {content.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(content.id)}
                        className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5" />
                        Approve
                      </button>
                      <button
                        onClick={() => handleEdit(content)}
                        className="px-4 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <Edit className="w-5 h-5" />
                        Edit
                      </button>
                      <button
                        onClick={() => toast.info('Regenerate feature coming soon!')}
                        className="px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                      >
                        <RefreshCw className="w-5 h-5" />
                        Regenerate
                      </button>
                      <button
                        onClick={() => handleReject(content.id)}
                        className="px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};
