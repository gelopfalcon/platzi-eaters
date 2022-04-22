/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    STAGING_ALCHEMY_KEY : 'https://eth-rinkeby.alchemyapi.io/v2/vaQ5QKe6VKPRX-_ZwQ62QCXt0z89ESjX'
  }
}

module.exports = nextConfig
