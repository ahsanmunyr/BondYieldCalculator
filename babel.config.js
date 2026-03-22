module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@components': './src/components',
          '@screens': './src/screens',
          '@hooks': './src/screens/calculator/hooks',
          '@types': './src/types',
          '@utils': './src/utils',
          '@constants': './src/constants',
          '@i18n': './src/i18n',
        },
      },
    ],
  ],
};
