/* @flow */

import { Router } from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';

import serialize from 'serialize-javascript';

import createServerSideThunk from 'src/client/store/ServerSideThunk';
import createStore from 'src/client/store';
import hbsTemplate from './index.hbs';
import routes from 'src/client/routes.jsx';

const router = Router();

const HOTJAR = `
<script>
(function(h,o,t,j,a,r){h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};h._hjSettings={hjid:311663,hjsv:5};a=o.getElementsByTagName('head')[0];r=o.createElement('script');r.async=1;r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;a.appendChild(r);})(window,document,'//static.hotjar.com/c/hotjar-','.js?sv=');
</script>`.replace(/(\r\n|\n|\r|\t)/gm,'');

const GOOGLE_ANALYTICS = `
<script>
(function(i,s,o,g,r,a,m){i["GoogleAnalyticsObject"]=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,"script","https://www.google-analytics.com/analytics.js","ga");ga("create", "UA-85825703-1", "auto");
</script>`.replace(/(\r\n|\n|\r|\t)/gm,'');

function getCSS(file: string) {
  return `/assets/${file}`;
}

router.get('*', (req, res) => {

    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

      if (error) {
        return res.status(500).send(error.message);
      } else if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const promises = [];
        const store = createStore({
          // can be prefilled with data
        });

        const htmlCode = hbsTemplate({
          react: '',
          title: 'Super title',
          state: serialize(state, { isJSON: true })
        });

        return res.status(200).send(htmlCode);
      }

      /* 404 */
      return res.status(404).send('404');
    });
  });
});

function ssRendering() {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {

    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const promises = [];
      const store = createStore({
        // can be prefilled with data
      });

      const htmlCode = hbsTemplate({
        react: '',
        title: 'Super title',
        state: serialize(state, { isJSON: true })
      });

      return res.status(200).send(htmlCode);
    }

    /* 404 */
    return res.status(404).send('404');
  });
}


export default router;
