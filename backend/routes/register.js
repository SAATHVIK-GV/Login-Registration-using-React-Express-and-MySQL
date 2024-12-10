const express = require("express");
const router = express.Router();
const connectDb = require("../db/db");


router.post("/",(req,res)=>{
    const {email,password,username} = req.body;
    const queryEmail = `SELECT id FROM users WHERE email = ?`;
    const queryUsername = `SELECT id FROM users WHERE username = ?`;
    let emailExists = false;
    let usernameExists = false;
    connectDb.query(queryEmail, [email], (err, emailResults) => {
        if (err) {
            console.error('Error querying database for email:', err);
            return res.status(500).json({ message: 'Database error.' });
        }
        emailExists = emailResults.length > 0;
        connectDb.query(queryUsername, [username], (err, usernameResults) => {
            if (err) {
                console.error('Error querying database for username:', err);
                return res.status(500).json({ message: 'Database error.' });
            }
            usernameExists = usernameResults.length > 0;
            if(usernameExists || emailExists){
            return res.status(401).json({
                emailExists,
                usernameExists,
                message: emailExists && usernameExists
                    ? 'Both email and username already exist.'
                    : emailExists
                    ? 'Email already exists.'
                    : usernameExists
                    ? 'Username already exists.'
                    : 'Email and username are available.'
            });}
            const query = "insert into users(email,password,username) values(?,?,?)";
            connectDb.query(query,[email,password,username],(errooor,results)=>{
                if(errooor){
                    console.error('Error inserting user into database:',errooor);
                }else{
                    res.status(200).json({message:"user created succesfully"});
                }
            })
        });
    });
})

module.exports = router;
