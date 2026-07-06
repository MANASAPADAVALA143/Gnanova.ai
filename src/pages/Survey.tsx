import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { GnanovaLogo } from '../components/GnanovaLogo';

const SURVEY_FORM_URL =
  'https://docs.google.com/forms/d/e/1FAIpQLSdKfGwIziQ3d5JmrxRLNcXaKTlstSBEp0lLc3zWJjQjAKDB2g/viewform?embedded=true';

export const Survey = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <GnanovaLogo height={40} />
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-5 py-10 md:py-14">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            AI in Finance — 60-Second Reality Check
          </h1>
          <p className="text-gray-400 text-lg">
            Help shape our upcoming AI-in-Finance training. Takes under 60 seconds.
          </p>
        </div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src={SURVEY_FORM_URL}
            title="AI in Finance survey"
            width="100%"
            height={1200}
            className="border-0 w-full"
          >
            Loading…
          </iframe>
        </div>
      </main>
    </div>
  );
};
