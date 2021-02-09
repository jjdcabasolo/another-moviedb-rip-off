import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, useMediaQuery } from '@material-ui/core';

import ItemHorizontalContainer from '../../common/item/ItemHorizontalContainer';
import ItemLazyLoad from '../../common/item/ItemLazyLoad';
import ItemSeeMore from '../../common/item/ItemSeeMore';
import PersonAvatar from '../../common/item/detail/PersonAvatar';
import SeeMoreIconButton from '../../common/SeeMoreIconButton';

import { getCastCol, scrollToID } from '../../../utils/functions';

import { MAX_CAST_HORIZONTAL_ITEMS as maxCount } from '../../../constants';

const useStyles = makeStyles((theme) => ({
  container: {
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(2, 0),
    },
    position: 'relative',
    width: 'inherit',
  },
  horizontalScrollItemSpacing: {
    margin: theme.spacing(0, 1),
    [theme.breakpoints.only('xs')]: {
      margin: theme.spacing(0, 0.125),
    },
  },
}));

const MovieCast = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'));
  const isSmallTablet = useMediaQuery(theme.breakpoints.only('sm'));
  const isBigTablet = useMediaQuery(theme.breakpoints.only('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const classes = useStyles();

  const movie = useSelector((state) => state.movies.movie);

  const {
    cast,
    original_title: originalTitle,
    title,
  } = movie;

  const [cardCol, setCardCol] = useState(0);

  useEffect(() => {
    setCardCol(getCastCol(isMobile, isSmallTablet));
  }, [isMobile, isSmallTablet, isBigTablet, isDesktop]);

  return (
    <Grid container className={classes.container}>
      <ItemSeeMore
        appbarTitle={[title || originalTitle, 'Cast']}
        collapsedClickEvent={() => scrollToID('movie-cast')}
        collapsedContent={(
          <ItemHorizontalContainer
            isWithSeeMore={cast.length > maxCount}
            scrollAmount={144}
            seeMoreComponent={<SeeMoreIconButton />}
          >
            {cast.slice(0, maxCount).map((item) => (
              <div className={classes.horizontalScrollItemSpacing}>
                <PersonAvatar
                  character={item.character}
                  col={12}
                  image={item.profile_path}
                  name={item.name}
                  isHorizontalScroll
                />
              </div>
            ))}
          </ItemHorizontalContainer>
        )}
        expandedContent={(
          <Grid container spacing={2}>
            <ItemLazyLoad
              contents={cast}
              maxItemPerLoad={20}
              node={<PersonAvatar />}
              otherProps={{ col: 12 / cardCol }}
              type="itemCast"
            />
          </Grid>
        )}
        isButtonShown={cast.length > maxCount}
        sectionId="cast"
        seeMoreText={`Show all ${cast.length} cast`}
      />
    </Grid>
  );
};

export default MovieCast;
