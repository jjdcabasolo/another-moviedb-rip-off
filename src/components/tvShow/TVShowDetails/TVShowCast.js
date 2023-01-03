import React, { useState, useEffect } from "react";

import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, useMediaQuery } from "@material-ui/core";

import ItemHorizontalContainer from "../../common/item/ItemHorizontalContainer";
import ItemLazyLoad from "../../common/item/ItemLazyLoad";
import ItemSeeMore from "../../common/item/ItemSeeMore";
import PersonAvatar from "../../common/item/detail/PersonAvatar";

import { getCastCol, scrollToID } from "../../../utils/functions";

import { MAX_CAST_HORIZONTAL_ITEMS as maxCount } from "../../../constants";

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.only("xs")]: {
      margin: theme.spacing(2, 0),
    },
    position: "relative",
    width: "inherit",
  },
  horizontalScrollItemSpacing: {
    margin: theme.spacing(0, 1),
  },
  lastEntry: {
    padding: theme.spacing(1.5),
  },
}));

const SECTION_ID = "cast";

const TVShowCast = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const isSmallTablet = useMediaQuery(theme.breakpoints.only("sm"));
  const isBigTablet = useMediaQuery(theme.breakpoints.only("md"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const history = useHistory();

  const [cardCol, setCardCol] = useState(0);

  const { cast, name, original_name: originalName } = tvShow;

  useEffect(() => {
    setCardCol(getCastCol(isMobile, isSmallTablet));
  }, [isMobile, isSmallTablet, isBigTablet, isDesktop]);

  const handleSeeMore = () => {
    history.push(`${history.location.pathname}/${SECTION_ID}`);
  };

  return (
    <Grid container className={classes.container}>
      <ItemSeeMore
        appbarTitle={[name || originalName, "Cast"]}
        collapsedClickEvent={() => scrollToID("tvshow-cast")}
        collapsedContent={
          <ItemHorizontalContainer
            handleSeeMore={handleSeeMore}
            isWithSeeMore={cast.length > maxCount}
            scrollAmount={144}
          >
            {cast.slice(0, maxCount).map((item) => (
              <div
                className={classes.horizontalScrollItemSpacing}
                key={`tv-show-cast-person-avatar-${item.id}`}
              >
                <PersonAvatar
                  character={item.character}
                  col={12}
                  image={item.profile_path}
                  name={item.name}
                  isHorizontalScroll
                />
              </div>
            ))}
            {cast.length <= maxCount && isMobile && (
              <div className={classes.lastEntry} />
            )}
          </ItemHorizontalContainer>
        }
        expandedContent={
          <Grid container spacing={2}>
            <ItemLazyLoad
              contents={cast}
              maxItemPerLoad={20}
              node={<PersonAvatar />}
              otherProps={{ col: 12 / cardCol }}
              type="itemCast"
            />
          </Grid>
        }
        isButtonShown={cast.length > maxCount}
        sectionId={SECTION_ID}
        seeMoreText={`Show all ${cast.length} cast`}
      />
    </Grid>
  );
};

export default TVShowCast;
