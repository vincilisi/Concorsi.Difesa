/** @type {import('next').NextConfig} */
const nextConfig = {
  // Puoi aggiungere opzioni qui, ad esempio:
  reactStrictMode: true,
  // Se usi immagini da domini esterni:
  images: {
    domains: ['your-image-domain.com'],
  },
};

module.exports = nextConfig;
