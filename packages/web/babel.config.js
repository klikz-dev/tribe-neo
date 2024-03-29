module.exports = api => {
  const isTest = api.env('test')

  if (isTest) {
    return {
      presets: [
        ['@babel/preset-env', { targets: { node: 'current' } }],
        '@babel/preset-typescript',
        ['@babel/preset-react'],
      ],
    }
  }

  return {
    presets: ['razzle/babel'],
    plugins: ['@loadable/babel-plugin'],
  }
}
