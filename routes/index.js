var fs = require ('fs');
var express = require('express');
var router = express.Router();

var shoppingArray = [];

router.get('/', function(req, res, next) {  
  res.render('lomake', {title: "Ostoslista"});
});

// Adds items to Array and writes to shopping.json
router.post('/tuotteet', function(req, res, next) {   
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
