const util = require('./utilController');
const { ObjectId } = require('mongodb');
const debug = require('debug')('app:editController');

exports.editSite = async (req, res) => {
  try {
    const { id } = req.params;
    const dbParams = await util.setupDB();
    const site = await dbParams.collection.findOne({ _id: new ObjectId(id) });
    dbParams.client.close();
    res.render('editSite', { site, id, title: 'Save Changes' });
  }

  catch (err) {
    debug(err);
  }
};

exports.commitEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const site = req.body;
    const dbParams = await util.setupDB();
    await dbParams.collection.findOneAndUpdate({ _id: new ObjectId(id) }, site);
    dbParams.client.close();
    res.json(site);
    //res.redirect('/');
  }

  catch (err) {
    debug(err);
  }
};
