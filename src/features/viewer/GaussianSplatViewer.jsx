import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Viewer, DeviceProfiler } from '@core/gaussian-splats/gaussian-splats-3d.module';
import { skuService } from '@services/api';
import { useGLBLoader } from '@shared/hooks';
import { AppError, ErrorCodes, handleError } from '@shared/utils';
import logger from '@shared/utils/logger';
import {
  DEFAULT_CAMERA_POSITION,
  DEFAULT_CAMERA_LOOK_AT,
  ANGLE_DEVIATION,
  VIEWER_CONFIG,
  SPLAT_SCENE_CONFIG,
  GRADIENT_BACKGROUND,
  CONTROLS_CONFIG,
} from '@config/constants';

/**
 * GaussianSplatViewer - Main 3D Gaussian Splat Viewer Component
 * Displays 3D point cloud models with optional background and customizable controls
 */
const GaussianSplatViewer = ({
  skuId,
  autoRotate = true,
  performanceTier = null,
  enableBackground = false,
  enableGradient = false,
  backgroundUrl = null,
  onLoadComplete = null,
  onError = null,
  className = '',
  style = {},
}) => {
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const lightsRef = useRef([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [customBackground, setCustomBackground] = useState(backgroundUrl);

  const { loadModel, cleanupModel, addLights, removeLights } = useGLBLoader(viewerRef);

  useEffect(() => {
    let mounted = true;
    let viewer = null;
    let lights = [];

    const initializeViewer = async () => {
      if (!skuId) {
        const err = new AppError('SKU ID is required', ErrorCodes.NO_SKU_ID);
        setError(err);
        if (onError) onError(err);
        return;
      }

      // Wait for container to be available
      if (!containerRef.current) {
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch SKU data
        logger.info('Fetching SKU data for:', skuId);
        const skuData = await skuService.getSkuById(skuId);

        if (!mounted) return;

        // Get point cloud URL
        const pointCloudUrl = skuService.getPointCloudUrl(skuId);
        logger.info('Point cloud URL:', pointCloudUrl);

        // Extract camera configuration
        const initialCameraPosition =
          skuData.config?.new_perams?.initialCameraPosition || DEFAULT_CAMERA_POSITION;
        const initialCameraDistance =
          skuData.config?.torus_config?.torus_inner_radius || 3.5;

        // Device profiling for optimal settings
        const deviceProfiler = new DeviceProfiler(performanceTier);
        const optimalSettings = await deviceProfiler.getOptimalSettings();

        logger.debug('Optimal settings:', optimalSettings);

        // Create viewer instance with rootElement to render inside our container
        viewer = new Viewer({
          ...VIEWER_CONFIG,
          rootElement: containerRef.current,
          initialCameraPosition,
          initialCameraLookAt: DEFAULT_CAMERA_LOOK_AT,
          ...optimalSettings,
        });

        viewerRef.current = viewer;

        // Load the splat scene
        await viewer.addSplatScene(pointCloudUrl, SPLAT_SCENE_CONFIG);

        if (!mounted) return;

        // Start rendering
        viewer.start();

        // Configure renderer
        if (viewer.renderer) {
          viewer.renderer.setClearColor(0x000000, 0); // Transparent

          // Apply gradient background if enabled
          if (enableGradient && viewer.renderer.domElement?.parentElement) {
            viewer.renderer.domElement.parentElement.style.background =
              GRADIENT_BACKGROUND.style;
            logger.debug('Gradient background applied');
          }
        }

        // Configure controls
        if (viewer.controls) {
          viewer.controls.minDistance = initialCameraDistance * 0.9;
          viewer.controls.maxDistance = initialCameraDistance * 1.1;
          viewer.controls.minPolarAngle = Math.PI / 2 - ANGLE_DEVIATION;
          viewer.controls.maxPolarAngle = Math.PI / 2 + ANGLE_DEVIATION;
          viewer.controls.dampingFactor = CONTROLS_CONFIG.dampingFactor;
          viewer.controls.autoRotateSpeed = CONTROLS_CONFIG.autoRotateSpeed;
          viewer.controls.autoRotate = autoRotate;
          viewer.controls.enableDamping = CONTROLS_CONFIG.enableDamping;
          viewer.controls.zoomSpeed = CONTROLS_CONFIG.zoomSpeed;
        }

        viewer.update();

        // Add lights for GLB models
        lights = addLights();
        lightsRef.current = lights;

        // Load background model if enabled
        if (enableBackground) {
          try {
            const bgUrl = customBackground || skuService.getBackgroundUrl('default');
            await loadModel(bgUrl);
            logger.info('Background model loaded');
          } catch (bgError) {
            logger.warn('Background model loading failed:', bgError);
            // Don't fail the entire viewer if background fails
          }
        }

        setLoading(false);

        if (onLoadComplete) {
          onLoadComplete(viewer);
        }

        logger.info('Viewer initialized successfully');
      } catch (err) {
        if (!mounted) return;

        const appError = new AppError(
          'Failed to initialize viewer',
          ErrorCodes.VIEWER_INIT_ERROR,
          err
        );

        handleError(appError, 'Viewer Initialization');
        setError(appError);
        setLoading(false);

        if (onError) {
          onError(appError);
        }
      }
    };

    initializeViewer();

    // Cleanup function
    return () => {
      mounted = false;

      // Remove lights
      if (lights.length > 0) {
        removeLights(lights);
      }

      // Cleanup GLB model
      cleanupModel();

      // Dispose viewer
      if (viewer) {
        viewer.dispose();
        viewerRef.current = null;
        logger.debug('Viewer disposed');
      }
    };
  }, [
    skuId,
    autoRotate,
    performanceTier,
    enableBackground,
    enableGradient,
    customBackground,
    onLoadComplete,
    onError,
  ]);

  // Handle background URL changes
  useEffect(() => {
    if (backgroundUrl) {
      setCustomBackground(backgroundUrl);
    }
  }, [backgroundUrl]);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center h-full ${className}`}
        style={style}
      >
        <div className="text-center text-white">
          <h2 className="text-xl font-semibold mb-2">Error Loading Viewer</h2>
          <p className="text-gray-300">{error.message}</p>
        </div>
      </div>
    );
  }

  // Render viewer container - core engine renders its canvas inside this element
  return (
    <div
      ref={containerRef}
      className={`w-full h-full ${className}`}
      style={style}
      id="gaussian-splat-viewer-container"
    />
  );
};

GaussianSplatViewer.propTypes = {
  skuId: PropTypes.string.isRequired,
  autoRotate: PropTypes.bool,
  performanceTier: PropTypes.oneOf(['low', 'basic', 'medium', 'high', 'ultra-high']),
  enableBackground: PropTypes.bool,
  enableGradient: PropTypes.bool,
  backgroundUrl: PropTypes.string,
  onLoadComplete: PropTypes.func,
  onError: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default GaussianSplatViewer;

