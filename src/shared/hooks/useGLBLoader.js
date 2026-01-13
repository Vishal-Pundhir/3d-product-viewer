import { useRef, useCallback } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

/**
 * Custom hook for loading GLB/GLTF models
 * @param {Object} viewerRef - React ref containing the viewer instance
 * @returns {Object} GLB loading utilities
 */
const useGLBLoader = (viewerRef) => {
  const glbModelRef = useRef(null);
  const loaderRef = useRef(new GLTFLoader());

  const cleanupModel = useCallback(() => {
    const viewer = viewerRef?.current;
    if (glbModelRef.current && viewer?.threeScene) {
      viewer.threeScene.remove(glbModelRef.current);

      // Dispose of model resources
      glbModelRef.current.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) => material.dispose());
          } else {
            child.material.dispose();
          }
        }
      });

      glbModelRef.current = null;
      console.log('[GLB] Model cleaned up successfully');
    }
  }, [viewerRef]);

  const loadModel = useCallback(
    async (urlOrFile) => {
      const viewer = viewerRef?.current;
      if (!viewer?.threeScene) {
        throw new Error('Viewer not initialized');
      }

      return new Promise((resolve, reject) => {
        const loader = loaderRef.current;

        // Convert File to URL if it's a File object
        let loadUrl = urlOrFile;
        let isFile = false;

        if (urlOrFile instanceof File) {
          loadUrl = URL.createObjectURL(urlOrFile);
          isFile = true;
        }

        loader.load(
          loadUrl,
          (gltf) => {
            const model = gltf.scene;

            // Apply transformations
            model.rotation.x = Math.PI / 2;
            model.position.z -= 1.0;

            // Store reference to the model
            glbModelRef.current = model;

            // Add model to the viewer's scene
            viewer.threeScene.add(model);

            console.log(
              '[GLB] Model loaded successfully:',
              isFile ? urlOrFile.name : urlOrFile
            );

            // Clean up object URL if it was created from a File
            if (isFile) {
              URL.revokeObjectURL(loadUrl);
            }

            resolve(model);
          },
          (progress) => {
            // Progress callback
            const percentComplete = (progress.loaded / progress.total) * 100;
            console.log(`[GLB] Loading progress: ${percentComplete.toFixed(2)}%`);
          },
          (error) => {
            console.error('[GLB] Error loading model:', error);

            // Clean up object URL if it was created from a File
            if (isFile) {
              URL.revokeObjectURL(loadUrl);
            }

            reject(error);
          }
        );
      });
    },
    [viewerRef]
  );

  const addLights = useCallback(() => {
    const viewer = viewerRef?.current;
    if (!viewer?.threeScene) return [];

    const lights = [];

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    viewer.threeScene.add(ambientLight);
    lights.push(ambientLight);

    // Directional light 1
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.0);
    directionalLight1.position.set(5, 10, 5);
    viewer.threeScene.add(directionalLight1);
    lights.push(directionalLight1);

    // Directional light 2
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, 5, -5);
    viewer.threeScene.add(directionalLight2);
    lights.push(directionalLight2);

    console.log('[GLB] Lights added to scene');

    return lights;
  }, [viewerRef]);

  const removeLights = useCallback(
    (lights) => {
      const viewer = viewerRef?.current;
      if (!viewer?.threeScene || !lights) return;

      lights.forEach((light) => {
        viewer.threeScene.remove(light);
        light.dispose?.();
      });

      console.log('[GLB] Lights removed from scene');
    },
    [viewerRef]
  );

  return {
    glbModel: glbModelRef.current,
    loadModel,
    cleanupModel,
    addLights,
    removeLights,
  };
};

export default useGLBLoader;

