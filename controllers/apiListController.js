const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:apiListController');
//const bodyParser = require("body-parser");
//const querystring = require('querystring');

exports.listSites = async function(req, res) {
  try {
    var num=await util.rando();
    const params = await util.reqParams(req);
    
    const dbParams = await util.setupDB();
    const sites = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
    const hostname = os.hostname();
    //var params={hash:"031987ad563836dd8339615bae2abbb3", url:""};
    //console.log(params);
    //if(params.hash=="031987ad563836dd8339615bae2abbb3"){
    if(num>50){
      res.json(sites);
    }
    else{
      res.json(params);
    }

    //res.send('hash ' + request.params.hash);//tasks
    //if(params["hash"]=="031987ad563836dd8339615bae2abbb3"){
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
}
