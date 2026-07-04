import { useState } from 'react';
import { Link } from 'react-router-dom';

type GnanovaLogoProps = {
  height?: number;
  className?: string;
  linkTo?: string;
};

export const GnanovaLogo = ({ height = 36, className = '', linkTo = '/' }: GnanovaLogoProps) => {
  const [imgError, setImgError] = useState(false);

  const logo = imgError ? (
    <span
      className={`font-bold bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#667eea] bg-clip-text text-transparent ${className}`}
      style={{ fontSize: height * 0.55 }}
    >
      Gnanova AI
    </span>
  ) : (
    <img
      src="/gnanova-ai-logo.png"
      alt="Gnanova AI logo"
      style={{ height, width: 'auto', background: 'transparent' }}
      className={`navbar-logo bg-transparent ${className}`}
      onError={() => setImgError(true)}
    />
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-flex items-center shrink-0 bg-transparent">
        {logo}
      </Link>
    );
  }

  return logo;
};
