var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var doctor_controller = require('../controllers/doctor');
/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// doctor ROUTES ///
// POST request for creating a doctor.
router.post('/doctors', doctor_controller.doctor_create_post);
// DELETE request to delete doctor.
router.delete('/doctors/:id', doctor_controller.doctor_delete);
// PUT request to update doctor.
router.put('/doctors/:id', doctor_controller.doctor_update_put);
// GET request for one doctor.
router.get('/doctors/:id', doctor_controller.doctor_detail);
// GET request for list of all doctor items.
router.get('/doctors', doctor_controller.doctor_list);
/* GET detail costume page */
router.get('/detail', doctor_controler.doctor_view_one_Page);
module.exports = router;