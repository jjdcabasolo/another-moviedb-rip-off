import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import clsx from "clsx";
import { useHistory } from "react-router-dom";
import { usePath } from "../../../hooks";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Toolbar,
  useMediaQuery,
} from "@material-ui/core";
import AppBar from "../../custom/base/AppBar";
import Button from "../../custom/base/Button";
import IconButton from "../../custom/composed/IconButton";
import Typography from "../../custom/base/Typography";
import BackIcon from "../../../assets/icons/back";
import SearchIcon from "../../../assets/icons/search";
import CloseIcon from "../../../assets/icons/close";

import AppbarMenu from "../../navigation/appbar/AppbarMenu";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.colorScheme.background,
  },
  button: {
    marginTop: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(5),
    padding: theme.spacing(3, 2),
  },
  contentContainer: {
    position: "relative",
  },
  iconButton: {
    position: "absolute",
    right: theme.spacing(4),
    top: theme.spacing(1),
  },
  dialogTitle: {
    "& h2": {
      width: `calc(100% - ${theme.spacing(6)}px)`,
    },
  },
  episodeDialog: {
    padding: theme.spacing(4, 10),
  },
  appbarTitle: {
    fontWeight: 300,
  },
  titlebar: {
    flexGrow: 1,
    margin: theme.spacing(0, 2),
    color: theme.palette.text.primary,
    lineHeight: 1,
  },
  titleSection: {
    lineHeight: 1,
  },
  toolbar: {
    padding: theme.spacing(1, 2),
  },
}));

const ItemSeeMore = ({
  appbarTitle,
  collapsedClickEvent,
  collapsedContent = () => {},
  expandedContent,
  isButtonShown = true,
  isEpisode,
  maxWidth = "md",
  sectionId,
  seeLessText = "Show less",
  seeMoreText = "Show all",
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const classes = useStyles();

  const history = useHistory();
  const [activeTab, id, section] = usePath();

  const [seeMore, setSeeMore] = useState(sectionId === section);

  useEffect(() => {
    if (id !== "search") {
      setSeeMore(sectionId === section);
    }
  }, [sectionId, section, id]);

  const handleButtonClick = () => {
    if (seeMore) history.goBack();
    else history.push(`${history.location.pathname}/${sectionId}`);

    setSeeMore(!seeMore);
  };

  const handleClose = () => {
    collapsedClickEvent();
    setSeeMore(!seeMore);
    history.goBack();
  };

  const handleSearch = () => {
    history.push(`/${activeTab}/search`);
  };

  const renderContent = () => {
    const [title, titleSection] = appbarTitle;

    if (isMobile) {
      return (
        <Dialog
          classes={{ paper: classes.paper }}
          fullScreen
          onClose={handleClose}
          open={seeMore}
        >
          <DialogTitle
            id={`item-see-more-${title}`}
            className={classes.dialogTitle}
          >
            <AppBar>
              <Toolbar className={classes.toolbar}>
                <IconButton
                  svgSrc={<BackIcon />}
                  handleOnClick={handleClose}
                  tooltipTitle="Go back"
                />
                <Typography noWrap className={classes.titlebar}>
                  <Typography noWrap>{titleSection}</Typography>
                  <Typography
                    variant="caption"
                    noWrap
                    className={classes.titleSection}
                  >
                    {title}
                  </Typography>
                </Typography>
                <IconButton
                  svgSrc={<SearchIcon />}
                  handleOnClick={handleSearch}
                  tooltipTitle="Search"
                />
                {isMobile && <AppbarMenu />}
              </Toolbar>
            </AppBar>
          </DialogTitle>
          <DialogContent className={classes.content}>
            {expandedContent}
          </DialogContent>
        </Dialog>
      );
    }

    return (
      <Dialog
        classes={{ paper: classes.paper }}
        maxWidth={maxWidth}
        onClose={handleClose}
        open={seeMore}
      >
        <DialogTitle
          id={`item-see-more-${title}`}
          onClose={handleClose}
          className={classes.dialogTitle}
        >
          <span className={classes.appbarTitle}>{`${title} `}</span>
          {titleSection}
          <div className={classes.iconButton}>
            <IconButton
              svgSrc={<CloseIcon />}
              handleOnClick={handleClose}
              tooltipTitle="Close"
            />
          </div>
        </DialogTitle>
        <DialogContent
          className={clsx({ [classes.episodeDialog]: isEpisode })}
          dividers
        >
          {expandedContent}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Grid container>
      <Grid container item xs={12} className={classes.contentContainer}>
        {renderContent()}
        {collapsedContent}
      </Grid>
      {isButtonShown && (
        <Grid
          className={classes.button}
          container
          item
          justify="center"
          xs={12}
        >
          <Button
            fullWidth={isMobile}
            onClick={handleButtonClick}
            size={isMobile ? "small" : "medium"}
            variant="outlined"
          >
            {seeMore ? seeLessText : seeMoreText}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

ItemSeeMore.defaultProps = {
  isButtonShown: true,
  isEpisode: false,
  maxWidth: "md",
  seeLessText: "Show less",
  seeMoreText: "Show all",
};

ItemSeeMore.propTypes = {
  appbarTitle: PropTypes.arrayOf(PropTypes.string).isRequired,
  collapsedClickEvent: PropTypes.func.isRequired,
  collapsedContent: PropTypes.node.isRequired,
  expandedContent: PropTypes.node.isRequired,
  isButtonShown: PropTypes.bool,
  isEpisode: PropTypes.bool,
  maxWidth: PropTypes.string,
  sectionId: PropTypes.string.isRequired,
  seeLessText: PropTypes.string,
  seeMoreText: PropTypes.string,
};

export default ItemSeeMore;
