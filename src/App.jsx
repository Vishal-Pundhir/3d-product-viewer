import { GaussianSplatViewer, useViewer } from '@features/viewer';
import { ErrorBoundary } from '@shared/components';
import './styles/global.css';

function App() {
  const {
    skuId,
    versionId,
    autoRotate,
    performanceTier,
    handleLoadComplete,
    handleError,
  } = useViewer();

  if (!skuId) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center text-white p-8">
          <h1 className="text-2xl font-bold mb-4">3D Gaussian Splat Viewer</h1>
          <p className="text-gray-400">
            Please provide a <code className="bg-gray-800 px-2 py-1 rounded">sku_id</code> parameter in the URL
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Example: ?sku_id=YOUR_SKU_ID&amp;version_id=YOUR_VERSION_ID
          </p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="w-screen h-screen bg-black overflow-hidden">
        <GaussianSplatViewer
          skuId={skuId}
          versionId={versionId}
          autoRotate={autoRotate}
          performanceTier={performanceTier}
          onLoadComplete={handleLoadComplete}
          onError={handleError}
          className="w-full h-full"
        />
      </div>
    </ErrorBoundary>
  );
}

export default App;
