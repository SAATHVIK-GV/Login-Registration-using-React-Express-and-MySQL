const express = require("express");
const app = express();
const port = 3001;
const bodyParser = require('body-parser');
const { url } = require("inspector");
const employRoute = require("./routes/employ");
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const cors = require("cors");


app.use(cors());
app.use(express.json());
app.use(bodyParser(url));
app.use("/employs",employRoute);
app.use("/auth/register",registerRoute);
app.use("/auth/login",loginRoute);


app.get("/",(req,res)=>{
    res.json("helloo");
})
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})