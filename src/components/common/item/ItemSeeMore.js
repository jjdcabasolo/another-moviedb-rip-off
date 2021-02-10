import React, {
  cloneElement,
  forwardRef,
  useEffect,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';
import { useHistory, useParams } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Slide,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import { ArrowBack, Close } from '@material-ui/icons';

import AppBar from '../../overrides/AppBar';

import { truncateText } from '../../../utils/functions';

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  button: {
    marginTop: theme.spacing(2),
  },
  content: {
    marginTop: theme.spacing(7),
    padding: theme.spacing(3, 2),
    height: '100%',
  },
  contentContainer: {
    position: 'relative',
  },
  iconButton: {
    position: 'absolute',
    right: theme.spacing(4),
    top: theme.spacing(1),
  },
  dialogTitle: {
    '& h2': {
      width: `calc(100% - ${theme.spacing(6)}px)`,
    },
  },
  episodeDialog: {
    maxWidth: theme.spacing(65),
  },
  appbarTitle: {
    fontWeight: 300,
  },
}));

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ItemSeeMore = ({
  appbarTitle,
  collapsedClickEvent,
  collapsedContent = () => {},
  expandedContent,
  isButtonShown = true,
  isEpisode,
  maxWidth = 'md',
  sectionId,
  seeLessText = 'Show less',
  seeMoreText = 'Show all',
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const classes = useStyles();

  const history = useHistory();
  const { section } = useParams();

  const [seeMore, setSeeMore] = useState(sectionId === section);

  useEffect(() => setSeeMore(sectionId === section), [sectionId, section]);

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

  const renderContent = () => {
    const [title, titleSection] = appbarTitle;

    if (isMobile) {
      return (
        <Dialog
          TransitionComponent={Transition}
          classes={{ paper: classes.paper }}
          fullScreen
          onClose={handleClose}
          open={seeMore}
        >
          <AppBar color="default" className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" onClick={handleClose} aria-label="close">
                <ArrowBack />
              </IconButton>
              <Typography variant="h6" className={classes.title} noWrap>
                <span className={classes.appbarTitle}>
                  {`${truncateText(title, 18, 'characters')} `}
                </span>
                {titleSection}
              </Typography>
            </Toolbar>
          </AppBar>
          <div className={classes.content}>
            {expandedContent}
          </div>
        </Dialog>
      );
    }

    return (
      <Dialog
        classes={{ paper: clsx(classes.paper, { [classes.episodeDialog]: isEpisode }) }}
        maxWidth={maxWidth}
        onClose={handleClose}
        open={seeMore}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose} className={classes.dialogTitle}>
          <span className={classes.appbarTitle}>{`${title} `}</span>
          {titleSection}
          <IconButton onClick={handleClose} edge="end" className={classes.iconButton}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {expandedContent}
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="default">
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
        {cloneElement(collapsedContent, {
          handleSeeMore: () => {
            handleButtonClick();
          },
        })}
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
            size={isMobile ? 'small' : 'medium'}
            variant="outlined"
          >
            {seeMore ? seeLessText : seeMoreText}
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

ItemSeeMore.propTypes = {
  appbarTitle: PropTypes.arrayOf(PropTypes.string).isRequired,
  collapsedClickEvent: PropTypes.func.isRequired,
  collapsedContent: PropTypes.node.isRequired,
  expandedContent: PropTypes.node.isRequired,
  isButtonShown: PropTypes.bool.isRequired,
  isEpisode: PropTypes.bool.isRequired,
  maxWidth: PropTypes.string.isRequired,
  sectionId: PropTypes.string.isRequired,
  seeLessText: PropTypes.string.isRequired,
  seeMoreText: PropTypes.string.isRequired,
};

export default ItemSeeMore;
