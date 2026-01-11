/**
 * Logging utilities
 */

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

class Logger {
  constructor() {
    this.level = import.meta.env.VITE_ENABLE_DEBUG === 'true' 
      ? LOG_LEVELS.DEBUG 
      : LOG_LEVELS.INFO;
  }

  debug(...args) {
    if (this.level <= LOG_LEVELS.DEBUG) {
      console.log('[DEBUG]', ...args);
    }
  }

  info(...args) {
    if (this.level <= LOG_LEVELS.INFO) {
      console.log('[INFO]', ...args);
    }
  }

  warn(...args) {
    if (this.level <= LOG_LEVELS.WARN) {
      console.warn('[WARN]', ...args);
    }
  }

  error(...args) {
    if (this.level <= LOG_LEVELS.ERROR) {
      console.error('[ERROR]', ...args);
    }
  }

  setLevel(level) {
    this.level = level;
  }
}

export default new Logger();

