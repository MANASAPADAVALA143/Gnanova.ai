import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type DemoModalContextValue = {
  isOpen: boolean;
  defaultProductInterest: string | null;
  openDemoModal: (productInterest?: string) => void;
  closeDemoModal: () => void;
};

const DemoModalContext = createContext<DemoModalContextValue | null>(null);

export const DemoModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultProductInterest, setDefaultProductInterest] = useState<string | null>(null);

  const openDemoModal = useCallback((productInterest?: string) => {
    setDefaultProductInterest(productInterest ?? null);
    setIsOpen(true);
  }, []);

  const closeDemoModal = useCallback(() => {
    setIsOpen(false);
    setDefaultProductInterest(null);
  }, []);

  return (
    <DemoModalContext.Provider
      value={{ isOpen, defaultProductInterest, openDemoModal, closeDemoModal }}
    >
      {children}
    </DemoModalContext.Provider>
  );
};

export const useDemoModal = () => {
  const ctx = useContext(DemoModalContext);
  if (!ctx) {
    throw new Error('useDemoModal must be used within DemoModalProvider');
  }
  return ctx;
};
