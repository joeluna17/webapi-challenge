const express = require('express');
const router = express.Router();
const projectdb = require('../data/helpers/projectModel');




router.get('/', async (req, res)=>{

    try{
        const projects = await projectdb.get()
        res.status(200).json(projects)
    }
    catch(err){
        res.status(500).json({success:false, message:err})
    }

})

router.post('/', async (req, res)=>{
    const newProject = req.body;

    try{
        const project = await projectdb.insert(newProject)
        res.status(201).json(project)
    }
    catch(err){  
      res.status(500).json({status: false, message: err})
    }

})


module.exports = router;