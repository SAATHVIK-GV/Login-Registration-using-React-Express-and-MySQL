const express = require("express");
const router = express.Router();
const connectDb = require("../db/db");
const jwt = require("jsonwebtoken");

router.post("/",(req,res)=>{
    const {email,password} = req.body;
    const query = "select * from users where email=?";
    connectDb.query(query,[email],(err,results)=>{
        if (err) {
            return res.status(500).send({ message: "Error in database" });
        }
        if (results.length > 0 && results[0].password == password) {
            const payload = { id: results[0].id, username: results[0].username };
            const token = jwt.sign(payload, "randomkey", { expiresIn: "3h" });
            return res.status(200).json({ message: "success login", token });
        } else {
            return res.status(401).json({ message: "wrong password" });
        }
    })
})

const verifyToken= (req,res,next)=>{
    const token = req.headers['authorization'].split(' ')[1];
    if(!token){
        res.status(401).json({"message":"user not valid"});
    }const decoded = jwt.decode(token,"randomkey");
    req.userId = decoded.id;
    next();
}

router.get("/home",verifyToken,(req,res)=>{
    const query = "select * from users where id=?";
    connectDb.query(query,req.userId,(error,results)=>{
        if(results.length==0){
            res.status(401).json({"message":"no user found"});
        }else{
            res.status(200).json({"message":"valid user"});
        }
    });
})


module.exports = router;