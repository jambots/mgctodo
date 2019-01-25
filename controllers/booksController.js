const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:booksController');
const bodyParser = require("body-parser");

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */

exports.showBooks = async function (req, res) {
  res.json(req.body.hash)
  /*
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    res.json(parse(body));
  });
  */
/*
  //if(req.hash=="031987ad563836dd8339615bae2abbb3"){
    try {
      const dbParams = await util.setupDB();
      const tasks = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      const hostname = os.hostname();
      //res.send('hash ' + request.params.hash);//tasks
      res.json(tasks);//tasks
      dbParams.client.close();
    }
    catch (err) {
      debug(err);
    }
  //}else{
  //  res.json(["fail"]);
  //}
  //
  */
}
exports.postBooks = async function (req, res) {
  //res.write("Response");
    //if(params["hash"]=="031987ad563836dd8339615bae2abbb3"){
    let body = req.data;
    var params={hash:'', url:''};
/*
    req.on('data', chunk => {
        body += chunk.toString();
    });
    req.on('end', () => {
    */
      var parts=body.split('"');
      for (var p=1;p<parts.length-1; p+=2){
        var key=parts[p];
        var val="|"+parts[p+1].split("\r\n")[2]+"|";
        params[key]=val;
      }
      res.json(params);
   //});

/*
     try {
       const dbParams = await util.setupDB();
       const tasks = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
       const hostname = os.hostname();
       //res.send('hash ' + request.params.hash);//tasks
       if(params["hash"]=="031987ad563836dd8339615bae2abbb3"){
         res.json(tasks);//tasks
       }
       else{
         res.json(['no hash']);
       }
       dbParams.client.close();
     }
     catch (err) {
       debug(err);
     }
   //}
*/

}
