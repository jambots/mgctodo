const { MongoClient, ObjectId } = require('mongodb');
const util = require('./utilController');
const debug = require('debug')('app:toggleController');

exports.toggleSyndication = async (req, res) => {
  try {
      const { id } = req.params;
      const dbParams = await util.setupDB();
      const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      let status = (task.isUnsyndicated == 'false') ? 'true' : 'false';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isUnsyndicated: status } });
      dbParams.client.close();
      res.redirect('/');
  }
  catch (err) {debug(err);}
};
exports.approve = async (req, res) => {
  try {
      const { id } = req.params;
      const dbParams = await util.setupDB();
      const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      let status = 'true'; //(task.isComplete == 'false') ? 'true' : 'false';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isApproved: status } });
      dbParams.client.close();
      res.redirect('/');
  }
  catch (err) {debug(err);}
};
exports.unApprove = async (req, res) => {
  try {
      const { id } = req.params;
      const dbParams = await util.setupDB();
      const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      let status = 'false'; //(task.isComplete == 'false') ? 'true' : 'false';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isApproved: status } });
      dbParams.client.close();
      res.redirect('/');
  }
  catch (err) {debug(err);}
};
exports.ban = async (req, res) => {
  try {
      const { id } = req.params;
      const dbParams = await util.setupDB();
      const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      let status = 'true'; //(task.isComplete == 'false') ? 'true' : 'false';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isBaned: status } });
      dbParams.client.close();
      res.redirect('/');
  }
  catch (err) {debug(err);}
};
exports.unBan = async (req, res) => {
  try {
      const { id } = req.params;
      const dbParams = await util.setupDB();
      const task = await dbParams.collection.findOne({ _id: new ObjectId(id) });
      let status = 'false'; //(task.isComplete == 'false') ? 'true' : 'false';
      await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { isBanned: status } });
      dbParams.client.close();
      res.redirect('/');
  }
  catch (err) {debug(err);}
};
