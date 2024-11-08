import { createContext, useContext, useState } from 'react';

interface LoadingContextType {
  pageLoading: boolean;
  submitLoading: Record<string, boolean>;
  startPageLoading: () => void;
  stopPageLoading: () => void;
  startSubmitLoading: (key: string) => void;
  stopSubmitLoading: (key: string) => void;
}

const LoadingContext = createContext<LoadingContextType | null>(null);

export function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [pageLoading, setPageLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState<Record<string, boolean>>({});

  const startPageLoading = () => setPageLoading(true);
  const stopPageLoading = () => setPageLoading(false);

  const startSubmitLoading = (key: string) => {
    setSubmitLoading(prev => ({ ...prev, [key]: true }));
  };

  const stopSubmitLoading = (key: string) => {
    setSubmitLoading(prev => ({ ...prev, [key]: false }));
  };

  return (
    <LoadingContext.Provider value={{
      pageLoading,
      submitLoading,
      startPageLoading,
      stopPageLoading,
      startSubmitLoading,
      stopSubmitLoading
    }}>
      {children}
      {pageLoading && <PageLoading />}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}