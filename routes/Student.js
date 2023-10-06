const express = require("express");
const Task = require('../Task/student');
const router = express.Router();

//POST
router.post('/add', async(req, res) =>{
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET
router.get('/getAll', async(req, res) => {
    try {
      const students = await Task.find({});
      res.status(200).json(students)
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  });
  
  router.get('/getMany', async(req, res) =>{
    try {
        let body =req.body;
        const student = await Task.find({firstname: body.firstname});
        
        if(student.length>0){
            res.status(200).json(student)
        }else{
            res.send('No records found');
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  });
  router.get('/findById/:id', async(req,res) =>{
    try {
        const studentId = req.params.id;
        const student = await Task.findById(studentId);
        if(!student){
            return res.status(404).json({message: 'Student was not found'});
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  });

//UPDATE
router.put('/update/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.json(task);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});
router.put('/findByIdAndUpdate/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const student = await Task.findByIdAndUpdate(id, req.body);
        if(!student){
            return res.status(404).json({message: 'NO ID'})
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//DELETE
router.delete('/delete/:id', async (req, res) =>{
    try {
        const task = await Task.findByIdAndRemove(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
});
router.delete('/deleteMany', async (req, res) => {
    try {
        const body = req.body;
        const students = await Task.find({ firstname: body.firstname });

        if (students.length > 0) {
            const result = await Task.deleteMany({ firstname: body.firstname });
            res.send(`${result.deletedCount} record(s) deleted`);
        } else {
            res.send('No match');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting data');
    }
});
router.delete('/deleteAll', async (req, res) =>{
    try {
        const task = await Task.deleteMany(req.params.id);
        res.json(task);
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
});



module.exports = router;