const axios = require("axios");
const qs = require("qs");
require("dotenv").config();

const getTimestampsForNormals = async (zeroIdxMonthFromInc, zeroIdxMonthToExc) => {
  const response = await axios.get("https://api.weather.com/v2/tiler/info?products=503:dailyAvgTemperature,503:monthlyTotalPrecipitation", {
    params: {
      apiKey: process.env.API_KEY,
    }
  });
  // timestamps for avg temp and total precipitation are the same for the normals, so let's just take avg temp
  /**
   * 
   * Response example: 
   * {
        "layers": {
          "503": {
            "dailyAvgTemperature": {
              "dimensions": [
                {
                  "t": [
                    "1606780800000"
                  ]
                },
                ...
              ]
            },
            ...
          }
        }
      }
    */
  let timestampsForNormals = [];
  let dimensions = response["data"]["layers"]["503"]["dailyAvgTemperature"]["dimensions"];
  // the timestamp list returned is December, November, October, etc... so let's reverse the list
  dimensions.reverse();
  for(const dimension of dimensions) {
    const timestampDate = new Date(+dimension["t"][0])
    const utcMonthIdx = timestampDate.getUTCMonth();
    if(utcMonthIdx >= zeroIdxMonthFromInc && utcMonthIdx < zeroIdxMonthToExc) {
      timestampsForNormals.push(dimension["t"][0]);
    }
  }
  return timestampsForNormals;
}

const getWeatherNormals = async (timestamp, latitude, longitude) => {
  const response = await axios.get("https://api.weather.com/v2/tiler/point?products=503:dailyAvgTemperature,503:monthlyTotalPrecipitation&method=nearest&format=geojson", {
    params: {
      apiKey: process.env.API_KEY,
      t: timestamp,
      lat: latitude,
      lon: longitude
    },
  });
  /**
   * Response example: 
   * {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                ...
                "properties": {
                    "product": "503",
                    ...
                    "variable": "dailyAvgTemperature",
                    "z": -1,
                    "value": 17.51932144165039
                }
            },
            {
                "type": "Feature",
                ...
                "properties": {
                    "product": "503",
                    ...
                    "variable": "monthlyTotalPrecipitation",
                    "z": -1,
                    "value": 99.19441223144531
                }
            }
        ]
      }
   */
  let dailyAvgTemperature;
  let monthlyTotalPrecipitation;
  let features = response["data"]["features"];
  // check if the dailyAvgTemperature is in the first object, otherwise assume it is in the second object
  if(features[0]["properties"]["variable"] === "dailyAvgTemperature") {
    dailyAvgTemperature = features[0]["properties"]["value"];
    monthlyTotalPrecipitation = features[1]["properties"]["value"];
  } else {
    dailyAvgTemperature = features[1]["properties"]["value"];
    monthlyTotalPrecipitation = features[0]["properties"]["value"];
  }

  return {
    dailyAvgTemperature,
    monthlyTotalPrecipitation
  };
};

