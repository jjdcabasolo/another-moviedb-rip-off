import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { truncateText } from '../../utils/text';

const useStyles = makeStyles(theme => ({
  media: {
    height: 0,
    paddingTop: '30em',
    width: '20em',
  },
}));

const MovieCard = ({movie, imageURL}) => {
  console.log(movie, imageURL, `${imageURL}${movie.poster_path}`)
  const classes = useStyles();

  return (
    <Grid item xs={2}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={`${imageURL}${movie.poster_path}`}
            title={movie.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {movie.title}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default MovieCard;
