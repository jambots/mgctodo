const util = require('./utilController');
const { MongoClient } = require('mongodb');
const os = require("os");
const debug = require('debug')('app:showApiController');

exports.showApiTasks = async function (req, res) {
  try {
    const dbParams = await util.setupDB();
    const tasks = await dbParams.collection.find({}).sort({ dueDate: 1 }).toArray();
    const hostname = os.hostname();
    res.render('showApiTasks', { tasks, title: 'ToDo List', hostname });
    dbParams.client.close();
  }

  catch (err) {
    debug(err);
  }
}
