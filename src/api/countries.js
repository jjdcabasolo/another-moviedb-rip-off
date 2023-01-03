/* eslint-disable camelcase */
import axios from "./config";

export const getCountries = (api_key, success, fail, after = () => {}) =>
  axios
    .get("/configuration/countries", { params: { api_key } })
    .then((response) => success(response))
    .catch((error) => fail(error))
    .finally(() => after());
