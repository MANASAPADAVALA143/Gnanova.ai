import { X } from 'lucide-react';
import { useDemoModal } from '../contexts/DemoModalContext';
import { DemoRequestForm } from './DemoRequestForm';

export const DemoRequestModal = () => {
  const { isOpen, closeDemoModal } = useDemoModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeDemoModal}
      />
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#141414] border border-white/10 rounded-3xl shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-[#141414] z-10">
          <div>
            <h2 className="text-2xl font-bold text-white">Talk to Us</h2>
            <p className="text-sm text-gray-400 mt-1">Book a demo with the Gnanova AI team</p>
          </div>
          <button
            onClick={closeDemoModal}
            className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <DemoRequestForm compact />
        </div>
      </div>
    </div>
  );
};
