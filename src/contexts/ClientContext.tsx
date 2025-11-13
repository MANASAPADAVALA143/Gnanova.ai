import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface Client {
  id: string;
  business_name: string;
  slug: string;
  tagline: string | null;
  industry: string | null;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  instagram_handle: string | null;
  youtube_handle: string | null;
  facebook_handle: string | null;
}

interface ClientContextType {
  currentClient: Client | null;
  setCurrentClient: (client: Client | null) => void;
  clients: Client[];
  loading: boolean;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export const useClient = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error('useClient must be used within ClientProvider');
  }
  return context;
};

interface ClientProviderProps {
  children: ReactNode;
}

export const ClientProvider = ({ children }: ClientProviderProps) => {
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchClients();
    } else {
      setClients([]);
      setCurrentClient(null);
      setLoading(false);
    }
  }, [user]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('id, business_name, slug, tagline, industry, logo_url, primary_color, secondary_color, accent_color, instagram_handle, youtube_handle, facebook_handle')
        .order('business_name');

      if (error) throw error;

      setClients(data || []);

      if (data && data.length > 0) {
        const savedSlug = localStorage.getItem('current_client_slug');
        const savedClient = savedSlug
          ? data.find(c => c.slug === savedSlug)
          : null;
        setCurrentClient(savedClient || data[0]);
      }
    } catch (error) {
      console.error('Error fetching clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetCurrentClient = (client: Client | null) => {
    setCurrentClient(client);
    if (client) {
      localStorage.setItem('current_client_slug', client.slug);
    } else {
      localStorage.removeItem('current_client_slug');
    }
  };

  return (
    <ClientContext.Provider value={{
      currentClient,
      setCurrentClient: handleSetCurrentClient,
      clients,
      loading
    }}>
      {children}
    </ClientContext.Provider>
  );
};
