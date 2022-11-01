# ESSPERA

## Contents
- [Short description](https://github.com/Julie-Saurat/esspera#short-description)
- [Demo video](https://github.com/Julie-Saurat/esspera#demo-video)
- [The architecture](https://github.com/Julie-Saurat/esspera#the-architecture)
- [Long description](https://github.com/Julie-Saurat/esspera#Long-description)
- [Design thinking path](https://github.com/Julie-Saurat/esspera#Design-thinking-path)
- [Project roadmap](https://github.com/Julie-Saurat/esspera#project-roadmap)
- [Getting started](https://github.com/Julie-Saurat/esspera#getting-started)
- [Built with](https://github.com/Julie-Saurat/esspera#built-with)
- [Contributing](https://github.com/Julie-Saurat/esspera#contributing)
- [Versioning](https://github.com/Julie-Saurat/esspera#versioning)
- [Authors](https://github.com/Julie-Saurat/esspera#authors)
- [License](https://github.com/Julie-Saurat/esspera#License)

## Short description

### What's the problem?
**Climate change is one of the major challenges of the 21st century**. Introducing further **unpredictability in food security**, directly impacting the performance of various seeds for the next growing seasons, making our **farmers’ crops decision even riskier**.

To remain sustainable, **farming must adapt quickly** to the changing conditions of our world.

### How can technology help?
**Leveraging AI and model training**, we believe we can - all together - provide many solutions for a **more resilient local agriculture**, leading through a **global improvement of food security**.

### The idea
ESSPERA was imagined to response to the big issue of food security from its roots. 
The idea is to **provide farmers the best seed recommendation**, thanks to farmers associations and governmental **seed trials results**. 

Helping them to make better decision with confidence to grow more resilient, we **ensure a better local food security**.
![What is ESSPERA](https://user-images.githubusercontent.com/65171375/198662592-f1c8608e-04fb-462c-986b-edebb51cfe13.png)


## Demo video
Discover Esspera in video here: [https://youtu.be/t8KhvVDGRd4](https://youtu.be/t8KhvVDGRd4)
[![Esspera Demo Video](https://user-images.githubusercontent.com/3689704/199121490-902e9a42-de86-482d-ad1a-9d741eebeb34.png)](https://youtu.be/t8KhvVDGRd4)

## The architecture
### Test/Dev Architecture (Existing):
![ESSPERA Solution Architecture_existing](https://user-images.githubusercontent.com/65171375/198745641-5ad19c36-a26d-401a-a352-2abd926fe616.png)
1. Web application: farmers can access their dashboard to get seed recommendation based on their location
2. ESSPERA database: storing mapping between model/deployment and crop type
3. Exposed API: exposing deployed prediction model as API
4. Deployment: deploy trained models and created callable APIs to do prediction
5. IBM Watson Studio: manage CP4D as a Service assets; Store data assets and model required when running Jupyter notebooks
6. IBM Watson Machine Learning: used by deployment to get the prediction of seed yield
7. Cloud Object Storage: used by CP4D as a Service to store model and CSVs
8. Jupyter Notebooks: Clean CSVs, amend with weather data and soil type; Train models to deploy
9. IBM Environmental Intelligence Suite: get historical and forecast weather data

### Production Architecture (Future):
![ESSPERA Solution Architecture_futur](https://user-images.githubusercontent.com/65171375/198745722-92e947f5-b0fd-4436-9e5d-b9dad6fdcd21.png)

## Long description
Climate change is putting constant pressure on agricultural productivity, threatening decades of global progress in improving food security. It is a complex problem that can only be tackled through a combinations of incremental improvement. But broadly speaking, in the words of the IMF:

"Investing in climate-resilient agriculture will be vital to increasing future harvests. More intense and more unpredictable climatic events are increasing food insecurity. Low-income countries, particularly in sub-Saharan Africa , are among the least prepared to face the effects of climate change. Solutions should be tailored to country circumstances, with a focus on low-cost, high-impact measures, such as investing in new crop varieties, improving water management, and information dissemination."

Esspera came about out of our desire to contribute such a low-cost, high-impact solution to this fight. During our research, we discovered the extent of the large-scale efforts currently underway to rapidly develop productive cultivars adapted to rapidly changing global and local climatic conditions. We observed the extensive germplasm data that is being made publicly available through organisations like the CIMMYT, and the large number of promising varieties that are developed and commercialized every year. But while researchers can currently use open source tools to predict fairly accurately the productivity in a given environment of the genetics of two germplasm when creating a new hybrid, no such tool exists to allow a farmer to compare how commercially available variants would perform in his local climatic conditions.

Typically, large scale fields trials are conducted at the regional level through the cooperative efforts of farmer associations, universities, seed growers, governmental agencies, and others. These regional consortiums or organisations typically conduct performance trials for hundreds of varieties in multiples test sites, to account for varying local environmental conditions. They tend to publish their results for free, but usually in a PDF format.

## Design thinking path
![ESSPERA-Design thinking-extract](https://user-images.githubusercontent.com/65171375/198857424-071d6e36-fc22-4eef-b260-990eb92aefb8.jpg)
Discover the full path here:
[ESSPERA-Design thinking.pdf](https://github.com/Julie-Saurat/esspera/files/9894826/ESSPERA-Design.thinking.pdf)

## Project roadmap
![roadmap](https://user-images.githubusercontent.com/65171375/199017074-220cbea0-e96b-4264-9dc3-069c14f767db.jpg)

## Getting started
### Pre-requisites
1. [IBM Cloud account](https://cloud.ibm.com) with these services:
    1. [Cloud Object Storage - Lite plan](https://cloud.ibm.com/objectstorage/create)
    2. [Watson Studio - Lite plan](https://cloud.ibm.com/catalog/services/watson-studio)
    3. [Watson Machine Learning - Lite plan](https://cloud.ibm.com/catalog/services/watson-machine-learning)
    4. [Db2 - Lite plan](https://cloud.ibm.com/catalog/services/db2)
2. In CP4D as a Service, [create a new project](https://dataplatform.cloud.ibm.com/docs/content/wsj/getting-started/projects.html)
3. In CP4D as a Service, [create a new deployment space](https://dataplatform.cloud.ibm.com/docs/content/wsj/analyze-data/ml-space-create.html)
4. Get an API key for [IBM Environmental Intelligence Suite - Standard Suite + Premium Weather Data APIs](https://www.ibm.com/products/environmental-intelligence-suite) (AKA The Weather Company Data APIs)
5. For local deployment for deployment and testing:
    1. Install NodeJS
    2. Install Python 3.9+
    3. Clone this repo
### Training a model and deploying to CP4D as a Service
1. Prepare a CSV based on the [template](jupyter-notebooks/Template%20NewSeedData_Crop_Seed.csv) and make sure the filename starts with "NewSeedData_" and has extension ".csv"
2. In CP4D as a Service, go to the created project and [import the file as data asset](https://dataplatform.cloud.ibm.com/docs/content/wsj/manage-data/add-data-project.html#files)
3. Navigate to the [jupyter-notebooks](jupyter-notebooks) folder and run the command: `pip install -r requirements.txt` to install the required packages to run the notebook
4. Create a .env file based on the [template](jupyter-notebooks/Template%20.env) and fill in the required values
5. Open the [Jupyter notebook](jupyter-notebooks/Seed%20Variant%20Data%20Processing.ipynb) in Visual Studio Code IDE and click on the `Run All` button to run the notebook. It will process the imported CSV, create the model, and deploy to CP4D as a Service
### Running the back-end web services used by the front-end
1. Navigate to the [Server](Server) folder and run the command: `npm install` to install the required packages to run the back-end web services
2. Edit the .env file and fill in the required value
3. To start the back-end web services, run the command: `npm start`
### Running the front-end web application
1. Navigate to the [front-end](front-end) folder and run the command: `npm install` to install the required packages to run the web application
2. To start the front-end web application, run the command `npm start`. It should automatically start a web browser session, otherwise from a web browser, simply go to http://localhost:3000

## Built with
- IBM Cloud Object Storage - Store datasets and the statistic models
- IBM Watson Studio - Manage machine learning projects, deployments, data assets
- Jupyter Notebook - Process data assets, train models and push to Watson Studio/Watson Machine Learning
- IBM Watson Machine Learning - Predicts data based on trained models
- ReactJS & Carbon Design - Front-end framework and library
- NodeJS & ExpressJS - Back-end framework and library
- Db2 - Store data and mapping to model and deployment
- IBM Environmental Intelligence Suite (Standard Suite + Premium Weather Data APIs) - Get historical and forecast weather data

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning
We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/Julie-Saurat/esspera/tags).

## Authors
- [Alex Bernier](https://github.com/alexbernier17)
- [Hazim Rekab](https://github.com/rekhazim1)
- [Julie Saurat](https://github.com/Julie-Saurat)
- [Ken Lim](https://github.com/kenlim1228)
- [Sagar Shah](https://github.com/Sagarshah30894)

## License
This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.
