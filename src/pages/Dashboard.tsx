import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Sparkles, Zap, TrendingUp, CheckCircle2, Calendar, Target, ArrowRight, Play, Users, Heart, MessageSquare, Share2, Trophy, Flame, Star, Building2 } from 'lucide-react';
import { Layout } from '../components/Layout';
import { ContentCard } from '../components/ContentCard';
import { supabase, ContentItem } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useClient } from '../contexts/ClientContext';
import { useToast } from '../hooks/useToast';

export const Dashboard = () => {
  const { user, profile } = useAuth();
  const { clients } = useClient();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [pendingContent, setPendingContent] = useState<ContentItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [metrics, setMetrics] = useState({
    pendingApprovals: 0,
    scheduledPosts: 0,
    postsThisMonth: 0,
    engagementRate: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      const { data: clientData } = await supabase
        .from('clients')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (!clientData) {
        setLoading(false);
        return;
      }

      const { data: contentData } = await supabase
        .from('content_items')
        .select('*')
        .eq('client_id', clientData.id)
        .eq('status', 'pending_approval')
        .order('created_at', { ascending: false })
        .limit(6);

      setPendingContent(contentData || []);

      const { count: pendingCount } = await supabase
        .from('content_items')
        .select('*', { count: 'exact', head: true })
        .eq('client_id', clientData.id)
        .eq('status', 'pending_approval');

      const { count: scheduledCount } = await supabase
        .from('content_items')
        .select('*', { count: 'exact', head: true })
        .eq('client_id', clientData.id)
        .eq('status', 'approved');

      const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
      const { count: monthlyCount } = await supabase
        .from('content_items')
        .select('*', { count: 'exact', head: true })
        .eq('client_id', clientData.id)
        .gte('created_at', startOfMonth);

      setMetrics({
        pendingApprovals: pendingCount || 0,
        scheduledPosts: scheduledCount || 0,
        postsThisMonth: monthlyCount || 0,
        engagementRate: 4.2,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
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
      fetchDashboardData();
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
      fetchDashboardData();
    } catch (error) {
      console.error('Error rejecting content:', error);
      toast.error('Failed to reject content');
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-[#667eea]/20 rounded-2xl"></div>
            <div className="w-20 h-20 border-4 border-[#667eea] border-t-transparent rounded-2xl animate-spin absolute top-0 left-0"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const greeting = currentTime.getHours() < 12 ? 'Good morning' : currentTime.getHours() < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
        <div className="max-w-[1600px] mx-auto p-8 space-y-8">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-gradient-to-r from-[#667eea]/10 via-[#f093fb]/10 to-[#4facfe]/10 rounded-3xl blur-3xl"></div>
            <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white shadow-2xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#667eea]/20 to-transparent rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-[#f093fb]/20 to-transparent rounded-full blur-3xl"></div>

              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center animate-pulse-slow">
                        <Sparkles className="w-7 h-7 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <p className="text-slate-600 text-sm font-medium">{greeting} 👋</p>
                      <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] via-[#764ba2] to-[#f093fb] bg-clip-text text-transparent">
                        {profile?.full_name || 'Welcome'}
                      </h1>
                    </div>
                  </div>
                  <p className="text-slate-600 text-lg">Your content empire is looking great today</p>
                </div>

                <div className="hidden lg:flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-3xl font-bold text-slate-900">
                      {currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="text-sm text-slate-500">
                      {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-3">
              <div className="group relative bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-3xl p-6 overflow-hidden hover:shadow-2xl hover:shadow-[#667eea]/30 transition-all hover:scale-105 cursor-pointer h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative h-full flex flex-col">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    {metrics.pendingApprovals > 0 && (
                      <div className="px-3 py-1 bg-red-500 rounded-full">
                        <span className="text-white text-xs font-bold">Action Required</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-auto">
                    <div className="text-6xl font-bold text-white mb-2">{metrics.pendingApprovals}</div>
                    <div className="text-white/90 font-medium mb-4">Pending Approvals</div>
                    <button className="w-full py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white font-medium transition-all flex items-center justify-center gap-2">
                      Review Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="group relative bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#f093fb] hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#f093fb]/0 via-[#f093fb]/5 to-[#f093fb]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#f093fb]/10 to-transparent rounded-full -mr-16 -mt-16"></div>

                  <div className="relative">
                    <div className="p-3 bg-gradient-to-br from-[#f093fb]/10 to-[#f5576c]/10 rounded-2xl w-fit mb-4">
                      <Calendar className="w-6 h-6 text-[#f093fb]" />
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#f093fb] to-[#f5576c] bg-clip-text text-transparent mb-2">
                      {metrics.scheduledPosts}
                    </div>
                    <div className="text-slate-600 font-medium">Scheduled</div>
                  </div>
                </div>

                <div className="group relative bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#4facfe] hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4facfe]/0 via-[#4facfe]/5 to-[#4facfe]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#4facfe]/10 to-transparent rounded-full -mr-16 -mt-16"></div>

                  <div className="relative">
                    <div className="p-3 bg-gradient-to-br from-[#4facfe]/10 to-[#00f2fe]/10 rounded-2xl w-fit mb-4">
                      <Zap className="w-6 h-6 text-[#4facfe]" />
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#4facfe] to-[#00f2fe] bg-clip-text text-transparent mb-2">
                      {metrics.postsThisMonth}
                    </div>
                    <div className="text-slate-600 font-medium">This Month</div>
                  </div>
                </div>
              </div>

              <div className="relative bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-8 overflow-hidden group hover:shadow-2xl hover:shadow-green-500/30 transition-all cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 group-hover:scale-110 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24 group-hover:scale-110 transition-transform duration-700"></div>

                <div className="relative flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="w-5 h-5 text-white" />
                      <span className="text-white/90 text-sm font-medium">Engagement</span>
                    </div>
                    <div className="text-6xl font-bold text-white mb-2">{metrics.engagementRate}%</div>
                    <div className="flex items-center gap-2 text-white/90">
                      <div className="flex items-center gap-1 text-sm">
                        <TrendingUp className="w-4 h-4" />
                        <span className="font-medium">+0.8%</span>
                      </div>
                      <span className="text-sm">vs last week</span>
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                      <Flame className="w-12 h-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-6 text-white h-full relative overflow-hidden group hover:shadow-2xl hover:shadow-amber-500/30 transition-all cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/5 to-white/10"></div>
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 group-hover:scale-150 transition-transform duration-700"></div>

                <div className="relative h-full flex flex-col">
                  <div className="p-3 bg-white/20 rounded-2xl w-fit mb-4 backdrop-blur-sm">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>

                  <div className="mt-auto">
                    <div className="text-xs font-medium text-white/80 mb-2 uppercase tracking-wider">Top Post</div>
                    <div className="text-lg font-bold mb-4 line-clamp-2">Why Newton was wrong... or was he? 🤔</div>

                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-white/20 rounded-xl p-2 backdrop-blur-sm">
                        <div className="text-2xl font-bold">234</div>
                        <div className="text-xs text-white/80">Likes</div>
                      </div>
                      <div className="bg-white/20 rounded-xl p-2 backdrop-blur-sm">
                        <div className="text-2xl font-bold">3.4K</div>
                        <div className="text-xs text-white/80">Reach</div>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl text-white text-sm font-medium transition-all flex items-center justify-center gap-2">
                      View Details <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {pendingContent.length > 0 ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-12 bg-gradient-to-b from-[#667eea] to-[#f093fb] rounded-full"></div>
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">Review Queue</h2>
                    <p className="text-slate-600">
                      {pendingContent.length} {pendingContent.length === 1 ? 'post' : 'posts'} waiting for your approval
                    </p>
                  </div>
                </div>
                <div className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-full font-medium text-sm animate-pulse-slow">
                  Action Required
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {pendingContent.map((content) => (
                  <ContentCard
                    key={content.id}
                    content={content}
                    onApprove={handleApprove}
                    onReject={handleReject}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="relative bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl p-16 text-center border border-slate-200 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5"></div>
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-500/10 to-transparent rounded-full blur-3xl"></div>

              <div className="relative">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-3">All Caught Up! 🎉</h3>
                <p className="text-slate-600 text-lg mb-8">No pending approvals. You're doing amazing!</p>
                <div className="flex items-center justify-center gap-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white rounded-xl font-medium hover:shadow-lg hover:shadow-[#667eea]/30 transition-all flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Create New Content
                  </button>
                  <button className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 rounded-xl font-medium hover:border-slate-300 transition-all">
                    View Analytics
                  </button>
                </div>
              </div>
            </div>
          )}

          {clients.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Client Workspaces</h2>
                <span className="text-sm text-slate-600">{clients.length} client{clients.length > 1 ? 's' : ''}</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {clients.map((client) => (
                  <Link
                    key={client.id}
                    to={`/client/${client.slug}/dashboard`}
                    className="group relative bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-indigo-400 transition-all hover:-translate-y-1 hover:shadow-xl overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-purple-500/5 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                          🎓
                        </div>
                        <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                          Active
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                        {client.business_name}
                      </h3>
                      <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                        {client.tagline || client.industry}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                        <span className="text-sm text-slate-500">View Workspace</span>
                        <ArrowRight className="w-5 h-5 text-indigo-600 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Zap, title: 'AI Content', color: 'from-[#667eea] to-[#764ba2]', iconColor: 'text-[#667eea]' },
              { icon: Target, title: 'Brand Settings', color: 'from-[#f093fb] to-[#f5576c]', iconColor: 'text-[#f093fb]' },
              { icon: TrendingUp, title: 'Full Analytics', color: 'from-[#4facfe] to-[#00f2fe]', iconColor: 'text-[#4facfe]' },
              { icon: Users, title: 'Team Access', color: 'from-[#a855f7] to-[#ec4899]', iconColor: 'text-[#a855f7]' },
            ].map((action, idx) => (
              <button
                key={idx}
                className="group relative bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-slate-300 transition-all hover:-translate-y-1 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                <div className="relative text-center">
                  <div className={`inline-flex p-4 bg-gradient-to-br ${action.color} bg-opacity-10 rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className={`w-8 h-8 ${action.iconColor}`} />
                  </div>
                  <div className="font-bold text-slate-900 group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:text-transparent" style={{ backgroundImage: `linear-gradient(to right, var(--tw-gradient-stops))` }}>
                    {action.title}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }

          .animate-pulse-slow {
            animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
        `}</style>
      </div>
    </Layout>
  );
};
