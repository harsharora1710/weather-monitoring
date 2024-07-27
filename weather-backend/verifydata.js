const { MongoClient } = require('mongodb');
const moment = require('moment');

const uri = 'mongodb+srv://userabc:userabc@cluster0.rwdzkix.mongodb.net/'; // replace with your MongoDB URI
const client = new MongoClient(uri);

async function verifyData() {
  try {
    await client.connect();
    const database = client.db('weather-monitoring');
    const collection = database.collection('weathers');

    const startDate = moment().subtract(7, 'days').startOf('day').toDate();
    const endDate = moment().endOf('day').toDate();

    const data = await collection.find({
      date: { $gte: startDate, $lte: endDate }
    }).toArray();

    console.log(data);
  } finally {
    await client.close();
  }
}

verifyData().catch(console.error);
