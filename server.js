// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var customers = [
    {
        ID: "1",
        customerName: "test",
        phoneNumber: "111111",
        email: "test@gmail.com",
    },
];
var waitingList = [
];


app.get("/", function (req, res) {
   res.sendFile(path.join(__dirname, "all.html"));
});
app.get("/tables", function (req, res) {
   res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/reservations", function (req, res) {
   res.sendFile(path.join(__dirname, "reservations.html"));
});
app.get("/api/customers", function (req, res){
   return res.json(customers);
});
app.get("/api/waitlist", function (req, res){
   return res.json(waitingList);
});
app.post("/api/customers", function(req, res) {
   // req.body hosts is equal to the JSON post sent from the user
   // This works because of our body parsing middleware
   var newTable = req.body;
   // Using a RegEx Pattern to remove spaces from newCharacter
   // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
   newTable.ID = newTable.customerName.replace(/\s+/g, "").toLowerCase();
   console.log(newTable);

   if (customers.length < 5){
      customers.push(newTable)
   }else{
      waitingList.push(newTable)
   };
   

   res.json(newTable);
  });
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
   console.log("App listening on PORT " + PORT);
});