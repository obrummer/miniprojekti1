var fs = require ('fs');
var express = require('express');
var router = express.Router();

var shoppingArray = [];

router.get('/ostoslista', function(req, res, next) {  // ostoslista löytyy osoitteesta localhost:3000/tuotteet, AF
  res.render('nayta', {title: 'Ostoslista', shoppingArray});
})

router.post('/ostoslista', function(req, res, next) {   
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

/* DELETE shoppingitem */
router.delete('/tuotteet/:id',function (req, res) {

    console.dir(shoppingArray);
   
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
