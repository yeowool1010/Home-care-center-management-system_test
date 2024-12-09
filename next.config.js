// next.config.js
module.exports = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'utf-8-validate': false,
    };
    return config;
  },
};
