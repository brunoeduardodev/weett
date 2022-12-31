module.exports = {
  reactStrictMode: false,
  experimental: {
    transpilePackages: ["ui"],
    swcPlugins: [["next-superjson-plugin", {}]],
  },
};
