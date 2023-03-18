/** @type {import('next').NextConfig} */

const path = require('path');
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: "public",
  runtimeCaching,
})

module.exports = withPWA({
  images: {
    domains: ["cdn.sanity.io", "via.placeholder.com"]
  },
  webpack: (config) => {
    config.resolve.modules.push(path.resolve('./'));
    return config;
  }
})

