require('@babel/register')({
	extends: './.babelrc',
})

import Sitemap from 'react-router-sitemap';
import routes from './routes';

function generateSitemap() {
  return (
    new Sitemap(routes)
      .build("http://jjdcabasolo.github.io/another-moviedb-rip-off/#")
      .save("./public/sitemap.xml")
  );
}

generateSitemap();
