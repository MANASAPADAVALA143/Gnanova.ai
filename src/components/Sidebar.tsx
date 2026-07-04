import { Link, useLocation } from 'react-router-dom';
import { Home, FileText, Calendar, BarChart3, Settings, HelpCircle, User, X } from 'lucide-react';
import { GnanovaLogo } from './GnanovaLogo';

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const location = useLocation();

  const links = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/content', icon: FileText, label: 'Content' },
    { to: '/calendar', icon: Calendar, label: 'Calendar' },
    { to: '/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

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
            <GnanovaLogo height={32} linkTo="/dashboard" />
            <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
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
