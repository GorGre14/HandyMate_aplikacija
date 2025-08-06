const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'http://88.200.63.148:5000' // University server
    : 'http://localhost:5000'      // Local development
};

export default config;