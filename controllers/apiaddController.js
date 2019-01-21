const { MongoClient, ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:apiaddController');

exports.addApi = (req, res) => {
  res.render('addTask', { title: 'Adding API' });
};

exports.saveApi = async (req, res) => {
  try {////
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const tasks = await dbParams.collection.find({ _id: new ObjectId(id) }).sort({ dueDate: 1 }).toArray();
    if(tasks.length>0){
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isComplete: status } });
    }
    else{
      const task = req.body;
      await dbParams.collection.insertOne(task);      
    }
    dbParams.client.close();
    res.redirect('/api/books');
// get false isComplete   const tasks = await dbParams.collection.find({isComplete:'false'}).sort({ dueDate: 1 }).toArray();
  }

  catch(err) {
    debug(err);
  }
};
