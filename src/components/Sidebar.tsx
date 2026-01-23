import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Calendar, BarChart3, Settings, HelpCircle, User, Users, X, Building2, CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useClient } from '../contexts/ClientContext';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();
  const { profile } = useAuth();
  const { currentClient, clients } = useClient();

  const isInClientWorkspace = location.pathname.startsWith('/client/');

  const agencyLinks = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/content', icon: FileText, label: 'Content' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const clientWorkspaceLinks = currentClient ? [
    { to: `/client/${currentClient.slug}/dashboard`, icon: Home, label: 'Dashboard' },
    { to: `/client/${currentClient.slug}/approvals`, icon: CheckCircle2, label: 'Pending Approvals', badge: 5 },
    { to: `/client/${currentClient.slug}/content`, icon: FileText, label: 'Content Library' },
    { to: `/client/${currentClient.slug}/calendar`, icon: Calendar, label: 'Calendar' },
    { to: `/client/${currentClient.slug}/analytics`, icon: BarChart3, label: 'Analytics' },
    { to: `/client/${currentClient.slug}/settings`, icon: Settings, label: 'Settings' },
  ] : [];

  const links = isInClientWorkspace ? clientWorkspaceLinks : agencyLinks;

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-slate-200 z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-slate-200">
            <Link to="/dashboard" className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold">
                G
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Gnanova.pro
              </span>
            </Link>
            <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {isInClientWorkspace && currentClient && (
              <>
                <Link
                  to="/dashboard"
                  onClick={onClose}
                  className="flex items-center px-4 py-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Agency View
                </Link>
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <div className="flex items-center gap-2 px-4 py-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg">
                      🎓
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm">{currentClient.business_name}</p>
                      <p className="text-xs text-gray-500">{currentClient.tagline}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {!isInClientWorkspace && clients.length > 0 && (
              <>
                <div className="mb-2">
                  {links.map((link) => {
                    const Icon = link.icon;
                    const active = isActive(link.to);
                    return (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={onClose}
                        className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                          active
                            ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 font-semibold'
                            : 'text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-slate-500'}`} />
                        <span className="ml-3">{link.label}</span>
                      </Link>
                    );
                  })}
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Client Workspaces
                  </div>
                  {clients.map((client) => (
                    <Link
                      key={client.id}
                      to={`/client/${client.slug}/dashboard`}
                      onClick={onClose}
                      className="flex items-center px-4 py-3 text-slate-700 hover:bg-indigo-50 rounded-lg transition-all group"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-lg flex-shrink-0">
                        🎓
                      </div>
                      <div className="ml-3 flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">{client.business_name}</p>
                        <p className="text-xs text-gray-500 truncate">{client.tagline || client.industry}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {isInClientWorkspace && (
              <div>
                {links.map((link: any) => {
                  const Icon = link.icon;
                  const active = isActive(link.to);
                  return (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={onClose}
                      className={`flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        active
                          ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <Icon className={`w-5 h-5 ${active ? 'text-indigo-600' : 'text-slate-500'}`} />
                        <span className="ml-3">{link.label}</span>
                      </div>
                      {link.badge && link.badge > 0 && (
                        <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                          {link.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            )}
          </nav>

          <div className="p-4 border-t border-slate-200 space-y-1">
            <Link
              to="/help"
              onClick={onClose}
              className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
            >
              <HelpCircle className="w-5 h-5 text-slate-500" />
              <span className="ml-3">Help Center</span>
            </Link>
            <Link
              to="/profile"
              onClick={onClose}
              className="flex items-center px-4 py-3 text-slate-700 hover:bg-slate-50 rounded-lg transition-all"
            >
              <User className="w-5 h-5 text-slate-500" />
              <span className="ml-3">Profile</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
