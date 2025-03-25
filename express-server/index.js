import expres from 'express'; // import express
const PORT  = 8888; // port number
const app = expres(); // create express application
app.get('/ping', function(req, res)  { // root path
 res.send('pong'); // response
});
app.get('/greetings', function(req, res)  {// root path
   const { name, location, occupation } = req.query; // get query parameters
   res.send(
    JSON.stringify({
        id : "1",
        name,
        location, 
        occupation, 
        age: 29, 
        favoriteFood: "Pizza"
    }) 
   )
});
app.listen(PORT, function() { // listen to port
    console.log(`Server is running on ${PORT}`); // log message
});