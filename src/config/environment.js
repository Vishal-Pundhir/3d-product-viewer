/**
 * Environment configuration management
 */

const config = {
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'https://api.spyne.ai',
    s3BucketUrl:
      import.meta.env.VITE_S3_BUCKET_URL || 'https://spyne-prod-3d-model.s3.amazonaws.com',
    cloudFrontUrl:
      import.meta.env.VITE_CLOUDFRONT_URL || 'https://d2b9isnedwxntv.cloudfront.net',
  },
  debug: {
    enabled: import.meta.env.VITE_ENABLE_DEBUG === 'true',
    sentryDsn: import.meta.env.VITE_SENTRY_DSN || '',
  },
  performance: {
    defaultTier: import.meta.env.VITE_DEFAULT_PERFORMANCE_TIER || 'medium',
  },
};

export default config;

