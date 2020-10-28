const {MongoClient} = require('mongodb');
const config = require('./config.js')


async function getClient(){
    const uri = `mongodb+srv://ryrr:${config.password}@cluster0.xxppw.mongodb.net/citiracedb?retryWrites=true&w=majority`
    const client = new MongoClient(uri,{ useUnifiedTopology: true });
    try {
        await client.connect();
        return client
    } catch (e) {
        console.error(e);
    }
}


exports.getRides = async(startStation,endStation,gender,type,limit)=>{
    let client = await getClient()
    const db = client.db('citiracedb')
    const collection = db.collection('rides202009')
    let rides
    try{
        rides = await collection.find({'start station name':startStation,'end station name':endStation}).sort({'tripduration':type}).limit(limit).toArray();
    }catch (e) {
        console.error(e);
    }
    client.close()
    return rides
}

