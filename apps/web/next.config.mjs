/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@cloudmatize/ts-utils"],
  i18n: {
    locales: ['en', 'pt'],
    defaultLocale: 'pt',
  }
};

export default nextConfig