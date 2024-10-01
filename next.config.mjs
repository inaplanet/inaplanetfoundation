import { fileURLToPath } from 'url';
import webpack from 'webpack';
import path from 'path';

// Convert import.meta.url to __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  
    reactStrictMode: false,

    // Enable Webpack customization
    webpack: (config, { isServer }) => {
      // 1. Handle copying static files (similar to CopyWebpackPlugin)
      // In Next.js, static files go into the 'public' folder, no need to use CopyWebpackPlugin
      
      // HtmlWebpackPlugin Equivalent
      // Next.js automatically generates HTML files for each page, so no need for HtmlWebpackPlugin
  
      // 2. Add alias for 'three'
      config.resolve.alias = {
        ...config.resolve.alias,
        three: path.resolve(__dirname, 'node_modules/three'),
      };

      // 3. Polyfill for 'encoding' module
      config.resolve.fallback = {
        ...config.resolve.fallback,
        encoding: false,  // This disables the encoding module in Webpack
      };
  
      // 4. Define environment variables
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.NEXT_PUBLIC_API_KEY': JSON.stringify(process.env.NEXT_PUBLIC_API_KEY),
          'process.env.OTHER_VARIABLE': JSON.stringify(process.env.OTHER_VARIABLE),
        })
      );
  
      // 5. Add custom Babel loader for .js and .mjs files
      config.module.rules.push(
        {
          test: /\.js$/,
          exclude: /node_modules\/(?!(unstorage|@walletconnect|@walletconnect\/keyvaluestorage|@walletconnect\/web3wallet|@web3modal\/ethereum|@web3modal\/html)\/).*/,
        },
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        }
      );
  
      // 6. Add rules for handling images, models, and other media files
      config.module.rules.push(
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/images/',
                publicPath: '/assets/images/', // Assets accessible from public path
              },
            },
          ],
        },
        {
          test: /\.(glb|gltf|fbx|obj)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/models/',
                publicPath: '/assets/models/',
              },
            },
          ],
        },
        {
          test: /\.(mp3)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/audios/',
                publicPath: '/assets/audios/',
              },
            },
          ],
        },
        {
          test: /\.(mp4|webm)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/videos/',
                publicPath: '/assets/videos/',
              },
            },
          ],
        }
      );
  
      // 7. Handle shaders
      config.module.rules.push(
        {
          test: /\.(glsl|vs|fs|vert|frag)$/,
          exclude: /node_modules/,
          use: [
            'raw-loader',
            'glslify-loader'
          ],
        }
      );
  
      return config;
    },
  
    // Allow images from external domains if necessary
    images: {
      domains: ['example.com'], // Add allowed domains if needed
    },

    // Add redirects or custom headers if needed
    async redirects() {
      return [
        {
          source: '/old-path',
          destination: '/new-path',
          permanent: true,
        },
      ];
    },

    async headers() {
      return [
        {
          source: '/draco/:all*',
          headers: [
            {
              key: 'Cache-Control',
              value: 'public, max-age=31536000, immutable',
            },
          ],
        },
      ];
    },
};

export default nextConfig;
