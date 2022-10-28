const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

const getRTandT = async () => {
  return axios.get("https://api.weather.com/v2/tiler/info?products=500:Precipitationanomalysurface1Month2&meta=true", {
    params: {
      apiKey: process.env.API_KEY,
    },
  });
};

const getPrecipitation = async (rt, t) => {
  return axios.get("https://api.weather.com/v2/tiler/point?products=500:Precipitationanomalysurface1Month2&lon=-74.0&lat=40.7&method=nearest&format=geojson", {
    params: {
      apiKey: process.env.API_KEY,
      rt: rt,
      t: t,
    },
  });
};

const getNormal = async (t) => {
  return axios.get("https://api.weather.com/v2/tiler/point?products=503:monthlyTotalPrecipitation&lon=-74.0&lat=40.7&method=nearest&format=geojson", {
    params: {
      apiKey: process.env.API_KEY,
      t: t,
    },
  });
};

const getTemperature = async (t) => {
  return axios.get("https://api.weather.com/v2/tiler/point?products=503:dailyAvgTemperature&lon=-74.0&lat=40.7&method=nearest&format=geojson", {
    params: {
      apiKey: process.env.API_KEY,
      t: t,
    },
  });
};

const getIBMToken = async () => {
  var data = qs.stringify({
    grant_type: "urn:ibm:params:oauth:grant-type:apikey",
    apikey: "GG-Ioxkxn8LBzPBtlAFt_mQjNZqkzWEBIdOLYJihq90Z",
  });
  var config = {
    method: "post",
    url: "https://iam.cloud.ibm.com/identity/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie:
        "ak_bmsc=EE1D7025A916B4B2ECA710F3C66BFC83~000000000000000000000000000000~YAAQJw/QF725aeeDAQAAD80EHBHVXHRh+HWyEMWMnm3fdH+PYihHH0B9uPGP6IroBpKkA5bXr1Tcb104IPTDl+beKxOPHRp/0qR0nJ4NzlrPW3M2yF/89/4SbrZiYzT5zTNVuucc10zBdY/tqewIn319pwmKEY0KneH/ZDn60/npDeGm3EEQblZ5t7D7s5ibq7fKEebqMOD1/BV0IpoxIy50FvD6DYPHbSrfwSMTzNxWXwDnqevpIjTVUs9khIYi6NXUFNbaRQ92dhNy7CmWs1Afw6GCEd4xSuXnq5mD2HOLVJtiJ6Qrb2zACTYvKUvnKzWTxfYt49VOFu5dGcRhAA1qftVsDEQCVwtpNZ56aAvsm41mI8z78+MU2YFISQ==; bm_sv=D37DBDE50CA2BED178D2940FA57AC14C~YAAQJw/QF0AibeeDAQAAlI02HBFdby3jsJ2q1d8IMMlp4qvTrwG33WiSguFxgL+m85qPhga4gUPO0SREGe5+XWZsaOYe2Nrt8JNSFXiTVKXyxva+TCbv62u4ehoUHnnxgI2n2MyknmeQDnyo0PywEHJZ7yKIabv3GM6HczafKO5FAoKl5UKP/+VkwOAZ/pbSrswj4X1rcu3cZzJSdGWkCQ6fNz6SN8zwx+1fudSEOyyiBMlbX01wmDZBZuey6JDE0mlu~1",
    },
    data: data,
  };
  return axios(config).catch((error) => {
    console.log(error.toJSON());
  });
  // .then((res) => {
  //   console.log(res);
  // });
};

const getYeild = (access_token, modelValues, deploymentId) => {
  var data = JSON.stringify({
    input_data: [
      {
        fields: [
          "May Temperature",
          "May Precipitation",
          "June Temperature",
          "June Precipitation",
          "July Temperature",
          "July Precipitation",
          "August Temperature",
          "August Precipitation",
          "September Temperature",
          "September Precipitation",
          "Soil Type",
        ],
        values: [modelValues],
      },
    ],
  });

  var config = {
    method: "post",
    url: "https://us-south.ml.cloud.ibm.com/ml/v4/deployments/" + deploymentId + "/predictions?version=2022-10-27",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: "Bearer " + access_token,
      Cookie:
        "ak_bmsc=EE1D7025A916B4B2ECA710F3C66BFC83~000000000000000000000000000000~YAAQJw/QF725aeeDAQAAD80EHBHVXHRh+HWyEMWMnm3fdH+PYihHH0B9uPGP6IroBpKkA5bXr1Tcb104IPTDl+beKxOPHRp/0qR0nJ4NzlrPW3M2yF/89/4SbrZiYzT5zTNVuucc10zBdY/tqewIn319pwmKEY0KneH/ZDn60/npDeGm3EEQblZ5t7D7s5ibq7fKEebqMOD1/BV0IpoxIy50FvD6DYPHbSrfwSMTzNxWXwDnqevpIjTVUs9khIYi6NXUFNbaRQ92dhNy7CmWs1Afw6GCEd4xSuXnq5mD2HOLVJtiJ6Qrb2zACTYvKUvnKzWTxfYt49VOFu5dGcRhAA1qftVsDEQCVwtpNZ56aAvsm41mI8z78+MU2YFISQ==",
    },
    data: data,
  };

  return axios(config).catch((error) => {
    console.log(error.toJSON());
  });
};

const getSoilType = (lon, lat) => {
  return axios.get("https://rest.isric.org/soilgrids/v2.0/classification/query?number_classes=1", {
    params: {
      lon: lon,
      lat: lat,
    },
  });
};

module.exports = { getRTandT, getPrecipitation, getNormal, getTemperature, getIBMToken, getYeild, getSoilType };
