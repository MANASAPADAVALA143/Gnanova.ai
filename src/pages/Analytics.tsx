import { Layout } from '../components/Layout';
import { TrendingUp, Users, Heart, Share2 } from 'lucide-react';
import { MetricCard } from '../components/MetricCard';

export const Analytics = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Analytics</h1>
            <p className="text-slate-600">Track your content performance</p>
          </div>

          <div className="flex items-center gap-3">
            <select className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 3 Months</option>
              <option>Custom Range</option>
            </select>
            <button className="px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors">
              Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            icon={Users}
            title="Total Reach"
            value="45.2K"
            trend={{ value: '12% from last week', positive: true }}
          />
          <MetricCard
            icon={Heart}
            title="Total Engagement"
            value="8,234"
            trend={{ value: '8% from last week', positive: true }}
          />
          <MetricCard
            icon={TrendingUp}
            title="Follower Growth"
            value="+342"
            trend={{ value: '5% from last week', positive: true }}
          />
          <MetricCard
            icon={Share2}
            title="Shares"
            value="1,243"
            trend={{ value: '15% from last week', positive: true }}
            gradient="from-green-500 to-emerald-600"
          />
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-8">
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Engagement Over Time</h3>
          <div className="h-64 flex items-center justify-center text-slate-400">
            Chart visualization will be displayed here
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Top Performing Posts</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Content
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Likes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Comments
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Shares
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Engagement Rate
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-slate-100 rounded"></div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-slate-900">Physics Challenge #47</div>
                        <div className="text-sm text-slate-500">Nov 11, 2025</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">Instagram</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">234</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">71</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">35</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-green-600">4.2%</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};
