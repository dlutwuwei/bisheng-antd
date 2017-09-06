const path = require('path');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

module.exports = {
  port: 8000,
  // 扫描docs和posts中所有markdown
  source: {
    components: 'components',
    docs: 'docs',
    topbuzz: 'topbuzz'
  },
  theme: './theme',
  htmlTemplate: './theme/static/template.html',
  themeConfig: {
    categoryOrder: {
      设计原则: 2,
      Principles: 2,
    },
    typeOrder: {
      General: 0,
      Layout: 1,
      Navigation: 2,
      'Data Entry': 3,
      'Data Display': 4,
      Feedback: 5,
      Localization: 6,
      Other: 7,
    },
    docVersions: {
      '0.9.x': 'http://09x.ant.design',
      '0.10.x': 'http://010x.ant.design',
      '0.11.x': 'http://011x.ant.design',
      '0.12.x': 'http://012x.ant.design',
      '1.x': 'http://1x.ant.design',
    },
  },
  entryName: 'index',
  filePathMapper(filePath) {
    if (filePath === '/index.html') {
      return ['/index.html', '/index-cn.html'];
    }
    if (filePath.endsWith('/index.html')) {
      return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
    }
    if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
      return [filePath, filePath.replace(/\.html$/, '-cn.html')];
    }
    return filePath;
  },
  doraConfig: {
    verbose: true,
    plugins: ['dora-plugin-upload'],
  },
  webpackConfig(config) {

    config.externals = {
      'react-router-dom': 'ReactRouterDOM',
    };

    config.babel.plugins.push([
      require.resolve('babel-plugin-transform-runtime'),
      {
        polyfill: false,
        regenerator: true,
      },
    ]);

    // config.plugins.push(new CSSSplitWebpackPlugin({ size: 2000 }));

    return config;
  },
};
