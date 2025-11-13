import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { useClient } from '../../contexts/ClientContext';
import { supabase } from '../../lib/supabase';
import { CurriculumBadge } from '../../components/CurriculumBadge';
import { StatusBadge } from '../../components/StatusBadge';
import { DifficultyBadge } from '../../components/DifficultyBadge';
import { Search, Filter, X } from 'lucide-react';

interface ContentItem {
  id: string;
  curriculum: string;
  topic: string;
  difficulty: string;
  content_type_detail: string;
  status: string;
  caption: string;
  scheduled_for: string;
  published_at: string;
  platforms: string[];
  analytics: any[];
}

export const SrikanthContent = () => {
  const { currentClient } = useClient();
  const [content, setContent] = useState<ContentItem[]>([]);
  const [filteredContent, setFilteredContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(true);

  const [filters, setFilters] = useState({
    status: [] as string[],
    curriculum: [] as string[],
    contentType: [] as string[],
    difficulty: '',
  });

  useEffect(() => {
    if (currentClient) {
      fetchContent();
    }
  }, [currentClient]);

  useEffect(() => {
    applyFilters();
  }, [content, filters, searchTerm]);

  const fetchContent = async () => {
    if (!currentClient) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('content_items')
        .select('*, analytics(*)')
        .eq('client_id', currentClient.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...content];

    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.caption?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter((item) => filters.status.includes(item.status));
    }

    if (filters.curriculum.length > 0) {
      filtered = filtered.filter((item) => filters.curriculum.includes(item.curriculum));
    }

    if (filters.contentType.length > 0) {
      filtered = filtered.filter((item) =>
        filters.contentType.includes(item.content_type_detail)
      );
    }

    if (filters.difficulty) {
      filtered = filtered.filter((item) => item.difficulty === filters.difficulty);
    }

    setFilteredContent(filtered);
  };

  const toggleFilter = (category: string, value: string) => {
    setFilters((prev) => {
      const current = prev[category as keyof typeof prev];
      if (Array.isArray(current)) {
        const newArray = current.includes(value)
          ? current.filter((item) => item !== value)
          : [...current, value];
        return { ...prev, [category]: newArray };
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      curriculum: [],
      contentType: [],
      difficulty: '',
    });
    setSearchTerm('');
  };

  const hasActiveFilters =
    filters.status.length > 0 ||
    filters.curriculum.length > 0 ||
    filters.contentType.length > 0 ||
    filters.difficulty ||
    searchTerm;

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
            <Link to="/client/srikanth-academy/dashboard" className="hover:text-indigo-600">
              ← Back to Dashboard
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Content Library</h1>
              <p className="text-gray-600 dark:text-gray-400">
                {filteredContent.length} of {content.length} items
              </p>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by topic or caption..."
            className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          />
        </div>

        {showFilters && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Status
                </label>
                <div className="space-y-2">
                  {['draft', 'pending_approval', 'approved', 'published', 'rejected'].map((status) => (
                    <label key={status} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.status.includes(status)}
                        onChange={() => toggleFilter('status', status)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">
                        {status.replace('_', ' ')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Curriculum
                </label>
                <div className="space-y-2">
                  {['AP Physics', 'IIT-JEE', 'NEET', 'IB Physics', 'IGCSE'].map((curriculum) => (
                    <label key={curriculum} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.curriculum.includes(curriculum)}
                        onChange={() => toggleFilter('curriculum', curriculum)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{curriculum}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Content Type
                </label>
                <div className="space-y-2">
                  {['quiz', 'video', 'reel', 'concept', 'tip'].map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.contentType.includes(type)}
                        onChange={() => toggleFilter('contentType', type)}
                        className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  Difficulty
                </label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters({ ...filters, difficulty: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">All</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {filteredContent.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No Content Found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              {hasActiveFilters
                ? 'Try adjusting your filters or search terms'
                : 'No content available yet'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredContent.map((item) => {
              const analytics = item.analytics?.[0];
              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all overflow-hidden group cursor-pointer"
                >
                  <div className="aspect-square bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-5xl">
                    🎯
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <CurriculumBadge curriculum={item.curriculum} size="sm" />
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {item.content_type_detail}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                      {item.topic}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {item.caption}
                    </p>
                    <div className="flex items-center justify-between mb-2">
                      <DifficultyBadge difficulty={item.difficulty} size="sm" />
                      <StatusBadge status={item.status} size="sm" />
                    </div>
                    {item.status === 'published' && analytics && (
                      <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <span>❤️ {analytics.likes}</span>
                          <span>💬 {analytics.comments}</span>
                          <span>📊 {analytics.engagement_rate}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};