const getTimestampsForForecasting = async (yearFrom, zeroIdxMonthFromInc, yearTo, zeroIdxMonthToExc) => {
  const response = await axios.get("https://api.weather.com/v2/tiler/info?products=500:Temperatureanomalyheightaboveground1Month2,500:Precipitationanomalysurface1Month2", {
    params: {
      apiKey: process.env.API_KEY,
    }
  });
  /**
   * 
   * Response example: 
   * {
        "layers": {
          "500": {
            "Temperatureanomalyheightaboveground1Month2": {
              "dimensions": [
                {
                  "rt": [
                      "1666915200000"
                  ],
                  "t": [
                    "1685232000000",
                    ...
                  ]
                },
                ...
              ]
            },
            "Precipitationanomalysurface1Month2": {
              "dimensions": [
                {
                  "rt": [
                    "1666915200000"
                  ],
                  "t": [
                    "1685232000000",
                    ...
                  ]
                }
              ]
            }
          }
        }
      }
    */
  let timestampsForForecasting = [];
  // we need to check if we have the correct timestamps required
  // timestamps for are the same for both temperature and precipitation, let's just go with temperature
  const dimensions = response["data"]["layers"]["500"]["Temperatureanomalyheightaboveground1Month2"]["dimensions"];
  // let's take the first dimensions which contains the latest forecast, we get 7 months of forecasting
  const dimension = dimensions[0];
  const fromTimestamp = Date.UTC(yearFrom, zeroIdxMonthFromInc);
  const toTimestamp = Date.UTC(yearTo, zeroIdxMonthToExc, 0);
  // the latest timestamp that we have for forecast is the first timestamp
  const latestTimestampAvailableForForecast = +dimension["t"][0];
  if(latestTimestampAvailableForForecast >= toTimestamp) {
    let timestampList = dimension["t"];
    // the timestamp list returned in descending, so let's reverse the list
    timestampList.reverse();
    // validate timestamp is between "from" and "to"
    for(const timestampStr of timestampList) {
      const forecastTimestamp = +timestampStr;
      if(forecastTimestamp >= fromTimestamp && forecastTimestamp <= toTimestamp) {
        timestampsForForecasting.push(timestampStr);
      }
    }
  } else {
    // return empty if we do not have the required timestamp for forecasting
    return {};
  }

  return {
    rt: dimension["rt"][0],
    timestampsForForecasting
  }
};

const getWeatherForecastingDepartures = async (rtimestamp, timestamp, latitude, longitude) => {
  const response = await axios.get("https://api.weather.com/v2/tiler/point?products=500:Temperatureanomalyheightaboveground1Month2,500:Precipitationanomalysurface1Month2&method=nearest&format=geojson", {
    params: {
      apiKey: process.env.API_KEY,
      rt: rtimestamp,
      t: timestamp,
      lat: latitude,
      lon: longitude
    },
  });
  /**
   * Response example: 
   * {
        "type": "FeatureCollection",
        "features": [
            {
                "type": "Feature",
                ...
                "properties": {
                    "product": "500",
                    ...
                    "variable": "Temperatureanomalyheightaboveground1Month2",
                    "z": -1,
                    "value": 0.30000007152557373
                }
            },
            {
                "type": "Feature",
                ...
                "properties": {
                    "product": "500",
                    ...
                    "variable": "Precipitationanomalysurface1Month2",
                    "z": -1,
                    "value": 4.099998474121094
                }
            }
        ]
      }
   */
  let dailyAvgTemperatureDeparture;
  let monthlyTotalPrecipitationDeparture;
  let features = response["data"]["features"];
  // check if the dailyAvgTemperature is in the first object, otherwise assume it is in the second object
  if(features[0]["properties"]["variable"] === "Temperatureanomalyheightaboveground1Month2") {
    dailyAvgTemperatureDeparture = features[0]["properties"]["value"];
    monthlyTotalPrecipitationDeparture = features[1]["properties"]["value"];
  } else {
    dailyAvgTemperatureDeparture = features[1]["properties"]["value"];
    monthlyTotalPrecipitationDeparture = features[0]["properties"]["value"];
  }

  return {
    dailyAvgTemperatureDeparture,
    monthlyTotalPrecipitationDeparture
  };
};

