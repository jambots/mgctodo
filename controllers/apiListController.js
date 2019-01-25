const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:apiListController');
const bodyParser = require("body-parser");


exports.listSites = async function(req, res) {
  try {
    const dbParams = await util.setupDB();
    const sites = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
    const hostname = os.hostname();
    const params = await myfunction(req);
    if(params.hash=="031987ad563836dd8339615bae2abbb3"){
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
exports.myFunction = async function(req) {
//const myFunction=asynch function(req){
  console.log('myFunction');
  var params={hash:"031987ad563836dd8339615bae2abbb3", url:""};
  return params;
}
/*
  var params={hash:"", url:""};
  let body = '';
  req.on('data', chunk => {
      body += chunk.toString();
  });
  req.on('end', () => {
    var parts=body.split('"');
    for (var p=1;p<parts.length-1; p+=2){
      var key=parts[p];
      var val=parts[p+1].split("\r\n")[2];
      params[key]=val;
    }
  });
  return params;
}
*/
