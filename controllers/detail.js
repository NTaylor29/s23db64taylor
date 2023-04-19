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