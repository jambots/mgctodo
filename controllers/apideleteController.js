const { ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:apideleteController');


exports.confirmDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
    //let status = (task.isComplete == 'false') ? 'true' : 'false';
    let status = 'false';
    await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isComplete: status } });
    dbParams.client.close();
    res.redirect('/api/books');

    /*don't delete
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const task = await dbParams.collection.deleteOne({ _id: new ObjectId(id) });
    const tasks = await dbParams.collection.find({}).sort({ dueDate: 1 }).toArray();
    dbParams.client.close();
    res.redirect('/api/books/');
    */
  }

  catch (err) {
    debug(err);
  };
};
