let zipArr = require('./zipcodes.json')
const fs = require('fs');
let stationKeyed = {}
for(pair of zipArr){
    zip = pair[0]
    station = pair[1]
    stationKeyed[station] = zip
}
let toWrite = JSON.stringify(stationKeyed)

fs.writeFile("zips.json", toWrite, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");

})