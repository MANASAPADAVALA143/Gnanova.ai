import { useState, useEffect } from 'react';
import { Layout } from '../components/Layout';
import { Upload, Instagram, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';
import { supabase, Client, PlatformConnection, BrandPreferences } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';

type Tab = 'brand' | 'content' | 'platforms' | 'schedule' | 'billing';

export const Settings = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState<Tab>('brand');
  const [loading, setLoading] = useState(true);
  const [client, setClient] = useState<Client | null>(null);
  const [platforms, setPlatforms] = useState<PlatformConnection[]>([]);
  const [preferences, setPreferences] = useState<BrandPreferences | null>(null);

  const [brandData, setBrandData] = useState({
    primaryColor: '#6366f1',
    secondaryColor: '#8b5cf6',
    accentColor: '#ec4899',
    brandVoice: 'professional',
    brandDescription: '',
    targetAudience: '',
    usps: [''],
  });

  const [contentPrefs, setContentPrefs] = useState({
    topics: [''],
    avoidTopics: [''],
    hashtags: [''],
    defaultCta: '',
  });

  const [schedule, setSchedule] = useState({
    monday: { enabled: true, count: 1, time: '09:00' },
    tuesday: { enabled: true, count: 1, time: '09:00' },
    wednesday: { enabled: true, count: 1, time: '09:00' },
    thursday: { enabled: true, count: 1, time: '09:00' },
    friday: { enabled: true, count: 1, time: '09:00' },
    saturday: { enabled: false, count: 0, time: '09:00' },
    sunday: { enabled: false, count: 0, time: '09:00' },
  });

  useEffect(() => {
    if (user) {
      fetchSettingsData();
    }
  }, [user]);

  const fetchSettingsData = async () => {
    try {
      const { data: clientData } = await supabase
        .from('clients')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (clientData) {
        setClient(clientData);
        setBrandData({
          primaryColor: clientData.primary_color,
          secondaryColor: clientData.secondary_color,
          accentColor: clientData.accent_color,
          brandVoice: clientData.brand_voice || 'professional',
          brandDescription: clientData.brand_description || '',
          targetAudience: clientData.target_audience || '',
          usps: [''],
        });

        const { data: platformData } = await supabase
          .from('platform_connections')
          .select('*')
          .eq('client_id', clientData.id);

        setPlatforms(platformData || []);

        const { data: prefsData } = await supabase
          .from('brand_preferences')
          .select('*')
          .eq('client_id', clientData.id)
          .maybeSingle();

        if (prefsData) {
          setPreferences(prefsData);
          setContentPrefs({
            topics: prefsData.content_topics.length > 0 ? prefsData.content_topics : [''],
            avoidTopics: prefsData.topics_to_avoid.length > 0 ? prefsData.topics_to_avoid : [''],
            hashtags: prefsData.preferred_hashtags.length > 0 ? prefsData.preferred_hashtags : [''],
            defaultCta: prefsData.default_cta || '',
          });
        }
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBrand = async () => {
    if (!client) return;

    try {
      const { error } = await supabase
        .from('clients')
        .update({
          primary_color: brandData.primaryColor,
          secondary_color: brandData.secondaryColor,
          accent_color: brandData.accentColor,
          brand_voice: brandData.brandVoice,
          brand_description: brandData.brandDescription,
          target_audience: brandData.targetAudience,
        })
        .eq('id', client.id);

      if (error) throw error;
      toast.success('Brand profile updated successfully!');
    } catch (error) {
      console.error('Error updating brand:', error);
      toast.error('Failed to update brand profile');
    }
  };

  const handleSaveContentPrefs = async () => {
    if (!client) return;

    try {
      const prefsData = {
        client_id: client.id,
        content_topics: contentPrefs.topics.filter((t) => t.trim()),
        topics_to_avoid: contentPrefs.avoidTopics.filter((t) => t.trim()),
        preferred_hashtags: contentPrefs.hashtags.filter((h) => h.trim()),
        default_cta: contentPrefs.defaultCta,
      };

      if (preferences) {
        const { error } = await supabase
          .from('brand_preferences')
          .update(prefsData)
          .eq('id', preferences.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('brand_preferences').insert([prefsData]);

        if (error) throw error;
      }

      toast.success('Content preferences saved!');
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast.error('Failed to save preferences');
    }
  };

  const tabs = [
    { id: 'brand' as Tab, label: 'Brand Profile' },
    { id: 'content' as Tab, label: 'Content Preferences' },
    { id: 'platforms' as Tab, label: 'Platforms' },
    { id: 'schedule' as Tab, label: 'Schedule' },
    { id: 'billing' as Tab, label: 'Billing' },
  ];

  const platformsList = [
    { name: 'Instagram', value: 'instagram', icon: Instagram },
    { name: 'Facebook', value: 'facebook', icon: Facebook },
    { name: 'Twitter', value: 'twitter', icon: Twitter },
    { name: 'LinkedIn', value: 'linkedin', icon: Linkedin },
    { name: 'YouTube', value: 'youtube', icon: Youtube },
  ];

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
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">Settings</h1>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="border-b border-slate-200">
            <div className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-indigo-600 border-b-2 border-indigo-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'brand' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Logo</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-slate-100 rounded-lg flex items-center justify-center">
                      {client?.logo_url ? (
                        <img src={client.logo_url} alt="Logo" className="w-full h-full object-cover rounded-lg" />
                      ) : (
                        <span className="text-slate-400 text-sm">No logo</span>
                      )}
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                      <Upload className="w-4 h-4" />
                      <span>Upload New Logo</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Brand Colors</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Primary</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={brandData.primaryColor}
                          onChange={(e) => setBrandData({ ...brandData, primaryColor: e.target.value })}
                          className="w-12 h-12 rounded border border-slate-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={brandData.primaryColor}
                          onChange={(e) => setBrandData({ ...brandData, primaryColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Secondary</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={brandData.secondaryColor}
                          onChange={(e) => setBrandData({ ...brandData, secondaryColor: e.target.value })}
                          className="w-12 h-12 rounded border border-slate-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={brandData.secondaryColor}
                          onChange={(e) => setBrandData({ ...brandData, secondaryColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Accent</label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={brandData.accentColor}
                          onChange={(e) => setBrandData({ ...brandData, accentColor: e.target.value })}
                          className="w-12 h-12 rounded border border-slate-300 cursor-pointer"
                        />
                        <input
                          type="text"
                          value={brandData.accentColor}
                          onChange={(e) => setBrandData({ ...brandData, accentColor: e.target.value })}
                          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Brand Voice</h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {['professional', 'casual', 'friendly', 'educational', 'humorous'].map((voice) => (
                      <button
                        key={voice}
                        onClick={() => setBrandData({ ...brandData, brandVoice: voice })}
                        className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${
                          brandData.brandVoice === voice
                            ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                            : 'border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {voice}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Brand Description</label>
                  <textarea
                    value={brandData.brandDescription}
                    onChange={(e) => setBrandData({ ...brandData, brandDescription: e.target.value })}
                    rows={4}
                    placeholder="Describe your brand voice and personality..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
                  <textarea
                    value={brandData.targetAudience}
                    onChange={(e) => setBrandData({ ...brandData, targetAudience: e.target.value })}
                    rows={4}
                    placeholder="Who is your target audience?..."
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  onClick={handleSaveBrand}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'content' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Default Call-to-Action</label>
                  <textarea
                    value={contentPrefs.defaultCta}
                    onChange={(e) => setContentPrefs({ ...contentPrefs, defaultCta: e.target.value })}
                    rows={2}
                    placeholder="e.g., Drop your answer below!"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  onClick={handleSaveContentPrefs}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Save Changes
                </button>
              </div>
            )}

            {activeTab === 'platforms' && (
              <div className="space-y-4">
                {platformsList.map(({ name, value, icon: Icon }) => {
                  const connection = platforms.find((p) => p.platform === value);
                  return (
                    <div key={value} className="border border-slate-200 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Icon className="w-8 h-8 text-slate-600" />
                          <div>
                            <h4 className="font-semibold text-slate-900">{name}</h4>
                            {connection?.is_connected ? (
                              <p className="text-sm text-green-600">✓ Connected</p>
                            ) : (
                              <p className="text-sm text-slate-500">Not Connected</p>
                            )}
                          </div>
                        </div>
                        <button
                          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                            connection?.is_connected
                              ? 'border border-red-300 text-red-600 hover:bg-red-50'
                              : 'bg-indigo-600 text-white hover:bg-indigo-700'
                          }`}
                        >
                          {connection?.is_connected ? 'Disconnect' : `Connect ${name}`}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Schedule</h3>
                  <div className="space-y-3">
                    {Object.entries(schedule).map(([day, config]) => (
                      <div key={day} className="flex items-center gap-4 p-4 border border-slate-200 rounded-lg">
                        <input
                          type="checkbox"
                          checked={config.enabled}
                          onChange={(e) =>
                            setSchedule({ ...schedule, [day]: { ...config, enabled: e.target.checked } })
                          }
                          className="w-5 h-5 text-indigo-600 border-slate-300 rounded focus:ring-indigo-500"
                        />
                        <span className="w-24 font-medium text-slate-900 capitalize">{day}</span>
                        {config.enabled && (
                          <>
                            <input
                              type="number"
                              min="0"
                              max="10"
                              value={config.count}
                              onChange={(e) =>
                                setSchedule({
                                  ...schedule,
                                  [day]: { ...config, count: parseInt(e.target.value) || 0 },
                                })
                              }
                              className="w-20 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <span className="text-slate-600">posts at</span>
                            <input
                              type="time"
                              value={config.time}
                              onChange={(e) => setSchedule({ ...schedule, [day]: { ...config, time: e.target.value } })}
                              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all">
                  Save Schedule
                </button>
              </div>
            )}

            {activeTab === 'billing' && (
              <div className="space-y-6">
                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Current Plan</h3>
                  <p className="text-2xl font-bold text-indigo-600 mb-4 capitalize">{client?.plan} Plan - ${client?.mrr}/month</p>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-slate-700">
                      <span className="text-green-600">✓</span> 30 posts per month
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <span className="text-green-600">✓</span> All platforms
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <span className="text-green-600">✓</span> Advanced analytics
                    </li>
                    <li className="flex items-center gap-2 text-slate-700">
                      <span className="text-green-600">✓</span> Priority support
                    </li>
                  </ul>

                  <div className="flex gap-3">
                    <button className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                      Change Plan
                    </button>
                  </div>
                </div>

                <div className="border border-slate-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Usage This Month</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-slate-700">Posts</span>
                        <span className="font-semibold">28/30</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '93%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};
