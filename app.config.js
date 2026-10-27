export default ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    apiUrl: process.env.IMARKET_API_URL || "http://localhost:9000/api",
  },
});
