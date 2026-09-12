import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDemoModal } from '../contexts/DemoModalContext';
import {
  badgeVariantClasses,
  type ProductCard,
  type ProductSection,
} from '../data/financeProducts';

type ProductSectionsProps = {
  sections: ProductSection[];
};

export const ProductSections = ({ sections }: ProductSectionsProps) => {
  const { openDemoModal } = useDemoModal();

  const renderProductButton = (card: ProductCard) => {
    if (!card.buttonText) return null;

    const buttonClass = card.comingSoon
      ? 'inline-flex items-center gap-2 px-5 py-2.5 mt-6 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold text-gray-500 cursor-not-allowed'
      : card.featured
        ? 'inline-flex items-center gap-2 px-5 py-2.5 mt-6 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all group/btn'
        : 'inline-flex items-center gap-2 px-5 py-2.5 mt-6 bg-white/10 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/20 transition-all group/btn';

    if (card.comingSoon) {
      return <span className={buttonClass}>{card.buttonText}</span>;
    }

    if (card.external && card.link) {
      return (
        <a href={card.link} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          {card.buttonText}
          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </a>
      );
    }

    return (
      <Link to={card.link || '#'} className={buttonClass}>
        {card.buttonText}
        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    );
  };

  return (
    <div className="space-y-20">
      {sections.map((section) => (
        <div key={section.id} id={section.id}>
          <div className="mb-8">
            {section.eyebrow && (
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#667eea] mb-3">
                {section.eyebrow}
              </span>
            )}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <h3 className="text-2xl md:text-3xl font-bold">{section.header}</h3>
              {section.sectionBadge && (
                <span className="px-3 py-1 text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full">
                  {section.sectionBadge}
                </span>
              )}
            </div>
            {section.description && (
              <p className="text-gray-400 max-w-3xl">{section.description}</p>
            )}
          </div>

          <div
            className={`grid gap-8 ${
              section.cards.length === 1
                ? 'md:grid-cols-1 max-w-2xl'
                : 'md:grid-cols-2 lg:grid-cols-3'
            }`}
          >
            {section.cards.map((card) => (
              <div
                key={card.title}
                className={`group relative bg-white/5 backdrop-blur-sm rounded-3xl p-8 border transition-all hover:-translate-y-2 overflow-hidden ${
                  card.featured
                    ? 'border-orange-500/50 hover:border-orange-500/70 hover:shadow-lg hover:shadow-orange-500/10'
                    : card.comingSoon
                      ? 'border-white/5 opacity-80'
                      : 'border-white/10 hover:bg-white/10'
                }`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity`}
                />
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

                <div className="relative">
                  {card.badge && (
                    <span
                      className={`inline-block px-2.5 py-1 mb-4 text-xs font-semibold border rounded-full ${
                        badgeVariantClasses[card.badgeVariant || 'muted']
                      }`}
                    >
                      {card.badge}
                    </span>
                  )}
                  <div
                    className={`inline-flex p-4 bg-gradient-to-br ${card.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <card.icon className="w-8 h-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold mb-1">
                    {card.title}
                    {card.subtitle && (
                      <span className="text-sm font-normal text-gray-500 ml-2">
                        ({card.subtitle})
                      </span>
                    )}
                  </h4>
                  <p className="text-gray-400">{card.description}</p>
                  {renderProductButton(card)}
                  {card.interestPrompt && (
                    <button
                      type="button"
                      onClick={() => openDemoModal()}
                      className="mt-4 text-sm text-gray-500 hover:text-orange-400 transition-colors text-left"
                    >
                      {card.interestPrompt} → Talk to Us
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {section.showInterestBar !== false && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-white/5 border border-white/10 rounded-2xl">
              <p className="text-gray-400 text-sm">
                Interested in {section.header.split('—')[0].trim()}? Tell us your requirements.
              </p>
              <button
                type="button"
                onClick={() => openDemoModal()}
                className="px-5 py-2.5 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all whitespace-nowrap"
              >
                Talk to Us
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
