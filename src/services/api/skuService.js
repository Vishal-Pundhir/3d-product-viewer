import config from '@config/environment';

/**
 * SKU Service - handles all SKU-related operations
 */
class SkuService {
  /**
   * Get point cloud URL for SKU
   * @param {string} skuId - The SKU identifier
   * @param {string} versionId - The version identifier
   * @param {string} deliverType - The deliver type ("BG", "GRADIENT", or "ORIGINAL")
   * @returns {string} Point cloud URL
   * 
   * Note: For "BG" and "GRADIENT" deliver types, uses point_cloud_cropped.ply
   *       For "ORIGINAL", uses point_cloud.ply
   */
  getPointCloudUrl(skuId, versionId, deliverType = 'ORIGINAL') {
    const filename = (deliverType === 'BG' || deliverType === 'GRADIENT') 
      ? 'point_cloud_cropped.ply' 
      : 'point_cloud.ply';
    return `${config.api.s3BucketUrl}/processed/${skuId}/${versionId}/${filename}`;
  }

  /**
   * Get output config URL for SKU
   * @param {string} skuId - The SKU identifier
   * @param {string} versionId - The version identifier
   * @returns {string} Output config URL
   */
  getOutputConfigUrl(skuId, versionId) {
    return `${config.api.s3BucketUrl}/processed/${skuId}/${versionId}/output.json`;
  }

  /**
   * Fetch output config from output.json
   * Contains metadata, deliver_type, and background URL
   * @param {string} skuId - The SKU identifier
   * @param {string} versionId - The version identifier
   * @returns {Promise<Object>} Output config data (raw, as-is)
   */
  async getOutputConfig(skuId, versionId) {
    if (!skuId || !versionId) {
      throw new Error('SKU ID and Version ID are required');
    }

    try {
      const url = this.getOutputConfigUrl(skuId, versionId);
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch output config: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching output config:', error);
      throw {
        message: `Failed to fetch output config for ${skuId}/${versionId}`,
        originalError: error,
        skuId,
        versionId,
        timestamp: new Date().toISOString(),
      };
    }
  }
}

// Export singleton instance
export default new SkuService();
