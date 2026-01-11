import { useState, useCallback } from 'react';
import { useQueryParams } from '@shared/hooks';

/**
 * Custom hook for managing viewer state and logic
 */
const useViewer = () => {
  const params = useQueryParams();
  const [viewer, setViewer] = useState(null);
  const [error, setError] = useState(null);

  const handleLoadComplete = useCallback((viewerInstance) => {
    setViewer(viewerInstance);
    console.log('[Viewer] Load complete');
  }, []);

  const handleError = useCallback((err) => {
    setError(err);
    console.error('[Viewer] Error:', err);
  }, []);

  return {
    // Query parameters
    skuId: params.sku_id || params.skuId,
    autoRotate: params.autoRotate !== false,
    performanceTier: params.tier || params.performanceTier,
    enableBackground: params.bg === true || params.enableBackground === true,
    enableGradient: params.gradient === true || params.enableGradient === true,
    backgroundUrl: params.bgUrl || params.backgroundUrl,

    // State
    viewer,
    error,

    // Handlers
    handleLoadComplete,
    handleError,
  };
};

export default useViewer;

