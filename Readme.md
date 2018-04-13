# Virginia Cyber Range Temperature Assignment
## This repository contains an API application to check the current temperature of a place based on its Zip code.
  The instructions to be entered on the console to install the dependncies and start the server have been given below. Once the user starts the server
  - Type the following in the URL tab. "localhost:8080" followed "locations" and the Zip code of the location of the which the user needs to know the temperature.For example "localhost:8080/locations/10001" for New York.
  - The teperature scale is set to Fahrenheit by default. If the user wishes to change the scale to Celsius, the URL needs to be modified with a query For example "localhost:8080/locations/10001/scale=Celsius" or "localhost:8080/locations/10001/scale=celsius".
  - If the URL is faulty, the error message will include 2 links. First will redirect you to et the temperature in Fahrenheit and the second will redirect you to get the temperature in Celsius
  - If there is an error in the Zip code, a different error message will be displayed which tells the user that the location us invalid

## To Install dependencies
`npm install`

## To start the server
`npm start`
