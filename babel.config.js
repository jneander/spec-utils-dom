module.exports = {
  ignore: ['**/*.spec.js', '**/_specs_/**'],

  presets: [
    [
      '@babel/preset-env',

      {
        modules: process.env.CJS ? 'commonjs' : false,

        targets: {
          browsers: [
            'last 2 chrome versions',
            'last 2 firefox versions',
            'last 2 edge versions',
            'last 2 ios versions',
            'last 2 opera versions',
            'last 2 safari versions',
            'last 2 ChromeAndroid versions',
          ],
        },

        useBuiltIns: false,
      },
    ],
  ],
}
