import { useRef } from 'react';
import PropTypes from 'prop-types';

/**
 * BackgroundUpload - Component for uploading custom GLB/GLTF background models
 */
const BackgroundUpload = ({ onFileSelect, enabled = true }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validExtensions = ['.glb', '.gltf'];
    const fileName = file.name.toLowerCase();
    const isValidFile = validExtensions.some((ext) => fileName.endsWith(ext));

    if (!isValidFile) {
      alert('Please upload only GLB or GLTF files');
      event.target.value = ''; // Reset file input
      return;
    }

    console.log('[BackgroundUpload] Loading custom background:', file.name);
    onFileSelect(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  if (!enabled) return null;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        onChange={handleFileUpload}
        className="hidden"
      />
      <button
        onClick={handleUploadClick}
        className="fixed top-5 right-5 px-4 py-2.5 bg-primary text-white border-none rounded-md cursor-pointer text-sm font-medium shadow-lg z-[1000] transition-all duration-300 ease-in-out hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-xl"
        aria-label="Upload custom background model"
      >
        📁 Upload Background
      </button>
    </>
  );
};

BackgroundUpload.propTypes = {
  onFileSelect: PropTypes.func.isRequired,
  enabled: PropTypes.bool,
};

export default BackgroundUpload;

