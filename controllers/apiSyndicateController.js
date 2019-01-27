const util = require('./utilController');
const debug = require('debug')('app:apiSyndicateController');

exports.syndicateSite = async function(req, res) {
  try {
    //const siteId=req.body.siteId;
    const dbParams = await util.setupDB();
    var returnObj={headers:req.headers, body:req.body, records:[]};
    returnObj.auth=util.auth(req.body.url, req.body.time, req.body.payload, req.headers.authorization);
    if(returnObj.auth.auth==true){
      const task = req.body;
      const dbParams = await util.setupDB();
      let tasks = await dbParams.collection.find({ siteUrl: task.siteUrl }).sort({ dueDate: 1 }).toArray();
      if(tasks.length>0){
        await dbParams.collection.findOneAndUpdate({ siteUrl: task.siteUrl }, { $set: { isUnsyndicated: 'false' } });
      }
      else{
        await dbParams.collection.insertOne(task);
      }
      dbParams.client.close();

    }
    res.json(returnObj);
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
};
