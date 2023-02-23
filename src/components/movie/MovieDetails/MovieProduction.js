import React from "react";

import { useSelector } from "react-redux";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid, useMediaQuery } from "@material-ui/core";
import Typography from "../../custom/base/Typography";

import ProductionChip from "../../common/item/detail/ProductionChip";

const useStyles = makeStyles((theme) => ({
  title: {
    width: "100%",
  },
  name: {
    fontWeight: 600,
  },
}));

const MovieProduction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const classes = useStyles();

  const movie = useSelector((state) => state.movies.movie);

  const {
    production_companies: productionCompanies,
    production_countries: productionCountries,
    spoken_languages: spokenLanguages,
  } = movie;

  const hasProductionCompany =
    productionCompanies && productionCompanies.length > 0;
  const hasProductionCountry =
    productionCountries && productionCountries.length > 0;
  const hasSpokenLanguages = spokenLanguages && spokenLanguages.length > 0;

  const renderProduction = (title, items, xs = isMobile ? 12 : 6) => (
    <Grid item xs={xs} container>
      <Typography
        variant="body2"
        gutterBottom
        className={classes.title}
        color="textSecondary"
      >
        {title}
      </Typography>
      {items}
    </Grid>
  );

  const renderProductionList = (primary, secondary, index, length) => {
    let punctuation = "";

    if (index === 0 && length === 1) {
      // only 1 entry
      punctuation = "";
    } else if (index === length - 2) {
      // entry before last #oxfordComma
      punctuation = ", and ";
    } else if (index < length - 1) {
      // mid entry
      punctuation = ", ";
    }

    return (
      <>
        <span className={classes.name}>{primary}</span> ({secondary})
        {punctuation}
      </>
    );
  };

  return (
    <Grid item container>
      <Grid
        alignItems="flex-start"
        container
        direction="row"
        item
        justify="flex-start"
        spacing={3}
        xs={12}
      >
        {hasProductionCompany &&
          renderProduction(
            "Companies",
            productionCompanies.map((company) => {
              const {
                id,
                logo_path: logoPath,
                name,
                origin_country: originCountry,
              } = company;

              return (
                <Grid
                  item
                  key={`tv-show-production-production-company-chip-${id}`}
                >
                  <ProductionChip
                    country={originCountry}
                    image={logoPath}
                    name={name}
                  />
                </Grid>
              );
            }),
            12
          )}
        {hasProductionCountry &&
          renderProduction(
            "Country",
            <Typography variant="body2">
              {productionCountries.map((e, i) =>
                renderProductionList(
                  e.name,
                  e.iso_3166_1,
                  i,
                  productionCountries.length
                )
              )}
            </Typography>
          )}
        {hasSpokenLanguages &&
          renderProduction(
            "Spoken Languages",
            <Typography variant="body2">
              {spokenLanguages.map((e, i) =>
                renderProductionList(
                  e.english_name,
                  e.iso_639_1,
                  i,
                  spokenLanguages.length
                )
              )}
            </Typography>
          )}
      </Grid>
    </Grid>
  );
};

export default MovieProduction;
