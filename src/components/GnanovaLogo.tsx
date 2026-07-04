import { useState } from 'react';
import { Link } from 'react-router-dom';

type GnanovaLogoProps = {
  height?: number;
  className?: string;
  linkTo?: string;
  showWordmark?: boolean;
};

export const GnanovaLogo = ({
  height = 40,
  className = '',
  linkTo = '/',
  showWordmark = true,
}: GnanovaLogoProps) => {
  const [iconError, setIconError] = useState(false);

  const iconSize = Math.round(height * 0.9);

  const icon = iconError ? (
    <span
      className="rounded-xl bg-gradient-to-br from-[#667eea] to-[#4facfe] flex items-center justify-center text-white text-xs font-bold"
      style={{ width: iconSize, height: iconSize }}
    >
      G
    </span>
  ) : (
    <img
      src="/gnanova-ai-icon.png"
      alt=""
      aria-hidden="true"
      style={{ width: iconSize, height: iconSize, background: 'transparent' }}
      className="navbar-logo bg-transparent shrink-0"
      onError={() => setIconError(true)}
    />
  );

  const wordmark = showWordmark ? (
    <span
      className={`font-bold bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#4facfe] bg-clip-text text-transparent whitespace-nowrap ${className}`}
      style={{ fontSize: height * 0.55 }}
    >
      Gnanova AI
    </span>
  ) : null;

  const content = (
    <span className="inline-flex items-center gap-2.5 bg-transparent">
      {icon}
      {wordmark}
    </span>
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className="inline-flex items-center shrink-0 bg-transparent" aria-label="Gnanova AI home">
        {content}
      </Link>
    );
  }

  return content;
};
