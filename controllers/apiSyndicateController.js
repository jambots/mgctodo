const util = require('./utilController');
const debug = require('debug')('app:apiSyndicateController');

exports.syndicateSite = async function(req, res) {
  try {
    //const siteId=req.body.siteId;
    const dbParams = await util.setupDB();
    var returnObj={headers:req.headers, body:req.body, records:[]};
    returnObj.auth=util.auth(req.body.url, req.body.time, req.body.payload, req.headers.authorization);
    if(returnObj.auth.auth==true){
/*
      //const sites = await dbParams.collection.find({isUnsyndicated:'false', isBanned:'false'}).sort({ dueDate: 1 }).toArray();
      //returnObj.records=sites;

      //let status = (task.isComplete == 'false') ? 'true' : 'false';
      let status = 'true';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isUnsyndicated: status } });
      const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      returnObj.records.push(task);
*/
    }
    res.json(returnObj);
    dbParams.client.close();
  }
  catch (err) {
    debug(err);
  }
};
