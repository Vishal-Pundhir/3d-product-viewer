import { useState, useCallback } from 'react';
import { useQueryParams } from '@shared/hooks';

/**
 * Custom hook for managing viewer state and logic
 * 
 * Note: enableBackground/enableGradient are now controlled by deliver_type
 * from output.json, not query params. Supported deliver_type values:
 * - "BG" → enable background (uses 3d_bg_glb from output.json)
 * - "GRADIENT" → enable gradient background
 * - "ORIGINAL" → show as is
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
    versionId: params.version_id || params.versionId,
    autoRotate: params.autoRotate !== false,
    performanceTier: params.tier || params.performanceTier,

    // State
    viewer,
    error,

    // Handlers
    handleLoadComplete,
    handleError,
  };
};

export default useViewer;

