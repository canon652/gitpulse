const CACHE_TTL = 10 * 60 * 1000;

export const getCached = (key) => {
  try {
    const item = localStorage.getItem(`gp_cache_${key}`);
    if (!item) return null;
    const { data, timestamp } = JSON.parse(item);
    if (Date.now() - timestamp > CACHE_TTL) {
      localStorage.removeItem(`gp_cache_${key}`);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

export const setCached = (key, data) => {
  try {
    localStorage.setItem(
      `gp_cache_${key}`,
      JSON.stringify({ data, timestamp: Date.now() })
    );
  } catch {}
};
