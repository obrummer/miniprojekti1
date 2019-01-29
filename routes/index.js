var fs = require ('fs');
var express = require('express');
var router = express.Router();

var shoppingArray = [];

/* GET home page. Kommentoitu pois, kun ei oleellinen, AF. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/

router.get('/lomake', function(req, res, next) {  
  res.render('lomake', {title: "Ostoslista"});
});

router.post('/tuotteet', function(req, res, next) {   //valmis ostoslista löytyy osoitteesta localhost:3000/tuotteet, AF
  let newItem = req.body;
  newItem["id"] = shoppingArray.length + 1;
  shoppingArray.push(newItem);
  let itemsJSON = JSON.stringify(shoppingArray);
  fs.writeFile('./views/files/shopping.json', itemsJSON, function(err) {  //funktioiden ja muuttujien nimiä muutettu, AF
    if (err) throw err;
    console.log("Ostoslista tallennettu!");  
  });
  res.render('nayta', {title: 'Ostoslista', shoppingArray});
})

fs.readFile('./views/files/shopping.json', function(err, data) {
  console.log("File reading...");
  console.log("data: " + data);
  if (data) {
  shoppingArray = JSON.parse(data);
  console.log("File read! " + shoppingArray);
  } else {
    shoppingArray = [];
    console.log("Tyhjä tiedosto");
  }
});

module.exports = router;
