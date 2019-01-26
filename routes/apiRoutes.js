let express = require('express');
let router = express.Router();

const apiaddController = require('../controllers/apiaddController');
const apideleteController = require('../controllers/apideleteController');

const apiListController = require('../controllers/apiListController');
const apiUnsyndicateController = require('../controllers/apiUnsyndicateController');

router.get('/api/apiadd/', apiaddController.addApi);
router.post('/api/apiadd/', apiaddController.saveApi);

router.post('/api/list/', apiListController.listSites);
router.post('/api/unsyndicate/:id', apiUnsyndicateController.unsyndicateSite);
module.exports = router;
