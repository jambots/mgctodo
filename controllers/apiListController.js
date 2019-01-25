const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:apiListController');
const bodyParser = require("body-parser");


exports.listSites = async function (req, res) {
  //res.write("Response");
    //if(params["hash"]=="031987ad563836dd8339615bae2abbb3"){
    try {
      const dbParams = await util.setupDB();
      const tasks = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      const hostname = os.hostname();
      //res.send('hash ' + request.params.hash);//tasks
      //if(params["hash"]=="031987ad563836dd8339615bae2abbb3"){
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
        if(params.hash=="031987ad563836dd8339615bae2abbb3"){
          res.json(tasks);
        }
        else{
          res.json(params);
        }
     });
      dbParams.client.close();
    }
    catch (err) {
      debug(err);
    }

}
