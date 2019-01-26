const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:apiListController');

exports.listSites = async function(req, res) {
  try {
    const dbParams = await util.setupDB();
    const hostname = os.hostname();
    var returnObj={headers:req.headers, body:req.body, records:[]};
    returnObj.auth=util.auth(req.body.url, req.body.time, req.body.payload, req.headers.authorization);
    if(returnObj.auth.auth==true){
      const sites = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      returnObj.records=sites;
    }
    res.json(returnObj);
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
}
exports.foo = async (req, res) => {
  try {
    const dbParams = await util.setupDB();
    const hostname = os.hostname();
    var returnObj={headers:req.headers, body:req.body, records:[]};
    returnObj.auth=util.auth(req.body.url, req.body.time, req.body.payload, req.headers.authorization);
    if(returnObj.auth.auth==true){
      const sites = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      returnObj.records=sites;
    }
    res.json(returnObj);
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
/*
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    var returnObj={headers:req.headers, body:req.body, records:[]};
    returnObj.auth=util.auth(req.body.url, req.body.time, req.body.payload, req.headers.authorization);
    if(returnObj.auth.auth==true){
      const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      let status = 'true';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isUnsyndicated: status } });
    }
    //res.redirect('/api/list/');
    res.json(returnObj);
    dbParams.client.close();
  }

  catch (err) {
    debug(err);
  };
  */
  //res.json(['unsyndicate']);
};
