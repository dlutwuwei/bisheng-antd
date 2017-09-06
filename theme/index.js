const path = require('path');

const homeTmpl = './template/Home/index';
const contentTmpl = './template/Content/index';
const topbuzzTmpl = './template/Topbuzz/index';

function pickerGenerator(module) {
  const tester = new RegExp(`^docs/${module}`);
  return (markdownData) => {
    const filename = markdownData.meta.filename;
    if (tester.test(filename) &&
        !/\/demo$/.test(path.dirname(filename))) {
      return {
        meta: markdownData.meta,
      };
    }
  };
}

module.exports = {
  lazyLoad(nodePath, nodeValue) {
    if (typeof nodeValue === 'string') {
      return true;
    }
    return nodePath.endsWith('/demo');
  },
  // 将文件分类到不同对象中，components, changlog，docs和其他
  pick: {
    components(markdownData) {
      const filename = markdownData.meta.filename;
      // 必须在components文件夹内，且不能已demo结尾
      if (!/^components/.test(filename) ||
          /[/\\]demo$/.test(path.dirname(filename))) return;

      return {
        meta: markdownData.meta,
      };
    },
    changelog(markdownData) {
      if (/CHANGELOG/.test(markdownData.meta.filename)) {
        return {
          meta: markdownData.meta,
        };
      }
    },
    topbuzz(markdownData) {
      if (/topbuzz/.test(markdownData.meta.filename)) {
        console.log(markdownData.meta)
        return {
          meta: markdownData.meta
        }
      }
    },
    'docs/pattern': pickerGenerator('pattern'),
    'docs/react': pickerGenerator('react'),
    'docs/resource': pickerGenerator('resource'),
    'docs/spec': pickerGenerator('spec'),
  },
  plugins: [
    'bisheng-plugin-description',
    'bisheng-plugin-toc?maxDepth=2&keepElem',
    // 'bisheng-plugin-antd',
    'bisheng-plugin-react?lang=__react',
  ],
  routes: {
    path: '/',
    component: './template/Layout/index',
    indexRoute: { component: homeTmpl },
    childRoutes: [{
      path: 'index-cn',
      component: homeTmpl,
    }, {
      path: 'docs/pattern/:children',
      component: contentTmpl,
    }, {
      path: 'docs/react/:children',
      component: contentTmpl,
    }, {
      path: 'changelog',
      component: contentTmpl,
    }, {
      path: 'changelog-cn',
      component: contentTmpl,
    }, {
      path: 'components/:children/',
      component: contentTmpl,
    }, {
      path: 'docs/spec/:children',
      component: contentTmpl,
    }, {
      path: 'docs/resource/:children',
      component: contentTmpl,
    }, {
      path: 'topbuzz/rss',
      component: topbuzzTmpl,
    }],
  },
};
