var fs = require ('fs');
var express = require('express');
var router = express.Router();

var shoppingArray = [];

<<<<<<< HEAD
router.get('/ostoslista', function(req, res, next) {  // ostoslista löytyy osoitteesta localhost:3000/tuotteet, AF
  res.render('nayta', {title: 'Ostoslista', shoppingArray});
})

router.post('/ostoslista', function(req, res, next) {   
=======
router.get('/', function(req, res, next) {  
  res.render('lomake', {title: "Ostoslista"});
});

// Adds items to Array and writes to shopping.json
router.post('/tuotteet', function(req, res, next) {   
>>>>>>> 65ae527d7f91e3849d838b85d4f3356eefcbee90
  let newItem = req.body;
  newItem["id"] = shoppingArray.length + 1;
  shoppingArray.push(newItem);
  let itemsJSON = JSON.stringify(shoppingArray);
  fs.writeFile('./views/files/shopping.json', itemsJSON, function(err) {  
    if (err) throw err;
  });
  res.render('nayta', {title: 'Ostoslista', shoppingArray});
})

// Reads data from shopping.json
fs.readFile('./views/files/shopping.json', function(err, data) {
  if (data) {
  shoppingArray = JSON.parse(data);
  } else {
    shoppingArray = [];
  }
});

// Deletes shopping item and write changes to shopping.json on server
router.delete('/tuotteet/:id',function (req, res) {
      for (var item in shoppingArray) {
        if (shoppingArray[item].id == req.params.id) {
            shoppingArray.splice(item, 1);
            fs.writeFile('./views/files/shopping.json', JSON.stringify(shoppingArray), function(){
              res.json(shoppingArray);
            });
            return;
        }
    }
    res.json("{'msg': 'Error!'}");
  
});

module.exports = router;
