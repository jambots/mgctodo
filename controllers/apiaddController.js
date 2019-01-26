const { MongoClient, ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:apiaddController');

exports.addApi = (req, res) => {
  res.render('addTask', { title: 'Adding API' });
};

exports.saveApi = async (req, res) => {
  //if(req.hash=="031987ad563836dd8339615bae2abbb3"){
    try {////
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
      res.json(tasks);
  // get false isComplete   const tasks = await dbParams.collection.find({isComplete:'false'}).sort({ dueDate: 1 }).toArray();
    }

    catch(err) {
      debug(err);
    }

  //}else{
  //  debug("inauthentic");
  //}
};
