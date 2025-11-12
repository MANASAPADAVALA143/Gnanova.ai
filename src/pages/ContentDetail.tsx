import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { supabase, ContentItem } from '../lib/supabase';
import { useToast } from '../hooks/useToast';
import { ArrowLeft, Instagram, Facebook, Twitter, Linkedin, Calendar, Clock } from 'lucide-react';

export const ContentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState<ContentItem | null>(null);
  const [caption, setCaption] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [showRequestChanges, setShowRequestChanges] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [changeRequest, setChangeRequest] = useState('');

  useEffect(() => {
    if (id) {
      fetchContent();
    }
  }, [id]);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('content_items')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        toast.error('Content not found');
        navigate('/dashboard');
        return;
      }

      setContent(data);
      setCaption(data.caption || '');
      setPlatforms(data.platforms || []);

      if (data.scheduled_for) {
        const date = new Date(data.scheduled_for);
        setScheduledDate(date.toISOString().split('T')[0]);
        setScheduledTime(date.toTimeString().slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      const scheduledDateTime = scheduledDate && scheduledTime
        ? new Date(`${scheduledDate}T${scheduledTime}`).toISOString()
        : null;

      const { error } = await supabase
        .from('content_items')
        .update({
          status: 'approved',
          caption,
          platforms,
          scheduled_for: scheduledDateTime,
        })
        .eq('id', id);

      if (error) throw error;

      toast.success('Content approved and scheduled!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error approving content:', error);
      toast.error('Failed to approve content');
    }
  };

  const handleReject = async () => {
    try {
      const { error } = await supabase
        .from('content_items')
        .update({ status: 'rejected' })
        .eq('id', id);

      if (error) throw error;

      toast.success('Content rejected');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error rejecting content:', error);
      toast.error('Failed to reject content');
    }
  };

  const handleRequestChanges = () => {
    toast.info('Change request sent to agency');
    setShowRequestChanges(false);
    navigate('/dashboard');
  };

  const togglePlatform = (platform: string) => {
    setPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
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

  if (!content) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-slate-900">Content not found</h2>
        </div>
      </Layout>
    );
  }

  const platformOptions = [
    { name: 'Instagram', value: 'instagram', icon: Instagram },
    { name: 'Facebook', value: 'facebook', icon: Facebook },
    { name: 'Twitter', value: 'twitter', icon: Twitter },
    { name: 'LinkedIn', value: 'linkedin', icon: Linkedin },
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="grid lg:grid-cols-[1.5fr,1fr] gap-8">
          <div>
            <div className="bg-slate-100 rounded-xl overflow-hidden aspect-square flex items-center justify-center">
              {content.image_url ? (
                <img src={content.image_url} alt="Content" className="w-full h-full object-contain" />
              ) : (
                <span className="text-slate-400">No preview available</span>
              )}
            </div>

            <div className="mt-6 flex gap-2">
              {platformOptions.map(({ name, value, icon: Icon }) => (
                <div
                  key={value}
                  className={`px-4 py-2 rounded-lg border ${
                    platforms.includes(value)
                      ? 'bg-indigo-50 border-indigo-200'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Content Details</h2>

              <div className="space-y-4">
                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Content Type</div>
                  <div className="text-slate-900">{content.type.replace('_', ' ').toUpperCase()}</div>
                </div>

                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Status</div>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      content.status === 'pending_approval'
                        ? 'bg-amber-100 text-amber-800'
                        : content.status === 'approved'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {content.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>

                <div>
                  <div className="text-sm font-medium text-slate-700 mb-2">Created</div>
                  <div className="text-slate-900">
                    {new Date(content.created_at).toLocaleString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Caption</h3>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                rows={6}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
              />
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Schedule
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                  <input
                    type="time"
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="text-sm text-slate-600">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Timezone: EST
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-3">Platforms</h3>
              <div className="space-y-2">
                {platformOptions.map(({ name, value, icon: Icon }) => (
                  <label key={value} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={platforms.includes(value)}
                      onChange={() => togglePlatform(value)}
                      className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                    />
                    <Icon className="w-5 h-5 text-slate-600" />
                    <span className="text-slate-700">{name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleApprove}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all"
              >
                Approve & Schedule
              </button>

              <button
                onClick={() => setShowRequestChanges(true)}
                className="w-full py-3 px-4 bg-amber-600 text-white font-semibold rounded-lg hover:bg-amber-700 transition-all"
              >
                Request Changes
              </button>

              <button
                onClick={() => setShowRejectModal(true)}
                className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>

      {showRequestChanges && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Request Changes</h3>
            <p className="text-slate-600 mb-4">What would you like to change?</p>

            <textarea
              value={changeRequest}
              onChange={(e) => setChangeRequest(e.target.value)}
              rows={4}
              placeholder="Describe the changes you'd like..."
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none mb-4"
            />

            <div className="flex flex-wrap gap-2 mb-6">
              {['Change image', 'Modify caption', 'Different hashtags', 'Change posting time'].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setChangeRequest((prev) => (prev ? `${prev}, ${suggestion}` : suggestion))}
                  className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full hover:bg-slate-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRequestChanges(false)}
                className="flex-1 py-2 px-4 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRequestChanges}
                className="flex-1 py-2 px-4 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Reject Content?</h3>
            <p className="text-slate-600 mb-6">
              This will remove it from the queue. Are you sure you want to continue?
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowRejectModal(false)}
                className="flex-1 py-2 px-4 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                className="flex-1 py-2 px-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Yes, Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};
