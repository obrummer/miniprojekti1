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
})

router.route("/ostoslista/:id")
.get(function(req, res){
  for(let i of ostoslista) {
    if(i.id == req.params.id) {
      res.json(i);
      return;
    }
  }
  res.json({msg: "Ei löydy"})
})

.delete(function(req, res) {
  for(var i of ostoslista) {
    console.log(req.params.id);
    console.log(item.id);
    if(item.id == req.params.id) {
      ostoslista.splice(item, 1);
      res.json({msg: "Tuote poistettu"});
      return;
    }
    res.json("{'msg': 'Error, ei ole tuotetta'}")
  }
})




// router.delete('/ostoslista/:id',function (req, res) {
//   fs.readFile('shopping.json',function(err, data){
//     let ostosArray = JSON.parse(data);
//     for (var item in ostosArray) {
//         if (ostosArray[item].id == req.params.id) {
//           ostosArray.splice(item, 1);
//             fs.writeFile('shopping.json', JSON.stringify(ostosArray), function(){
//               res.json(ostosArray);
//             });
//             return;
//         }
//     }
//     res.json("{'msg': 'Error, no suchperson!'}");
//   });
// });

module.exports = router;
