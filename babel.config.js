module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        node: '14',
        browsers: ['> 1%', 'last 2 versions']
      },
      modules: process.env.NODE_ENV === 'test' ? 'auto' : false
    }],
    ['@babel/preset-react', {
      runtime: 'automatic'
    }]
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread'
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: 'current'
          }
        }],
        '@babel/preset-react'
      ]
    }
  }
};