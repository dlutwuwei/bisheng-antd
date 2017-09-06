import React, { cloneElement } from 'react';
import ReactDOM from 'react-dom';
import collect from 'bisheng/collect';

function Topbuzz(props) {
  debugger
  return (
    <div className="main-wrapper">
      <div className="main">
        {props.utils.toReactComponent(['section', { className: 'markdown' }].concat(props.data.content.slice(1)))}
      </div>
    </div>
  )
}

export default collect(async (nextProps) => {
  const pageDataPromise = nextProps.pageData();
  return { data: await pageDataPromise };
})(Topbuzz);