const { ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:deleteController');


exports.confirmDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const task = await dbParams.collection.deleteOne({ _id: new ObjectId(id) });
    const tasks = await dbParams.collection.find({}).sort({ dueDate: 1 }).toArray();
    dbParams.client.close();
    res.redirect('/api/books/');
  }

  catch (err) {
    debug(err);
  };
};
