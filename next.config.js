/** @type {import('next').NextConfig} */

const path = require('path');
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: "public",
  runtimeCaching,
  disable: process.env.NODE_ENV === 'development'
})

module.exports = withPWA({
  images: {
    domains: ["cdn.sanity.io", "via.placeholder.com"]
  },
  async redirects() {
    return [
      {
        source: '/post',
        destination: '/',
        permanent: true,
      },
      {
        source: '/category',
        destination: '/',
        permanent: true,
      },
      {
        source: '/author',
        destination: '/',
        permanent: true,
      },
    ]
  },
})

