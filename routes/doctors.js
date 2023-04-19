var express = require('express');
const doctor_controlers= require('../controllers/doctor');
var router = express.Router();

/* GET home page. */
router.get('/', doctor_controlers.doctor_view_all_Page );
/* GET detail doctor page */
router.get('/detail', doctor_controlers.doctor_view_one_Page);
/* GET create doctor page */
router.get('/create', doctor_controlers.doctor_create_Page);
/* GET create update page */
router.get('/update', doctor_controlers.doctor_update_Page);
/* GET delete doctor page */
router.get('/delete', doctor_controlers.doctor_delete_Page);
module.exports = router;