let express = require('express');
let router = express.Router();

const apiaddController = require('../controllers/apiaddController');
const apideleteController = require('../controllers/apideleteController');

const apiListController = require('../controllers/apiListController');
const apiUnsyndicateController = require('../controllers/apiUnsyndicateController');
const apiSyndicateController = require('../controllers/apiSyndicateController');

router.post('/api/apiadd/', apiaddController.saveApi);//saveSelf

router.post('/api/list/', apiListController.listSites);
router.post('/api/unsyndicate/:id', apiUnsyndicateController.unsyndicateSite);
router.post('/api/syndicate/', apiSyndicateController.syndicateSite);
module.exports = router;
