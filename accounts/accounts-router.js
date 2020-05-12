const express = require("express");

const db = require("../data/dbConfig");

const router = express.Router();

router.get("/", (req,res) => {
    db.select("*")
    .from("accounts")
    .then(accounts => {
        res.status(200).json({data: accounts})
    })
    .catch(err =>{
        res.status(500).json({error: "There was a database error fetching accounts"})
    })
})

router.get("/:id", (req,res) => {
    db.select("*")
    .from("accounts")
    .where({id:req.params.id})
    .then(account => {
        res.status(200).json({data: account})
    })
    .catch(err =>{
        res.status(500).json({error: "There was a database error fetching that account"})
    })
})

router.post("/",validateAccount,(req,res)=>{
    db("accounts")
    .insert(req.body)
    .then(id => res.status(200).json({id:id}))
    .catch(err =>{
        res.status(500).json({error: "There was a database error adding that account"})
    })
})

router.put("/:id",(req,res)=>{
    db("accounts")
    .where({id:req.params.id})
    .update({name:req.body.name,budget:req.body.budget})
    .then(updated => {
        res.status(201).json({message: `Updated account ${req.params.id}`})
    })
    .catch(()=>{
        res.status(500).json({error: "There was a database error updating that account"})
    })
})

router.delete("/:id",(req,res)=>{
    db("accounts")
    .where({id:req.params.id})
    .del()
    .then((del)=>{
        res.status(200).json({message: "Account deleted successfully"})
    }).catch(()=>{
        res.status(500).json({error: "There was a database error deleting that account"})
    })
})

function validateAccount (req, res, next) {
    if (req.body.name && req.body.budget) {
        next();
    } else {
        res.status(400).json({message: "Please include a name and budget in the body of your request."})
    }
}


module.exports = router;