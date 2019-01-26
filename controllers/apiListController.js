const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:apiListController');
//const bodyParser = require("body-parser");
//const querystring = require('querystring');

exports.listSites = async function(req, res) {
  try {

    const dbParams = await util.setupDB();
    const sites = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
    const hostname = os.hostname();
    req.body.amazon=new Data().getTime();
    //if(req.body.hash=="031987ad563836dd8339615bae2abbb3"){
    if(req.headers.authorization=="031987ad563836dd8339615bae2abbb3"){
      res.json(req.body);//sites
    }
    else{
      res.json(req.body);
    }
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
}
