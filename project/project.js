const express = require('express');
const router = express.Router();
const projectdb = require('../data/helpers/projectModel');




router.get('/', async (req, res)=>{

    try{
        const projects = await projectdb.get()
        res.status(200).json(projects)
    }
    catch({message}){
        res.status(500).json({success:false, message})
    }

})

router.post('/', validateBodyPost ,async (req, res)=>{
    const newProject = req.body;

    try{
        const project = await projectdb.insert(newProject)
        res.status(201).json(project)
    }
    catch({message}){  
      res.status(500).json({status: false, message})
    }
})

router.put('/:id', validateBodyPost ,validateId, async (req, res)=>{
    const {id} = req.params;
    const updatedProject = req.body;

    try{
        const project = await projectdb.update(id, updatedProject)
        res.status(200).json(project)
    }
    catch({message}){
        res.status(500).json({success: false, message})
    }
})


router.delete('/:id',validateId ,async(req, res)=>{
    const {id} = req.params;
    try{
        const deleted = await projectdb.remove(id)
        res.status(200).end(console.log(`successfully deleted ${id}`))
    }
    catch({message}){
        res.status(500).json({success: false, message})
    }
})



//middleware

async function validateId (req, res, next){
    const {id} = req.params;

    try{
        const exsistingProject = await projectdb.get(id)
        exsistingProject? next() : 
        res.status(404).json({success: false, message:"Invalid ID not found."});
       
    }
    catch({message}){
        res.status(500).json({success: false, message})
    }
}

async function validateBodyPost(req, res, next) {
    const projectInfo = req.body;

    try{
        projectInfo.name === "" || projectInfo.description === ""?
        res.status(400).json({success: false, message:"Please fill in all required fields"}):next()
    }
    catch({message}){
        res.status(500).json({success: false, message})
    }

}





module.exports = router;