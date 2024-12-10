const express = require("express");
const connectDb = require("../db/db");
const router = express.Router();


router.get("/",(req,res)=>{
    const query = "select * from employees";
    connectDb.query(query,(err,result)=>{
        if(!err){
            res.json(result);
        }else{
            console.log(err);
            res.json("error");
        }
    })

});
router.post("/",(req,res)=>{
    const {name,employee_id,email,phone_number,department,date_of_joining,role} = req.body;
    const query = "insert into employees (name,employee_id,email,phone_number,department,date_of_joining,role) values(?,?,?,?,?,?,?)";
    connectDb.query(query,[name,employee_id,email,phone_number,department,date_of_joining,role],(err,result)=>{
        if(!err){
            res.json(result);
        }else{
            if(err.code=="ERR_DUP_VALUE"){
                res.json("User already exists");
            }else{
                console.log(err);
                res.json("Error");
            }
        }
    })
});
router.delete("/delete/:id",(req,res)=>{
    const query = "delete from employees where employee_id=?";
    const { id } = req.params;
    connectDb.query(query,[id],(err,result)=>{
        if(!err){
            res.json("deleted employ");
        }else{
            console.log(err);
            res.json("unable to delete user");
        }
    })
})

module.exports = router;