import ApiClient from './apiClient';
import config from '@config/environment';

/**
 * SKU Service - handles all SKU-related API calls
 */
class SkuService {
  constructor() {
    this.apiClient = new ApiClient(config.api.baseUrl, {
      timeout: 30000,
      maxRetries: 3,
      retryDelay: 1000,
      cacheTimeout: 5 * 60 * 1000, // 5 minutes cache
    });
  }

  /**
   * Get SKU by ID
   * @param {string} skuId - The SKU identifier
   * @param {Object} options - Request options
   * @returns {Promise<Object>} SKU data
   */
  async getSkuById(skuId, options = {}) {
    if (!skuId) {
      throw new Error('SKU ID is required');
    }

    try {
      const data = await this.apiClient.get(
        '/3d/api/v2/sku/getById',
        {
          params: { sku_id: skuId },
        },
        {
          useCache: options.useCache !== false,
          retry: options.retry !== false,
        }
      );

      return this.normalizeSkuData(data);
    } catch (error) {
      console.error('Error fetching SKU data:', error);
      throw this.createSkuError(error, skuId);
    }
  }

  /**
   * Get point cloud URL for SKU
   * @param {string} skuId - The SKU identifier
   * @returns {string} Point cloud URL
   */
  getPointCloudUrl(skuId) {
    return `${config.api.s3BucketUrl}/processed/${skuId}/point_cloud.ply`;
  }

  /**
   * Get background URL
   * @param {string} bgId - Background ID
   * @returns {string} Background GLB URL
   */
  getBackgroundUrl(bgId) {
    // return `${config.api.cloudFrontUrl}/background/${bgId}/bg.glb`;
    return `${config.api.cloudFrontUrl}/bg.glb`;
  }

  /**
   * Normalize SKU data response
   * @private
   */
  normalizeSkuData(data) {
    return {
      skuId: data.sku_id,
      config: data.config_details?.model_config || {},
      status: data.status,
      metadata: {
        carName: data.car_name,
        skuName: data.sku_name,
        year: data.year,
        make: data.make,
        model: data.model,
      },
      raw: data, // Keep original data for backward compatibility
    };
  }

  /**
   * Create standardized error object
   * @private
   */
  createSkuError(error, skuId) {
    return {
      message: `Failed to fetch SKU data for ${skuId}`,
      originalError: error,
      skuId,
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Clear SKU cache
   */
  clearCache() {
    this.apiClient.clearCache();
  }
}

// Export singleton instance
export default new SkuService();

