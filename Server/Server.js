const apis = require("./APIs");
const express = require("express");
require("dotenv").config();
const app = express();

const ibmdb = require("ibm_db");
const connStr = process.env.CONN_STRING;

const epochMonths = [1598918400000, 1596240000000, 1593561600000, 1590969600000, 1588291200000];

app.get("/precipitation", async (request, response) => {
  let modelValues = [];
  let lon = request.query.lon;
  let lat = request.query.lat;
  let cropType = request.query.cropType;
  let weatheResponse = await apis.getRTandT();
  if (weatheResponse.data) {
    let rt = weatheResponse.data.layers["500"].Precipitationanomalysurface1Month2.dimensions[0].rt[0];
    for (let i = 0; i < 5; i++) {
      let temperatureResposne = await apis.getTemperature(epochMonths[i]);
      let temperatureValue = temperatureResposne.data.features[0].properties.value;
      console.log(temperatureValue);
      modelValues.push(Number(temperatureValue.toFixed(1)));
      console.log("-------------------------------------");
      let t = weatheResponse.data.layers["500"].Precipitationanomalysurface1Month2.dimensions[0].t[i];
      let precipitationResponse = await apis.getPrecipitation(rt, t);
      let precipitationValue = precipitationResponse.data.features[0].properties.value;
      let normalreponse = await apis.getNormal(epochMonths[i]);
      let normalValue = normalreponse.data.features[0].properties.value;
      let modelValue = precipitationValue + normalValue;
      console.log(modelValue);
      modelValues.push(Number(modelValue.toFixed(1)));
      console.log("====================================");
    }
  }
  let yieldsInfo = [];
  await constructResponseFromDbData(yieldsInfo, lon, lat, cropType, modelValues);
  yieldsInfo = yieldsInfo.sort((a, b) => (a.yield < b.yield ? 1 : -1));
  console.log("send Res");
  response.send({ yieldsInfo });
});

constructResponseFromDbData = async (yieldsInfo, lon, lat, cropType, modelValues) => {
  const myPromise = new Promise(async (resolve, reject) => {
    let IBMTokenResposne = await apis.getIBMToken();
    let IBMToken = IBMTokenResposne.data.access_token;

    let soilTypeResponse = await apis.getSoilType(lon, lat);

    let soilType = soilTypeResponse.data.wrb_class_name;

    ibmdb.open(connStr, function (err, conn) {
      if (err) return console.log(err);
      conn.query("select * from WML_MODELS where CROP_TYPE=" + cropType, async function (err, data) {
        if (err) console.log(err);
        for (let i in data) {
          let yield = {};
          yield.cropType = data[i].CROP_TYPE;
          yield.seedVariantName = data[i].SEED_VARIANT_NAME;
          yield.seedVariantBrand = data[i].SEED_VARIANT_BRAND;
          yield.soilType = soilType;
          const soilTypesArray = data[i].MODEL_SOIL_TYPES;
          const deploymentId = data[i].DEPLOYMENT_ID;
          var soilIndex = soilTypesArray.indexOf(soilType);
          if (soilIndex == -1) {
            soilIndex = 0;
          }
          if ((modelValues.length = 11)) {
            modelValues.pop();
          }
          modelValues.push(soilIndex);
          let yieldResponse = await apis.getYeild(IBMToken, modelValues, deploymentId);
          let yieldValue = yieldResponse.data.predictions[0].values[0];
          yield.yield = yieldValue[0].toFixed(1);
          yieldsInfo.push(yield);
        }
        conn.close(function () {
          console.log("done");
          resolve();
        });
      });
    });
  });
  return myPromise;
};

// app.get("/test-db", (request, response) => {
//   let yiEldData = [];
//   ibmdb.open(connStr, function (err, conn) {
//     if (err) return console.log(err);
//     conn.query("select * from WML_MODELS where CROP_TYPE='Early Maturity Corn'", function (err, data) {
//       if (err) console.log(err);
//       else console.log(data);
//       for (let i in data) {
//         let yield = {};
//         yield.cropType = data[i].CROP_TYPE;
//         yield.seedVariantName = data[i].SEED_VARIANT_NAME;
//         yield.seedVariantBrand = data[i].SEED_VARIANT_BRAND;
//         yield.modelSoilTypes = data[i].MODEL_SOIL_TYPES;
//       }
//       conn.close(function () {
//         console.log("done");
//       });
//     });
//   });
// });

app.listen(5000, () => {
  console.log("Listen on the port 5000...");
});
