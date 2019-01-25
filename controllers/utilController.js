const { MongoClient, ObjectId } = require('mongodb');
const debug = require('debug')('app:utilController');
exports.setupDB = async function () {
  const url = process.env.DB_URL;
  debug(`attempting to connect to database at ${url}`);
  const dbName = 'tasks';
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    const db = client.db(dbName);
    const collection = await db.collection('tasks');
    return ({ client: client, collection: collection })
  }

  catch (err) {
    debug(err);
  }
};
exports.rando = async function () {
    return Math.floor(100*Math.random());
};
exports.reqParams = async function (req) {
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString();
  });
  req.on('end', () => {
    var params={hash:"", url:""};
    var parts=body.split('"');
    for (var p=1;p<parts.length-1; p+=2){
      var key=parts[p];
      var val=parts[p+1].split("\r\n")[2];
      params[key]=val;
    }
    return params;
  });
}
