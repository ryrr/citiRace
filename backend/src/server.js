let express = require("express");
let app = express();
let cors = require('cors')
const db = require('./db/db.js')

app.use(cors())


app.get("/rides/:startstation/:endstation/:gender/:type", async(req, res) => {
    startstation = (req.params.startstation).replace(/_/g, ' ');
    endstation = (req.params.endstation).replace(/_/g, ' ');
    gender = Number(req.params.gender)
    type = Number(req.params.type)
    let rides = await db.getRides(startstation,endstation,gender,type,10)
    res.json(rides);
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});