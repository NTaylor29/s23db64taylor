var Doctor = require('../models/doctor');
// List of all Doctors
exports.doctor_list = async function(req, res) {
    try{
    theDoctors = await Doctor.find();
    res.send(theDoctors);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
};
// VIEWS
// Handle a show all view
exports.doctor_view_all_Page = async function(req, res) {
    try{
    theDoctors = await Doctor.find();
    res.render('doctors', { title: 'Doctor Search Results', results: theDoctors });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    } 
};
// for a specific Doctor.
exports.doctor_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Doctor.findById( req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle Doctor create on POST.
exports.doctor_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Doctor();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"costume_type":"goat", "cost":12, "size":"large"}
    document.name = req.body.name;
    document.age = req.body.age;
    document.location = req.body.location;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
};
// Handle Doctor delete form on DELETE.
exports.doctor_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: Doctor delete DELETE ' + req.params.id);
};
// Handle Doctor update form on PUT.
exports.doctor_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: Doctor update PUT' + req.params.id);
};