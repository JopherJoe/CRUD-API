const express = require("express");
const TeacherTask = require('../Task/teacher');
const router = express.Router();

//POST
router.post('/addT', async(req,res) =>{
    try {
        const teachertask = await TeacherTask.create(req.body)
        res.status(200).json(teachertask);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET
router.get('/getAllT', async (req, res) => {
    try {
        const teachertask = await TeacherTask.find();
        res.json(teachertask);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

router.get('/getMany', async(req, res) =>{
    try {
        let body =req.body;
        const teachertask = await TeacherTask.find({firstname: body.firstname});
        
        if(teachertask.length>0){
            res.status(200).json(teachertask)
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
        const teachertask = await TeacherTask.findById(studentId);
        if(!teachertask){
            return res.status(404).json({message: 'Student was not found'});
        }
        res.status(200).json(teachertask);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
  })
//UPDATE
router.put('/updateT/:id', async (req, res) => {
    try {
        const teachertask = await TeacherTask.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.json(teachertask);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
});
router.put('/findByIdAndUpdate/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const teachertask = await TeacherTask.findByIdAndUpdate(id, req.body);
        if(!teachertask){
            return res.status(404).json({message: 'NO ID'})
        }
        res.status(200).json(teachertask);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//DELETE
router.delete('/deleteT/:id', async (req, res) =>{
    try {
        const teachertask = await TeacherTask.findByIdAndRemove(req.params.id);
        res.json(teachertask);
    } catch (error) {
        res.status(404).json({ error: error.message})
    }
});

router.delete('/deleteMany', async (req, res) => {
    try {
        const body = req.body;
        const teachertask = await TeacherTask.find({ firstname: body.firstname });

        if (teachertask.length > 0) {
            const result = await TeacherTask.deleteMany({ firstname: body.firstname });
            res.send(`${result.deletedCount} record(s) deleted`);
        } else {
            res.send('No matching records found to delete');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting data');
    }
});
router.delete('/deleteAll', async (req, res) =>{
    try {
        const teachertask = await TeacherTask.deleteMany(req.params.id);
        res.json(teachertask);
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
});
module.exports = router;