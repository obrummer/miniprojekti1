var fs = require ('fs');
var express = require('express');
var router = express.Router();

var peopleArray = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/lomake', function(req, res, next) {
  res.render('lomake', {title: "Lomakesivu", nimi: "Lassi Lomake"});
});

router.post('/addperson', function(req, res, next) {
  let newPerson = req.body;
  newPerson["id"] = peopleArray.length + 1;
  peopleArray.push(newPerson);
  let peopleJSON = JSON.stringify(peopleArray);
  fs.writeFile('./views/files/shopping.json', peopleJSON, function(err) {
    if (err) throw err;
    console.log("shopping.json saved!");
  });
  res.render('nayta', {title: 'Naytalomakesivu', nimi: 'Lassi Lomake', peopleArray});
})

fs.readFile('./views/files/shopping.json', function(err, data) {
  console.log("File reading...");
  console.log("data: " + data);
  if (data) {
  peopleArray = JSON.parse(data);
  console.log("File read! " + peopleArray);
  } else {
    peopleArray = [];
    console.log("Tyhjä tiedosto");
  }
});

module.exports = router;
