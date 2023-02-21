import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Link } from "@material-ui/core";
import Typography from "../../custom/base/Typography";
import NewTabIcon from "../../../assets/icons/new-tab";

import { enumerate } from "../../../utils/functions";
import { TMDB_LINK, TMDB_SIGN_UP } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  footer: {
    [theme.breakpoints.only("xs")]: {
      marginTop: theme.spacing(2),
    },
  },
  icon: {
    "& svg": {
      height: theme.spacing(2),
      width: theme.spacing(2),
      marginBottom: -3,
    },
    "& svg *[fill]": {
      fill: theme.palette.colorScheme.svgStrokeFill,
    },
    "& svg *[stroke]": {
      stroke: theme.palette.colorScheme.svgStrokeFill,
    },
  },
  link: {
    color: theme.palette.colorScheme.secondaryText,
    fontWeight: 500,
    textDecoration: "underline",
  },
  notice: {
    fontWeight: 200,
  },
}));

const ItemFooter = ({ companies, link, title, year }) => {
  const classes = useStyles();

  const renderLinkOpenNewTab = (content, href) => (
    <Link href={href} rel="noopener" target="_blank" className={classes.link}>
      {content}
      <span className={classes.icon}>
        <NewTabIcon />
      </span>
    </Link>
  );

  return (
    <Grid container spacing={3} className={classes.footer}>
      <Grid item xs={12}>
        <Typography variant="body2" gutterBottom>
          {`${title} ${year.length > 0 ? `(${year})` : ""}${
            companies.length > 0 ? ` © ${enumerate(companies)}` : ""
          }.`}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.notice}
        >
          Noticed something wrong? Visit&nbsp;
          {renderLinkOpenNewTab(`${title}'s TMDb page`, link)}
          &nbsp;to contribute!
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.notice}
        >
          But first, you must&nbsp;
          {renderLinkOpenNewTab("create a TMDb account", TMDB_SIGN_UP)}.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography
          variant="body2"
          color="textSecondary"
          className={classes.notice}
        >
          All contents came from the community-built movie and TV
          database,&nbsp;
          {renderLinkOpenNewTab("The Movie Database (TMDb)", TMDB_LINK)}.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <br />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">
          © 2019-2023 All Rights Reserved.
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body2" color="textSecondary">
          Made with y540 and TMDb by jjdcabasolo
        </Typography>
      </Grid>
    </Grid>
  );
};

ItemFooter.propTypes = {
  companies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};

export default ItemFooter;
