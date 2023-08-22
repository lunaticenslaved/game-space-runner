import { useCallback, useState } from 'react';

export const useGetViewerFromSession = (isLoadingInitial = false) => {
  const [isLoading, setLoading] = useState(isLoadingInitial);

  const getViewer = useCallback(async () => {
    setLoading(true);

    try {
      //
    } catch {
      //
    }

    setLoading(false);
  }, []);

  return { isLoading, getViewer };
};
