const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:booksController');


exports.showBooks = async function (req, res) {
  if(req.hash=="031987ad563836dd8339615bae2abbb3"){
    try {
      const dbParams = await util.setupDB();
      const tasks = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      const hostname = os.hostname();
      res.json(tasks);
      dbParams.client.close();
    }
    catch (err) {
      debug(err);
    }
  }else{
    debug("inathentic");
  }
}
