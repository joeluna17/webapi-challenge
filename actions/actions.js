const express = require('express');
const router = express.Router();
const projectdb = require('../data/helpers/projectModel');
const actionsdb = require('../data/helpers/actionModel');

router.get('/:id', validateId ,async (req, res)=>{
    const {id} = req.params;

    try{  
        const actions = await projectdb.getProjectActions(id)
        res.status(200).json(actions)
        console.log(new Date().toISOString())
    }

    catch({message}){
        console.log("I'm here")
        res.status(500).json({success: false, message})
    }

})


router.post('/:id', validateId, validateBodyPost , async (req, res)=>{
    const {id} = req.params;
    const newAction = req.body;


    try{
        const addedAction = await actionsdb.insert(newAction)
        res.status(200).json(addedAction)
    }

    catch({message}){
        res.status(500).json({success: false, message})
    }

})


router.put('/:id/:actionid', validateId, validateBodyPost ,async (req, res)=>{
    const {actionid} = req.params;
    const updatedAction = req.body;

    try{
        const action = await actionsdb.update(actionid, updatedAction)
        res.status(200).json(action)
    }

    catch({message}){
        res.status(500).json({success: false, message})
    }

})


router.delete('/:id/:actionid', validateId ,async (req, res)=>{
    const {actionid} = req.params;

    try{
        const deleted = await actionsdb.remove(actionid)
        res.status(200).json(console.log(`The action with id ${actionid} was deleted successfully`))
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
    const actionsInfo = req.body;

    try{
        actionsInfo.description === "" || actionsInfo.notes === ""?
        res.status(400).json({success: false, message:"Please fill in all required fields"}):next()
    }
    catch({message}){
        res.status(500).json({success: false, message})
    }

}













module.exports = router;