import { useState } from 'react';
import { Menu, Bell, Moon, Sun, ChevronDown, User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

type HeaderProps = {
  onMenuClick: () => void;
};

export const Header = ({ onMenuClick }: HeaderProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const notifications = [
    { id: 1, type: 'approval', message: '3 posts pending approval', time: '5m ago' },
    { id: 2, type: 'success', message: 'Post published successfully', time: '1h ago' },
    { id: 3, type: 'warning', message: 'Schedule conflict detected', time: '2h ago' },
  ];

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-slate-600 hover:text-slate-900 transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div className="hidden md:flex items-center text-sm text-slate-600">
          <span className="text-slate-400">Dashboard</span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-900 font-medium">Overview</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-slate-200">
                <h3 className="font-semibold text-slate-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className="px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <p className="text-sm text-slate-900">{notif.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2 border-t border-slate-200">
                <button className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-2 hover:bg-slate-100 rounded-lg transition-all"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
              {profile?.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <ChevronDown className="w-4 h-4 text-slate-600" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
              <div className="px-4 py-3 border-b border-slate-200">
                <p className="font-semibold text-slate-900">{profile?.full_name}</p>
                <p className="text-sm text-slate-500 capitalize">{profile?.role} Account</p>
              </div>

              <Link
                to="/profile"
                className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <User className="w-4 h-4" />
                <span className="text-sm">View Profile</span>
              </Link>

              <Link
                to="/settings"
                className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <Settings className="w-4 h-4" />
                <span className="text-sm">Settings</span>
              </Link>

              <Link
                to="/help"
                className="flex items-center gap-3 px-4 py-2 text-slate-700 hover:bg-slate-50 transition-colors"
                onClick={() => setShowUserMenu(false)}
              >
                <HelpCircle className="w-4 h-4" />
                <span className="text-sm">Help & Support</span>
              </Link>

              <div className="border-t border-slate-200 my-2"></div>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
