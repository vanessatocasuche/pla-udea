const dotenv = require('dotenv')
dotenv.config({ path: '.env.dev' })

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BASE_API_URL: process.env.BASE_API_URL
  }
}

module.exports = nextConfig
