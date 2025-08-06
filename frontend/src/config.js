const config = {
  API_BASE_URL: process.env.NODE_ENV === 'production' 
    ? '' // Use same domain for Vercel deployment
    : 'http://localhost:5000'
};

export default config;