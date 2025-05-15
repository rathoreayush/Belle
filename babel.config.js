module.exports = {
  presets: ['module:@react-native/babel-preset'],

  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.jsx', '.json'],
        alias: {
          assets: './assets',
          components: './src/components',
          screens: './src/screens',
          theme: './src/theme',
          navigation: './src/navigation',
          utils: './src/utils',
          hooks: './src/hooks',
          constants: './src/constants',
          api: './src/api',
          contexts: './src/contexts',
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
      },
    ],
  ],
};
