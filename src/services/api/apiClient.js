import axios from 'axios';

/**
 * API Client with retry logic and error handling
 */
class ApiClient {
  constructor(baseURL, options = {}) {
    this.client = axios.create({
      baseURL,
      timeout: options.timeout || 30000,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000;
    this.cache = new Map();
    this.cacheTimeout = options.cacheTimeout || 5 * 60 * 1000; // 5 minutes

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Add any custom headers or auth tokens here
        if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
          console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`);
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
          console.log(`[API Response] ${response.status} ${response.config.url}`);
        }
        return response;
      },
      (error) => this.handleError(error)
    );
  }

  handleError(error) {
    if (error.response) {
      // Server responded with error status
      const errorData = {
        status: error.response.status,
        message: error.response.data?.message || error.message,
        data: error.response.data,
      };
      console.error('[API Error]', errorData);
      return Promise.reject(errorData);
    } else if (error.request) {
      // Request made but no response
      const errorData = {
        message: 'No response from server',
        originalError: error.message,
      };
      console.error('[API Error]', errorData);
      return Promise.reject(errorData);
    } else {
      // Error in request configuration
      const errorData = {
        message: error.message,
      };
      console.error('[API Error]', errorData);
      return Promise.reject(errorData);
    }
  }

  async retryRequest(requestFn, retries = this.maxRetries) {
    try {
      return await requestFn();
    } catch (error) {
      if (retries > 0 && this.isRetryableError(error)) {
        const delay = this.calculateRetryDelay(this.maxRetries - retries);
        console.warn(`[API Retry] Retrying in ${delay}ms... (${retries} attempts left)`);
        await this.sleep(delay);
        return this.retryRequest(requestFn, retries - 1);
      }
      throw error;
    }
  }

  isRetryableError(error) {
    // Retry on network errors or 5xx server errors
    return !error.status || (error.status >= 500 && error.status < 600);
  }

  calculateRetryDelay(attemptNumber) {
    // Exponential backoff: 1s, 2s, 4s, 8s...
    return this.retryDelay * Math.pow(2, attemptNumber);
  }

  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getCachedData(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      if (import.meta.env.VITE_ENABLE_DEBUG === 'true') {
        console.log(`[API Cache] Hit for ${key}`);
      }
      return cached.data;
    }
    if (cached) {
      this.cache.delete(key);
    }
    return null;
  }

  setCachedData(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clearCache() {
    this.cache.clear();
  }

  async get(url, config = {}, options = {}) {
    const cacheKey = `GET:${url}:${JSON.stringify(config.params || {})}`;
    
    if (options.useCache !== false) {
      const cached = this.getCachedData(cacheKey);
      if (cached) return cached;
    }

    const requestFn = () => this.client.get(url, config);
    const response = await (options.retry !== false
      ? this.retryRequest(requestFn)
      : requestFn());

    if (options.useCache !== false) {
      this.setCachedData(cacheKey, response.data);
    }

    return response.data;
  }

  async post(url, data = {}, config = {}, options = {}) {
    const requestFn = () => this.client.post(url, data, config);
    const response = await (options.retry !== false
      ? this.retryRequest(requestFn)
      : requestFn());
    return response.data;
  }

  async put(url, data = {}, config = {}, options = {}) {
    const requestFn = () => this.client.put(url, data, config);
    const response = await (options.retry !== false
      ? this.retryRequest(requestFn)
      : requestFn());
    return response.data;
  }

  async delete(url, config = {}, options = {}) {
    const requestFn = () => this.client.delete(url, config);
    const response = await (options.retry !== false
      ? this.retryRequest(requestFn)
      : requestFn());
    return response.data;
  }
}

export default ApiClient;

