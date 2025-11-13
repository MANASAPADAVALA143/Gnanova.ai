import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { useClient } from '../../contexts/ClientContext';
import { supabase } from '../../lib/supabase';
import { CurriculumBadge } from '../../components/CurriculumBadge';
import { StatusBadge } from '../../components/StatusBadge';
import { AlertCircle, TrendingUp, Users, Calendar, BarChart3, ArrowRight, Play } from 'lucide-react';

interface DashboardStats {
  postsThisWeek: number;
  totalReach: number;
  totalEngagement: number;
  growthRate: number;
  pendingApprovals: number;
}

interface CurriculumStat {
  curriculum: string;
  count: number;
  percentage: number;
}

interface UpcomingPost {
  id: string;
  curriculum: string;
  topic: string;
  content_type_detail: string;
  scheduled_for: string;
  platforms: string[];
}

export const SrikanthDashboard = () => {
  const { currentClient } = useClient();
  const [stats, setStats] = useState<DashboardStats>({
    postsThisWeek: 0,
    totalReach: 0,
    totalEngagement: 0,
    growthRate: 0,
    pendingApprovals: 0,
  });
  const [curriculumStats, setCurriculumStats] = useState<CurriculumStat[]>([]);
  const [upcomingPosts, setUpcomingPosts] = useState<UpcomingPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentClient) {
      fetchDashboardData();
    }
  }, [currentClient]);

  const fetchDashboardData = async () => {
    if (!currentClient) return;

    try {
      setLoading(true);

      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);

      const { data: contentData, error: contentError } = await supabase
        .from('content_items')
        .select('*, analytics(*)')
        .eq('client_id', currentClient.id)
        .gte('created_at', weekAgo.toISOString());

      if (contentError) throw contentError;

      const pendingCount = contentData?.filter(c => c.status === 'pending_approval').length || 0;
      const postsThisWeek = contentData?.filter(c => c.status === 'published').length || 0;

      let totalReach = 0;
      let totalLikes = 0;
      contentData?.forEach(content => {
        content.analytics?.forEach((a: any) => {
          totalReach += a.reach || 0;
          totalLikes += a.likes || 0;
        });
      });

      const curriculumCounts: Record<string, number> = {};
      contentData?.forEach(content => {
        if (content.curriculum) {
          curriculumCounts[content.curriculum] = (curriculumCounts[content.curriculum] || 0) + 1;
        }
      });

      const total = Object.values(curriculumCounts).reduce((a, b) => a + b, 0);
      const curriculumArray = Object.entries(curriculumCounts).map(([curriculum, count]) => ({
        curriculum,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      })).sort((a, b) => b.count - a.count);

      const { data: upcomingData } = await supabase
        .from('content_items')
        .select('id, curriculum, topic, content_type_detail, scheduled_for, platforms')
        .eq('client_id', currentClient.id)
        .in('status', ['approved', 'pending_approval'])
        .gte('scheduled_for', new Date().toISOString())
        .order('scheduled_for', { ascending: true })
        .limit(3);

      const { data: recentData } = await supabase
        .from('content_items')
        .select('*, analytics(*)')
        .eq('client_id', currentClient.id)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(6);

      setStats({
        postsThisWeek,
        totalReach,
        totalEngagement: totalLikes,
        growthRate: 5.4,
        pendingApprovals: pendingCount,
      });
      setCurriculumStats(curriculumArray);
      setUpcomingPosts(upcomingData || []);
      setRecentPosts(recentData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
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
            <Link to="/dashboard" className="hover:text-indigo-600">Agency View</Link>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">{currentClient?.business_name}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-2xl">
              🎓
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{currentClient?.business_name}</h1>
              <p className="text-gray-600 dark:text-gray-400">{currentClient?.tagline}</p>
            </div>
          </div>
        </div>

        {stats.pendingApprovals > 0 && (
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="font-semibold text-amber-900 dark:text-amber-100">
                  {stats.pendingApprovals} Post{stats.pendingApprovals > 1 ? 's' : ''} Pending Your Approval
                </p>
                <p className="text-sm text-amber-700 dark:text-amber-300">New content generated today needs your review</p>
              </div>
            </div>
            <Link
              to="/client/srikanth-academy/approvals"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              Review Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.postsThisWeek}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Posts This Week</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalReach.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Reach</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <BarChart3 className="w-8 h-8 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.totalEngagement}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Engagement</div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stats.growthRate}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Growth Rate</div>
          </div>
        </div>

        {curriculumStats.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              📚 Content by Curriculum This Week
            </h2>
            <div className="space-y-4">
              {curriculumStats.map((stat) => (
                <div key={stat.curriculum}>
                  <div className="flex items-center justify-between mb-2">
                    <CurriculumBadge curriculum={stat.curriculum} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {stat.count} posts • {stat.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stat.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {upcomingPosts.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              📅 Next {upcomingPosts.length} Scheduled Posts
            </h2>
            <div className="space-y-4">
              {upcomingPosts.map((post) => (
                <div key={post.id} className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CurriculumBadge curriculum={post.curriculum} size="sm" />
                      <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{post.content_type_detail}</span>
                    </div>
                    <p className="font-semibold text-gray-900 dark:text-white mb-1">{post.topic}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {formatDate(post.scheduled_for)}
                    </p>
                    <div className="flex gap-2 text-xs text-gray-500 dark:text-gray-400">
                      {post.platforms.map((platform) => (
                        <span key={platform} className="capitalize">📱 {platform}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      to={`/client/srikanth-academy/content/${post.id}`}
                      className="px-3 py-1.5 text-sm bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
                    >
                      Preview
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recentPosts.length > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              🎬 Recent Posts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentPosts.slice(0, 6).map((post) => {
                const analytics = post.analytics?.[0];
                return (
                  <Link
                    key={post.id}
                    to={`/client/srikanth-academy/content/${post.id}`}
                    className="group border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-4xl">
                      🎯
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <CurriculumBadge curriculum={post.curriculum} size="sm" />
                        <span className="text-xs text-gray-500 capitalize">{post.content_type_detail}</span>
                      </div>
                      <p className="font-medium text-gray-900 dark:text-white mb-2 line-clamp-2">{post.topic}</p>
                      {analytics && (
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          ❤️ {analytics.likes} likes
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};
