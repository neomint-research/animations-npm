module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: '14',
        browsers: ['> 1%', 'last 2 versions']
      },
      modules: false
    }],
    ['@babel/preset-react', {
      runtime: 'automatic'
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ]
};