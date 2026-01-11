/**
 * Application constants
 */

export const PERFORMANCE_TIERS = ['low', 'basic', 'medium', 'high', 'ultra-high'];

export const DEFAULT_CAMERA_POSITION = [-0.5000521540641786, -3.7422714233398438, -0.06316226720809937];

export const DEFAULT_CAMERA_LOOK_AT = [0, 0, 0];

export const ANGLE_DEVIATION = Math.atan(0.01);

export const VIEWER_CONFIG = {
  selfDrivenMode: true,
  cameraUp: [0, 0, 1],
  sharedMemoryForWorkers: false,
  integerBasedSort: true,
  ignoreDevicePixelRatio: false,
};

export const SPLAT_SCENE_CONFIG = {
  splatAlphaRemovalThreshold: 0,
  progressiveLoad: true,
  showLoadingUI: true,
  position: [0, 0, 0],
  rotation: [0, 0, 0, 0],
  scale: [1, 1, 1],
};

export const GRADIENT_BACKGROUND = {
  style: `linear-gradient(to bottom,
    #51729c 0%,
    #5e85b2 10%,
    #79a4d0 30%,
    #b9d2de 50%,
    #78726f 100%)`,
};

export const LIGHTING_CONFIG = {
  ambient: { color: 0xffffff, intensity: 1.5 },
  directional1: { color: 0xffffff, intensity: 1.0, position: [5, 10, 5] },
  directional2: { color: 0xffffff, intensity: 0.5, position: [-5, 5, -5] },
};

export const CONTROLS_CONFIG = {
  dampingFactor: 0.06,
  autoRotateSpeed: 2.0,
  enableDamping: true,
  zoomSpeed: 0.5,
};

export const ERROR_MESSAGES = {
  NO_SKU_ID: 'Error: sku_id is required in URL parameters',
  API_FETCH_FAILED: 'Error fetching SKU data',
  GLB_LOAD_FAILED: 'GLB model loading failed',
  VIEWER_INIT_FAILED: 'Failed to initialize 3D viewer',
};

