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
    var returnObj={headers:req.headers, body:req.body, records:[], info:{}};
    returnObj.info.serverTime=serverTime;
    returnObj.info.authReturn=authReturn;

    returnObj.info.deltaSec=deltaSec;
    returnObj.info.timeMatch=false;
    if(deltaSec<60){info.returnObj.timeMatch=true;}
    returnObj.info.authMatch=false;
    if(req.headers.authorization==authReturn){returnObj.info.authMatch=true;}

    if((returnObj.info.authMatch==true)&&(returnObj.info.timeMatch==true)){
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
