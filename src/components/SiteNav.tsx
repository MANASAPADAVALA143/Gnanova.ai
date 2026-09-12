import { Link } from 'react-router-dom';
import { GnanovaLogo } from './GnanovaLogo';
import { useDemoModal } from '../contexts/DemoModalContext';

type SiteNavProps = {
  variant?: 'fixed' | 'sticky';
};

const linkClass = 'text-gray-300 hover:text-white transition-colors';

export const SiteNav = ({ variant = 'fixed' }: SiteNavProps) => {
  const { openDemoModal } = useDemoModal();
  const positionClass =
    variant === 'fixed'
      ? 'fixed top-0 left-0 right-0 z-50'
      : 'sticky top-0 z-50';

  return (
    <nav className={`${positionClass} bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10`}>
      <div className="max-w-7xl mx-auto pl-2 pr-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <GnanovaLogo height={40} />

          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            <a href="/#solutions" className={linkClass}>
              Who We Help
            </a>
            <Link to="/library" className={linkClass}>
              Library
            </Link>
            <Link to="/training" className={linkClass}>
              Training
            </Link>
            <Link to="/contact" className={linkClass}>
              Contact
            </Link>
            <Link to="/finance" className={linkClass}>
              Finance
            </Link>
            <Link to="/schools" className={linkClass}>
              Schools
            </Link>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white transition-colors font-medium text-sm sm:text-base"
            >
              Sign In
            </Link>
            <button
              type="button"
              onClick={() => openDemoModal()}
              className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold hover:shadow-lg hover:shadow-[#667eea]/30 transition-all text-sm sm:text-base"
            >
              Get Started
            </button>
          </div>
        </div>

        <div className="lg:hidden flex flex-wrap gap-3 mt-3 pt-3 border-t border-white/10 text-sm">
          <Link to="/finance" className={linkClass}>
            Finance
          </Link>
          <Link to="/schools" className={linkClass}>
            Schools
          </Link>
          <Link to="/library" className={linkClass}>
            Library
          </Link>
          <Link to="/training" className={linkClass}>
            Training
          </Link>
          <Link to="/contact" className={linkClass}>
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};
