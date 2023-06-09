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

// Show a specific Doctor
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

// Handle Doctor delete on DELETE.
exports.doctor_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Doctor.findByIdAndDelete( req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
   };

// Handle Doctor update form on PUT.
exports.doctor_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body ${JSON.stringify(req.body)}`)
 try {
    let toUpdate = await Doctor.findById( req.params.id)
    // Do updates of properties
    if(req.body.name) toUpdate.name = req.body.name;
    if(req.body.age) toUpdate.age = req.body.age;
    if(req.body.location) toUpdate.location = req.body.location;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
 } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
 }
};

// Handle a show one view with id specified by query
exports.doctor_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
        result = await Doctor.findById( req.query.id)
        res.render('doctordetail', { title: 'Doctor Detail', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a doctor.
// No body, no in path parameter, no query.
// Does not need to be async
exports.doctor_create_Page = function(req, res) {
    console.log("create view")
    try{
        res.render('doctorcreate', { title: 'Doctor Create'});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for updating a doctor.
// query provides the id
exports.doctor_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
        let result = await Doctor.findById(req.query.id)
        res.render('doctorupdate', { title: 'Doctor Update', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.doctor_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
        result = await Doctor.findById(req.query.id)
        res.render('doctordelete', { title: 'Doctor Delete', toShow: result });
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
   };