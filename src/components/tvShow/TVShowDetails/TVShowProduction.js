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

const TVShowProduction = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.only("xs"));
  const classes = useStyles();

  const tvShow = useSelector((state) => state.tvShows.tvShow);

  const {
    created_by: createdBy,
    networks,
    production_companies: productionCompanies,
    production_countries: productionCountries,
    spoken_languages: spokenLanguages,
    number_of_episodes: totalEpisodes,
    number_of_seasons: totalSeasons,
  } = tvShow;

  const hasCreatedBy = Boolean(createdBy && createdBy.length > 0);
  const hasNetworks = Boolean(networks && networks.length > 0);
  const hasProductionCompany = Boolean(
    productionCompanies && productionCompanies.length > 0
  );
  const hasProductionCountry = Boolean(
    productionCountries && productionCountries.length > 0
  );
  const hasSpokenLanguages = Boolean(
    spokenLanguages && spokenLanguages.length > 0
  );
  const hasTotalEpisodes = Boolean(totalEpisodes && totalEpisodes > 0);
  const hasTotalSeasons = Boolean(totalSeasons && totalSeasons > 0);

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
        {hasCreatedBy &&
          renderProduction(
            "Created by",
            createdBy.map((person) => {
              const { id, name, profile_path: profilePath } = person;

              return (
                <Grid item key={`tv-show-production-created-by-chip-${id}`}>
                  <ProductionChip image={profilePath} name={name} />
                </Grid>
              );
            })
          )}
        {hasNetworks &&
          renderProduction(
            "Network",
            networks.map((network) => {
              const {
                id,
                logo_path: logoPath,
                name,
                origin_country: originCountry,
              } = network;

              return (
                <Grid item key={`tv-show-production-network-chip-${id}`}>
                  <ProductionChip
                    country={originCountry}
                    image={logoPath}
                    name={name}
                  />
                </Grid>
              );
            })
          )}
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
        {hasTotalSeasons &&
          renderProduction(
            "Total Season Count",
            <Typography variant="body2">
              <span className={classes.name}>{totalSeasons}</span> season
              {totalSeasons > 1 ? "s" : ""}
            </Typography>
          )}
        {hasTotalEpisodes &&
          renderProduction(
            "Total Episode Count",
            <Typography variant="body2">
              <span className={classes.name}>{totalEpisodes}</span> episode
              {totalEpisodes > 1 ? "s" : ""}
            </Typography>
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

export default TVShowProduction;
