var fs = require ('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var parser = bodyParser.urlencoded({ extended: true });
app.use(bodyParser.json()); // support json encoded bodies
// Router for REST services
var router = express.Router();
const logger = require('morgan');
app.use(logger('dev'));

// Set default CORS values to headers, including
// Access-Control-Allow-Origin: *
var cors = require('cors');
app.use(cors());



// General functionality for all REST services
// Dummy print to the console only
router.use(function (req, res, next) {
    console.log('I was called.');
    next();  // Must be here, we do want to continue to the actual service
});

// testing-route, GET http://localhost:3000/api/
// could also redirect..
router.get('/', function (req, res) {
    res.json({ message: 'Yey, you found me.. Now try the ostoslista' });
});


// List of people, or create new person
// GET http://localhost:3000/api/ostolista
// POST http://localhost:3000/api/ostoslista
router.route('/ostoslista')
	.get(function (req, res) {
	    res.json(items);
	})
	.post(function(req, res) {
		console.log(req.body);
		// All other checks are missing..
		if (!req.body) throw new Error("Ei tuotteita");
		const data = req.body;
		data.id = nextid++;
		items.push(data);
        res.status(201).location('http://localhost:3000/ostoslista'+data.id)
             .send();
        console.log("Received", data);
	});

// Single person, get details or delete with id
// GET http://localhost:3000/api/personnel/2
// DELETE http://localhost:3000/api/personnel/2
router.route('/ostoslista/:id')
	.get(function (req, res) {
	    for (var item of shoppingArray) {
	        if (item.id == req.params.id) {
	            res.json(item);
	            return;
	        }
	    }
	    res.json("{'msg': 'Error, no such item!'}");
	})
	.delete(function (req, res) {
	    for (var item in shoppingArray) {
	        if (shoppingArray[item].id == req.params.id) {
	            shoppingArray.splice(item, 1);
	            res.json(item);
	            return;
	        }
	    }
	    res.json("{'msg': 'Error, no such item!'}");
	});

// data, demo stuff, should come from e.g. data base
var people = [{ id: 0, name: 'Anna Malli', email: 'anna@malli.fi' },
                { id: 1, name: 'Teemu Tehokas', email: 'teemu@tehokas.fi' },
                { id: 2, name: 'Anne Avuton', email: 'clueless@koti.org' },
                { id: 3, name: 'Taavi Tehokas', email: 'taavi@tehokas.fi' },
                { id: 4, name: 'Teemu Tumpelo', email: 'teemu@tehoton.fi' },
				{ id: 5, name: 'Annukka Malli', email: 'annukka@malli.fi' }];
var nextid = 100;

// Define the REST service address with the router
app.use('/api', router);
// Where to service the static files from
app.use(express.static('files'));

// Start the server
var server = app.listen(4000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Now listening at http://%s:%s", host, port);
});


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

/*.delete(function(req, res) {
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
})*/




 router.delete('/ostoslista/:id',function (req, res) {
  fs.readFile('shopping.json',function(err, data){
     let shoppingArray = JSON.parse(data);
     for (var item in shoppingArray) {
         if (shoppingArray[item].id == req.params.id) {
           shoppingArray.splice(item, 1);
             fs.writeFile('shopping.json', JSON.stringify(shoppingArray), function(){
               res.json(shoppingArray);
             });
             return;
         }
     }
     res.json("{'msg': 'Error, no suchperson!'}");
   });
 });

module.exports = router;
