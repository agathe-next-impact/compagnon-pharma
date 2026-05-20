import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // La PWA statique vit dans /public/. On l'expose à la racine.
  async rewrites() {
    return [
      { source: '/', destination: '/index.html' },
    ]
  },
  async headers() {
    return [
      {
        // Le service worker doit pouvoir être contrôlé / mis à jour sans cache long.
        source: '/service-worker.js',
        headers: [
          { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
          { key: 'Service-Worker-Allowed', value: '/' },
        ],
      },
      {
        source: '/manifest.webmanifest',
        headers: [{ key: 'Content-Type', value: 'application/manifest+json; charset=utf-8' }],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
