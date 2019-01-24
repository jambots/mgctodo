const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:booksController');
//const { parse } = require('querystring');

exports.showBooks = async function (req, res) {

  /*
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    res.json(parse(body));
  });
  */

  //if(req.hash=="031987ad563836dd8339615bae2abbb3"){
    try {
      const dbParams = await util.setupDB();
      const tasks = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      const hostname = os.hostname();
      res.send('hash ' + request.params.hash);//tasks
      dbParams.client.close();
    }
    catch (err) {
      debug(err);
    }
  //}else{
  //  res.json(["fail"]);
  //}
  //*/
}
