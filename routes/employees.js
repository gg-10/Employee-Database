const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');


// router get starts here
router.get('/', (req,res) => {
    Employee.find({})
        .then(employees => {
            res.render('index', {employees : employees});
        })
        .catch(err => {
            console.log('Error in finding Employee database documents or rendering index page')
        })
})

router.get('/employee/new', (req,res) => {
    res.render('new');
})

router.get('/employee/search', (req,res) => {
    res.render('search', {employee : "first hit"});
})

router.get('/employee', (req,res) => {
    let searchQuery = req.query.name;
    Employee.find({name : searchQuery})
        .then( employee => {
            console.log(employee);
            res.render('search', {employee : employee});
        })
        .catch( err => {
            console.log(err);
        })

})

 router.get('/edit/:id', (req,res) => {
     let searchQuery = req.params.id;
     console.log("Search Query", searchQuery);
     Employee.findOne({ _id : searchQuery})
        .then( employee => {
            console.log(employee);
            res.render('edit', {employee : employee});
        })
        .catch( (err) => {
            console.log(err);
        })
 })
 //router get stops here


// router post starts here
 router.post('/delete/:id', (req,res) => {
    let searchQuery = req.params.id;
    // console.log("Search Query", searchQuery);
    Employee.remove({ _id : searchQuery})
       .then( employee => {
           req.flash('success_msg','Employee deleted successfully');
            res.redirect('/')
       })
       .catch( (err) => {
        req.flash('error_msg','Error occured' + err);
        res.redirect('/')
       })
})

router.post('/employee/new', (req,res) => {
    // console.log("Request",req.body);
    let newEmployee = { // use 'name' of the input fields
        name : req.body.name,
        designation : req.body.designation,
        salary : req.body.salary,
    }

    Employee.create(newEmployee)
        .then(employee => {
            req.flash('success_msg','Employee created successfully');
            res.redirect('/')
        })
        .catch(err => {
            console.log(err);
        })
})

router.post('/edit/:id', (req,res) => {
    let searchQuery = req.params.id;
    Employee.updateOne({ _id : searchQuery}, {$set : {
       name : req.body.name,
       designation : req.body.designation,
       salary : req.body.salary 
    }})
       .then( employee => {
        req.flash('success_msg','Employee edited successfully');
        res.redirect('/')
       })
       .catch( (err) => {
           console.log(err);
       })
})
// router post starts here


// router put starts here

module.exports = router;