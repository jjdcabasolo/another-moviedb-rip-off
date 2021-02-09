import React from 'react';
import PropTypes from 'prop-types';

import { HashLink } from 'react-router-hash-link';

import {
  Breadcrumbs,
  Grid,
  Link,
} from '@material-ui/core';

const ItemBreadcrumbs = ({ content }) => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Breadcrumbs separator=" | " aria-label="breadcrumb">
        {content.map((e) => (
          <Link component={HashLink} smooth to={e.link} color="inherit">
            {e.label}
          </Link>
        ))}
      </Breadcrumbs>
    </Grid>
  </Grid>
);

ItemBreadcrumbs.propTypes = {
  content: PropTypes.arrayOf({
    label: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemBreadcrumbs;
