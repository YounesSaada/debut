import express from 'express'; // import express
import path from 'path';


const PORT  = 8888; // port number
const app = express(); // create express application
const publiDirectoryPath = path.join("public"); // public directory path


app.use(express.static(publiDirectoryPath)); // use public directory
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