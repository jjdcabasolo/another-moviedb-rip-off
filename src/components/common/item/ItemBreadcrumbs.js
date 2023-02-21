import React from "react";
import PropTypes from "prop-types";

import { HashLink } from "react-router-hash-link";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link } from "@material-ui/core";
import Breadcrumbs from "../../custom/base/Breadcrumbs";
import Typography from "../../custom/base/Typography";

const useStyles = makeStyles((theme) => ({
  divider: {
    color: theme.palette.colorScheme.divider,
  },
}));

const ItemBreadcrumbs = ({ content }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Breadcrumbs
          separator={
            <Typography variant="body2" className={classes.divider}>
              {" "}
              |{" "}
            </Typography>
          }
          aria-label="breadcrumb"
        >
          {content.map((e) => (
            <Link
              component={HashLink}
              smooth
              to={e.link}
              color="inherit"
              key={`item-breadcrumbs-link-${e.label}`}
            >
              <Typography variant="body2">{e.label}</Typography>
            </Link>
          ))}
        </Breadcrumbs>
      </Grid>
    </Grid>
  );
};

ItemBreadcrumbs.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ItemBreadcrumbs;
