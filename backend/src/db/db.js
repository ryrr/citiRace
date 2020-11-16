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
        if(gender){ rides = await collection.find({'start station name':startStation,'end station name':endStation,'gender':gender}).sort({'tripduration':type}).limit(limit).toArray();}
        else{rides = await collection.find({'start station name':startStation,'end station name':endStation}).sort({'tripduration':type}).limit(limit).toArray();}
    }catch (e) {
        console.error(e);
    }
    client.close()
    return rides
}

exports.getRanking = async(startStation,endStation,duration)=>{
    let client = await getClient()
    const db = client.db('citiracedb')
    const collection = db.collection('rides202009')
    let ranking
    try{
        ranking = await collection.find({'start station name':startStation,'end station name':endStation,'tripduration': { $lt: duration }}).limit(2000).count()
    }catch (e) {
        console.error(e);
    }
    client.close()
    return ranking+1
}

