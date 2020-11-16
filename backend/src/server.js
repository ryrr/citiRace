let express = require("express");
let {PythonShell} = require('python-shell');
let session = require('express-session');
let cors = require('cors')
let db = require('./db/db.js')
let zips = require('./misc/zips.json')
let app = express();

app.use(cors())
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 100000 }}))

//get database rides
app.get("/rides/:startstation/:endstation/:gender/:type", async(req, res) => {
    startstation = (req.params.startstation).replace(/_/g, ' ');
    endstation = (req.params.endstation).replace(/_/g, ' ');
    gender = Number(req.params.gender)
    type = Number(req.params.type)
    let rides = await db.getRides(startstation,endstation,gender,type,10)
    res.json(rides);
});

//upload user rides
app.get("/uploadrides/:user", async(req,res)=>{
    if(!req.session.rides){
        var options = {
            mode: 'text',
            pythonOptions: ['-u'],
            scriptPath: './scripts',
        };
        PythonShell.run('processRides.py', options, function (err, results) {
            if (err) throw err;
            // results is an array consisting of messages collected during execution
            req.session.rides = results[0]
            res.json(JSON.parse(results[0]))
        })
    }
    else{
        res.send('rides already uploaded')
    }
})

//get ranking for a ride
app.get('/ranking/:startstation/:endstation/:duration', async(req,res)=>{
    startstation = (req.params.startstation).replace(/_/g, ' ');
    endstation = (req.params.endstation).replace(/_/g, ' ');
    duration = Number(req.params.duration)
    let ranking = await db.getRanking(startstation,endstation,duration)
    res.json(ranking);
})

//get a users best ride
app.get('/bestride/:startstation/:endstation',async(req,res)=>{
    let startstation = (req.params.startstation).replace(/_/g, ' ');
    let endstation = (req.params.endstation).replace(/_/g, ' ');
    let allRides = JSON.parse(req.session.rides)
    let best = {'duration':1000000}
    for (let ride of allRides){
        if(ride['start_station']==startstation && ride['end_station']==endstation){
            console.log('cummer')
            if(Number(ride['duration']) < Number(best['duration'])){
                best = ride
            }
        }
    }
    res.send(best) 
})


//processing for rideData
app.get('/processrides',async(req,res)=>{
    let rides = JSON.parse(req.session.rides)
    let stationDict = {}
    for(ride of rides){
        ss = ride['start_station']
        es = ride['end_station']
        key = ss+' '+es
        if(stationDict[key]){
            stationDict[key]['trips'] +=1
        }
        else{
            stationDict[key] = {'trips':1,'zips':[],'mileage':0}
        }
        if(stationDict[key]['zips'].length===0){
            stationDict[key]['zips'].push(zips[ss])
            stationDict[key]['zips'].push(zips[es])
        }
    }
    res.send(stationDict)
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});