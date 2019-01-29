var fs = require ('fs');
var express = require('express');
var router = express.Router();

var shoppingArray = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/lomake', function(req, res, next) {
  res.render('lomake', {title: "Ostoslista"});
});

router.post('/addperson', function(req, res, next) {
  let newPerson = req.body;
  newPerson["id"] = shoppingArray.length + 1;
  shoppingArray.push(newPerson);
  let peopleJSON = JSON.stringify(shoppingArray);
  fs.writeFile('./views/files/shopping.json', peopleJSON, function(err) {
    if (err) throw err;
    console.log("shopping.json saved!");
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
