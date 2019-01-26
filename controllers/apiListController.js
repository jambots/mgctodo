const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:apiListController');
const md5 = require('md5');

//const bodyParser = require("body-parser");
//const querystring = require('querystring');

exports.listSites = async function(req, res) {
  try {

    const dbParams = await util.setupDB();
    const hostname = os.hostname();
    const secret="031987ad563836dd8339615bae2abbb3";
    const serverTime=Math.floor(new Date().getTime()/1000);
    const deltaSec=Math.abs(Number(req.body.time)-serverTime);
    let authString=req.body.url+req.body.time+secret+req.body.payload;
    let authReturn=md5(authString);
    //res.json({sent:req.headers.authorization, returned:authReturn});
    var returnObj=req.headers;
    var returnObj.sentUrl=req.body.url;
    var returnObj.sentTime=req.body.time;
    var returnObj.authReturn=authReturn;

    returnObj.timeMatch=false;
    if(deltaSec<60){returnObj.timeMatch=true;}
    returnObj.urlMatch=false;
    if(req.headers.host==req.body.url){returnObj.urlMatch=true;}
    returnObj.authMatch=false;
    if(req.headers.authorization==authReturn){authMatch=true;}
    returnObj.records=[];
    if((returnObj.urlMatch==true)&&(returnObj.authMatch==true)&&(returnObj.timeMatch==true)){
      const sites = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      returnObj.records=sites;
    }
    res.json(returnObj);
    /*
      res.json(req.body);
    }

    */
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
}
