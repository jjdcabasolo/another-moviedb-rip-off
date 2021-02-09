import React, {
  cloneElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, Grid } from '@material-ui/core';

const MAX_ITEM_PER_LOAD = 10;

const useStyles = makeStyles((theme) => ({
  progressContainer: {
    padding: theme.spacing(2, 0, 6, 0),
  },
}));

const ItemLazyLoad = ({
  contents,
  hideLoader = false,
  maxItemPerLoad = MAX_ITEM_PER_LOAD,
  node,
  otherProps,
  type,
}) => {
  const classes = useStyles();

  const [page, setPage] = useState(1);

  const loaderRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setPage((previousPage) => previousPage + 1);
      }
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef]);

  const getProps = (content, index) => {
    switch (type) {
      case 'tvShowEpisode':
        return {
          ...otherProps,
          episode: content,
          isLastItem: index + 1 !== contents.length,
        };
      case 'itemCardHorizontalList':
        return {
          ...otherProps,
          content,
          rank: index + 1,
        };
      case 'itemCast':
        return {
          ...otherProps,
          character: content.character,
          image: content.profile_path,
          name: content.name,
        };
      default:
        return {};
    }
  };

  return (
    <>
      {contents.slice(0, maxItemPerLoad * page).map((content, index) => cloneElement(node, getProps(content, index)))}
      {!hideLoader && (contents.length >= maxItemPerLoad * page) && (
        <Grid container justify="center" className={classes.progressContainer}>
          <CircularProgress ref={loaderRef} />
        </Grid>
      )}
    </>
  );
};

ItemLazyLoad.propTypes = {
  contents: PropTypes.arrayOf({
    // label: PropTypes.string.isRequired,
  }).isRequired,
  hideLoader: PropTypes.bool.isRequired,
  maxItemPerLoad: PropTypes.number.isRequired,
  node: PropTypes.node.isRequired,
  otherProps: PropTypes.shape({
    isCollapsed: PropTypes.bool.isRequired,
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default ItemLazyLoad;
