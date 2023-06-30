/** @type {import('next').NextConfig} */
const nextConfig = {
  "routes": [
    {
      "src": "/(.*)",
      "dest": "./index.js",
      "methods": ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      "headers": {
        "Access-Control-Allow-Origin": "*"
      }
    }
  ]
}

module.exports = nextConfig
