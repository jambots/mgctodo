let express = require('express');
let router = express.Router();

const booksController = require('../controllers/booksController');
const apiaddController = require('../controllers/apiaddController');
const deleteController = require('../controllers/apideleteController');

/*
const showController = require('../controllers/showController');
const addController = require('../controllers/addcontroller');
const editController = require('../controllers/editController');
const deleteController = require('../controllers/deletecontroller');
const completeController = require('../controllers/completeController');

router.post('/task/complete/:id', completeController.commitComplete);
router.get('/task/delete/:id', deleteController.deleteTask);
router.post('/task/delete/:id', deleteController.confirmDelete);
router.get('/task/edit/:id', editController.editTask);
router.post('/task/edit/:id', editController.commitEdit);
router.get('/task/add/', addController.addTask);
router.post('/task/add/', addController.saveTask);
router.get('/', showController.showTasks);
*/
router.get('/api/books/', booksController.showBooks);
router.get('/api/apiadd/', apiaddController.addApi);
router.post('/api/apiadd/', apiaddController.saveApi);
router.post('/api/apidelete/:id', apideleteController.confirmDelete);

module.exports = router;