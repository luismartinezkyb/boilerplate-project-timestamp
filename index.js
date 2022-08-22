// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 

app.get('/api', (req, res)=>{
  var today = new Date()
  let check = Date.parse(today);
  res.json({
      "unix": check,
      "utc": today.toUTCString()
    })
})
// your first API endpoint... 
app.get('/api/:date', (req, res)=>{
  const {date} = req.params;
  
  let checkDate = Date.parse(date);
  console.log(checkDate)
  if(checkDate){
    let newDate = new Date(checkDate * 1)
    res.json({
      "unix": checkDate,
      "utc": newDate.toUTCString()
    })
  }
  else if(date.length===13 || date.length===10 || date.length===16 || date.length===19 ){
    let newDate2;
    let number;
    switch(date.length){
      case 10:
        console.log("case10");
        newDate2 = new Date(date * 1000)
        number = Number(date)*1000;
        break;
      case 13:
        console.log("case13");
        newDate2 = new Date(date * 1)
        number = Number(date)*1;
        break;
      case 16:
        console.log("case16");
        newDate2 = new Date(date / 1000);
        number = Number(date)/1000;
        break;
      case 19:
        console.log("case19");
        newDate2 = new Date(date / 1000000)
        number = Number(date)/1000000;
        break;
      default:
        
        break;
    }
    res.json({
      "unix": number,
      "utc": newDate2.toUTCString()
    })
  }
  else{
    res.json({"error": "Invalid Date"})
  }
  
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
