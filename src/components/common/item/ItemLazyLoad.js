import React, { cloneElement, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { CircularProgress, Grid } from "@material-ui/core";

import { MAX_ITEM_PER_LOAD } from "../../../constants";

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
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPage((previousPage) => previousPage + 1);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => observer.disconnect();
  }, [loaderRef]);

  const getProps = (content, index) => {
    switch (type) {
      case "tvShowEpisode":
        return {
          ...otherProps,
          key: `item-lazy-load-episode-${content.id}`,
          episode: content,
          isLastItem: index + 1 !== contents.length,
        };
      case "itemCardHorizontalList":
        return {
          ...otherProps,
          key: `item-lazy-load-item-card-horizontal-list-${content.id}`,
          content,
        };
      case "itemCast":
        return {
          ...otherProps,
          key: `item-lazy-load-item-cast-${content.id}`,
          character: content.character,
          image: content.profile_path,
          name: content.name,
        };
      case "itemCardSearchResults":
        return {
          ...otherProps,
          key: `item-search-results-item-card-${index + 1}-${content.id}`,
          content,
        };
      default:
        return {};
    }
  };

  return (
    <>
      {contents
        .slice(0, maxItemPerLoad * page)
        .map((content, index) => cloneElement(node, getProps(content, index)))}
      {!hideLoader && contents.length >= maxItemPerLoad * page && (
        <Grid container justify="center" className={classes.progressContainer}>
          <CircularProgress ref={loaderRef} />
        </Grid>
      )}
    </>
  );
};

ItemLazyLoad.defaultProps = {
  hideLoader: false,
  maxItemPerLoad: MAX_ITEM_PER_LOAD,
  otherProps: {
    isCollapsed: true,
  },
};

ItemLazyLoad.propTypes = {
  contents: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  hideLoader: PropTypes.bool,
  maxItemPerLoad: PropTypes.number,
  node: PropTypes.node.isRequired,
  otherProps: PropTypes.shape({
    isCollapsed: PropTypes.bool,
  }),
  type: PropTypes.string.isRequired,
};

export default ItemLazyLoad;
