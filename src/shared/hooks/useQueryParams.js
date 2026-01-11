import { useState, useEffect } from 'react';

/**
 * Custom hook for parsing URL query parameters
 * @returns {Object} Parsed query parameters
 */
const useQueryParams = () => {
  const [params, setParams] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const paramObj = {};

    // Parse all query parameters
    for (const [key, value] of searchParams.entries()) {
      // Convert boolean strings to actual booleans
      if (value === 'true') paramObj[key] = true;
      else if (value === 'false') paramObj[key] = false;
      else paramObj[key] = value;
    }

    setParams(paramObj);
  }, []);

  return params;
};

export default useQueryParams;

