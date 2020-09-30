const projectData = [];
// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
app.listen(port, () => console.log(`Server is Running at ${port}`));

// POST Route (send projectData back to server after being updated)

app.post('/addAll', (req, res) => {
    console.log(req.body);
    newEntery = {
        date: req.body.date,
        temp: req.body.temp,
        feeling: req.body.feeling
    }
    projectData.push(newEntery);
    res.send(projectData);
})

// GET Route (Get projectData from server and send it to Client)
app.get('/updated', (req, res) => {
    res.send(projectData);
})







