const { MongoClient, ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:apiaddController');

exports.addApi = (req, res) => {
  res.render('addTask', { title: 'Adding API' });
};

exports.saveApi = async (req, res) => {
  try {
    const task = req.body;
    const dbParams = await util.setupDB();
    await dbParams.collection.insertOne(task);
    dbParams.client.close();
    res.redirect('/api/books/');
  }

  catch(err) {
    debug(err);
  }
};