const getWeatherHistoricals = async (yearFrom, zeroIdxMonthFromInc, yearTo, zeroIdxMonthToExc, latitude, longitude) => {
  let weatherHistoricals = [];

  let endDate = new Date(yearTo, zeroIdxMonthToExc, 1);
  let dateFrom = new Date(yearFrom, zeroIdxMonthFromInc, 1);
  let dateTo = new Date(yearFrom, zeroIdxMonthFromInc + 1, 1);
  // we want to get weather by months, so we loop and increase the month by 1 each time
  while(dateTo.valueOf() < endDate.valueOf()) {
    const monthFromInt = dateFrom.getUTCMonth() + 1;
    const monthToInt = dateTo.getUTCMonth() + 1;
    const monthFrom = monthFromInt < 10 ? "0" + monthFromInt : "" + monthFromInt;
    const monthTo = monthToInt < 10 ? "0" + monthToInt : "" + monthToInt;
    /**
     * Response example: 
     * 
     * {
          "requestedLatitude": [43.34, ...],
          ...
          "precip1Hour": [0.00, 0.00, ...],
          ...
          "temperature": [56.2, 52.3, ...],
          ...
        }
    */
    const response = await axios.get("https://api.weather.com/v3/wx/hod/r1/direct?&format=json&units=m", {
      params: {
        apiKey: process.env.API_KEY,
        geocode: latitude + "," + longitude,
        startDateTime: dateFrom.getUTCFullYear() + "-" + monthFrom + "-01T00Z",
        endDateTime: dateTo.getUTCFullYear() + "-" + monthTo + "-01T00Z"
      }
    });
  
    const precipitationList = response["data"]["precip1Hour"];
    const totalPrecipitation = precipitationList.reduce((a, b) => a + b, 0);
    const temperatureList = response["data"]["temperature"];
    const totalTemperature = temperatureList.reduce((a, b) => a + b, 0);
    const averageTemperature = totalTemperature / temperatureList.length;
    // create a new date object to set in the returned array
    const timestampDate = new Date(0);
    timestampDate.setUTCMilliseconds(dateFrom.valueOf());
    weatherHistoricals.push({
      timestamp: "" + dateFrom.valueOf(),
      timestampDate,
      temperature: averageTemperature,
      precipitation: totalPrecipitation
    });
    // increment both dates by 1 month
    dateFrom.setUTCMonth(dateFrom.getUTCMonth() + 1);
    dateTo.setUTCMonth(dateTo.getUTCMonth() + 1);
  }

  return weatherHistoricals;
};

const getWeatherForecastOrCurrent = async (yearFrom, zeroIdxMonthFromInc, yearTo, zeroIdxMonthToExc, latitude, longitude) => {
  let response = {};
  const forecastTimestampInfo = await getTimestampsForForecasting(yearFrom, zeroIdxMonthFromInc, yearTo, zeroIdxMonthToExc);
  if(forecastTimestampInfo["rt"]) {
    let weatherForecasts = [];
    const normalTimestampList = await getTimestampsForNormals(zeroIdxMonthFromInc, zeroIdxMonthToExc);
    const forecastTimestampList = forecastTimestampInfo["timestampsForForecasting"];
    for(let i = 0; i < forecastTimestampList.length; i++) {
      const departures = await getWeatherForecastingDepartures(forecastTimestampInfo["rt"], forecastTimestampList[i], latitude, longitude);
      const normals = await getWeatherNormals(normalTimestampList[i], latitude, longitude);
      weatherForecasts.push({
        timestamp: forecastTimestampList[i],
        timestampDate: new Date(+forecastTimestampList[i]),
        temperature: normals["dailyAvgTemperature"] + departures["dailyAvgTemperatureDeparture"],
        precipitation: normals["monthlyTotalPrecipitation"] + departures["monthlyTotalPrecipitationDeparture"]
      });
    }
    response["forecast"] = true;
    response["values"] = weatherForecasts;
  } else {
    response["forecast"] = false;
    response["values"] = await getWeatherHistoricals(yearFrom - 1, zeroIdxMonthFromInc, yearTo - 1, zeroIdxMonthToExc, latitude, longitude);
  }
  return response;
}

const getIBMCloudBearerToken = async () => {
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

const getYieldPrediction = (bearerToken, modelValues, deploymentId) => {
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
      Authorization: "Bearer " + bearerToken,
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

module.exports = { getWeatherForecastOrCurrent, getIBMCloudBearerToken, getYieldPrediction, getSoilType };
