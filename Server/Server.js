const apis = require("./APIs");
const express = require("express");
require("dotenv").config();
const app = express();

const ibmdb = require("ibm_db");
const connStr = process.env.CONN_STRING;

app.get("/yield", async (request, response) => {
  let lon = request.query.lon;
  let lat = request.query.lat;
  let cropType = request.query.cropType;
  // corn prediction is from May to September
  const yearFrom = 2023;
  const monthFrom = 4;
  const yearTo = 2023;
  const monthTo = 10;
  // returns { forecast: true/false, values: [{temperature: x.xx, precipitation: y.yy}, ...]}
  const weatherInfo = await apis.getWeatherForecastOrCurrent(yearFrom, monthFrom, yearTo, monthTo, lat, lon);
  var predictionInputValues = [];
  for(const weatherValues of weatherInfo.values) {
    predictionInputValues.push(weatherValues.temperature);
    predictionInputValues.push(weatherValues.precipitation);
  }

  let yieldsInfo = [];
  await getYieldPredictionForCropType(yieldsInfo, lon, lat, cropType, predictionInputValues);
  yieldsInfo = yieldsInfo.sort((a, b) => (a.yield < b.yield ? 1 : -1));
  console.log("send Res");
  response.send({ weatherInfo, yieldsInfo });
});

getYieldPredictionForCropType = (yieldsInfo, lon, lat, cropType, predictionInputValues) => {
  return new Promise(async (resolve, reject) => {
    const ibmCloudBearerTokenResponse = await apis.getIBMCloudBearerToken();
    const ibmCloudBearerToken = ibmCloudBearerTokenResponse.data.access_token;

    const soilTypeResponse = await apis.getSoilType(lon, lat);
    const soilType = soilTypeResponse.data.wrb_class_name;

    ibmdb.open(connStr, (err, conn) => {
      if (err) return console.log(err);
      conn.query("select * from WML_MODELS where CROP_TYPE=" + cropType, async (err, data) => {
        if (err) console.log(err);
        for (let i in data) {
          let yield = {};
          yield.cropType = data[i].CROP_TYPE;
          yield.seedVariantName = data[i].SEED_VARIANT_NAME;
          yield.seedVariantBrand = data[i].SEED_VARIANT_BRAND;
          yield.soilType = soilType;
          const soilTypesArray = data[i].MODEL_SOIL_TYPES;
          const deploymentId = data[i].DEPLOYMENT_ID;
          let soilIndex = soilTypesArray.indexOf(soilType);
          if (soilIndex == -1) {
            soilIndex = 0;
          }
          if ((predictionInputValues.length = 11)) {
            predictionInputValues.pop();
          }
          predictionInputValues.push(soilIndex);
          const yieldResponse = await apis.getYieldPrediction(ibmCloudBearerToken, predictionInputValues, deploymentId);
          const yieldValue = yieldResponse.data.predictions[0].values[0];
          yield.yield = yieldValue[0].toFixed(1);
          yieldsInfo.push(yield);
        }
        conn.close(() => {
          resolve();
        });
      });
    });
  });
};

app.listen(5000, () => {
  console.log("Listen on the port 5000...");
});
