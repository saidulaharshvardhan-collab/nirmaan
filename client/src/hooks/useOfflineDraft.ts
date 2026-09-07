import { useState, useEffect } from 'react';

const DRAFT_KEY = 'gramutthan_report_draft';

export function useOfflineDraft<T extends Record<string, any>>(initialValues: T) {
  const [draft, setDraft] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) {
        return { ...initialValues, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to load local draft:', e);
    }
    return initialValues;
  });

  const [isSavedLocally, setIsSavedLocally] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveDraft = (values: Partial<T>) => {
    setDraft(prev => {
      const updated = { ...prev, ...values };
      try {
        localStorage.setItem(DRAFT_KEY, JSON.stringify(updated));
        setIsSavedLocally(true);
        setTimeout(() => setIsSavedLocally(false), 2500);
      } catch (e) {
        console.warn('Could not save draft locally:', e);
      }
      return updated;
    });
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    setDraft(initialValues);
    setIsSavedLocally(false);
  };

  return {
    draft,
    saveDraft,
    clearDraft,
    isSavedLocally,
    isOnline
  };
}
