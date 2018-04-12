const http = require('http');
const url = require('url');
const YQL = require('yql');

const hostname = '127.0.0.1';
const port = 8080;

function temperatureServer(request, res){
  var url_parts = url.parse(request.url, true);
  var path = url_parts.path;
  var path_array = path.split("/");
  var query = url_parts.query;

  if(path_array.length < 3 || path_array[1]!="locations" || (path_array.length == 3 && path_array[2]==="")){
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');

    var errorMessage = '<b>ERROR:</b> 404 Not Found\
    <br>\
    Example Usage:\
    <br>\
    <a href="http://localhost:8080/locations/24060">Temperature of zip 24060 in Fahrenheit</a>\
    <br>\
    <a href="http://localhost:8080/locations/24060?scale=Celsius">Temperature of zip 24060 in Celsius</a>';
    res.end(errorMessage);
  }
  else{
    /* Default scale is F */
    var isFahrenheitScale = true;
    if(query.scale && query.scale.toLowerCase()==='celsius'){
      isFahrenheitScale = false;
    }

    var units = isFahrenheitScale?'f':'c';
    var zip = path_array[2];

    yql_query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text='${zip}') AND u='${units}'`

    // console.log(yql_query)
  
    new YQL(yql_query).exec(function(error, data) {
      var results = data.query.results;
      if(!results){
        res.setHeader('Content-Type', 'text/html');
        res.end("ERROR: Invalid location");
        return;
      }

      var condition = results.channel.item.condition;
  
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(
        {
          temperature:condition.temp,
          scale:isFahrenheitScale?"Fahrenheit":"Celsius"
        }
      ));
    });
  }
}

http.createServer( temperatureServer ).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
