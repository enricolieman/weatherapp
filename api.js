var express = require('express'),
    router = express.Router();
var mongo = require("./db")
var bodyParser = require('body-parser')
var urlencodedParser = bodyParser.urlencoded({ extended: false })
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const axios = require("axios")
dotenv.config();

router.use((req, res, next) => {
    var auth = req.headers.authorization;
    if(!(auth))
    {
        res.send({success:false})
    }
    else
    {
        (async() => {
        try {
            const decoded = await jwt.verify(auth, process.env.JWT_TOKEN);
            req.userData = decoded;
            next();
          } catch (err) {
            res.send({success:false})
          }
        })();
    }
})



router.get('/me', async function(req, res, next){
    var result = await mongo.search('users', {email: req.userData.email});
    if(result == null)
    {
        res.send({success:false});
    }
    else
    {
    res.send({success:true, data: req.userData});
    }
  })

  router.get('/city/:id', async function(req, res, next){
      try{

    const response = await axios(
        'https://maps.googleapis.com/maps/api/place/autocomplete/json?input='+req.params.id+'&types=geocode&radius=500&key=AIzaSyDTpmRC-Wl7ccwvllDHwHT7_zLh076cTd4',
    {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'Server-Timing': 'gfet4t7; dur=56',
            'Content-Encoding': 'gzip',
            'X-XSS-Protection': '0',
            'Expires': 'Thu, 12 May 2022 09:40:41 GMT',
            'Cache-Control': 'private, max-age=300',
            'Date': 'Thu, 12 May 2022 09:40:41 GMT',
            'X-Frame-Options': 'SAMEORIGIN',
            'Vary': 'Accept-Language',
            'Alt-Svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
            'Server': 'scaffolding on HTTPServer2'}
    }
    ).then(function (response) {
        
        res.send(response.data);
      });
    }
    catch(e)
    {
        res.send(e);
    }
  })

  router.get('/geo/:id', async function(req, res, next){
    try{
  const response = await axios(
      'https://maps.googleapis.com/maps/api/place/details/json?place_id='+req.params.id+'&key=AIzaSyDTpmRC-Wl7ccwvllDHwHT7_zLh076cTd4',
  {
      headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          'Server-Timing': 'gfet4t7; dur=56',
          'Content-Encoding': 'gzip',
          'X-XSS-Protection': '0',
          'Expires': 'Thu, 12 May 2022 09:40:41 GMT',
          'Cache-Control': 'private, max-age=300',
          'Date': 'Thu, 12 May 2022 09:40:41 GMT',
          'X-Frame-Options': 'SAMEORIGIN',
          'Vary': 'Accept-Language',
          'Alt-Svc': 'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000,h3-Q050=":443"; ma=2592000,h3-Q046=":443"; ma=2592000,h3-Q043=":443"; ma=2592000,quic=":443"; ma=2592000; v="46,43"',
          'Server': 'scaffolding on HTTPServer2'}
  }
  ).then(function (response) {
      
      res.send(response.data);
    });
  }
  catch(e)
  {
      res.send(e);
  }
})

router.post('/weather', urlencodedParser, async function(req, res, next){
    if(req.body.id)
    {
        query = {id: +req.body.id, user_id: req.userData.id};
        var result = await mongo.search('favorite', query);
        var lat = result[0].lat
        var long = result[0].long
    }
    else
    {
        var lat = req.body.lat
        var long = req.body.long
    }
    try{
  const response = await axios(
      'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+long+'&appid=dd4b86b877110ee65e0fc43de22e3347'
  ).then(function (response) {
      
      res.send(response.data);
    });
  }
  catch(e)
  {
      res.send(e);
  }
})


var favorite = require('./favorite');
router.use('/favorite', favorite);

module.exports = router;