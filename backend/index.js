require("dotenv").config();


const config = require("./config.json");
const mongoose = require("mongoose");
// const { ObjectId } = require('mongodb'); // or use mongoose.Types.ObjectId if using Mongoose



mongoose.connect(config.connectionString);

const User = require('./models/user.model');
const Note = require('./models/note.model');

const express = require('express');
const cors = require('cors');
const app = express();

const jwt = require('jsonwebtoken');
const {authenticateToken} = require('./utilities');

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get('/',(req,res) => {
    res.json({data:"hello"});
});

//CREATE ACCOUNT 
app.post("/create-account", async (req, res) => {

    const { fullName, email, password} = req.body;

    if(!fullName) {
        return res
        .status(400)
        .json({error:true, message:"Full Name is required"})
    }
    if(!email) {
        return res
        .status(400)
        .json({error:true, message:"email is required"})
    }
    if(!password) {
        return res
        .status(400)
        .json({error:true, message:"password is required"})
    }
    const isUser = await User.findOne({'email':email});
    if(isUser) {
        return res.json({
            error:true,
            message:"User already exist",
        });
    }
    const user = new User({
        fullName,
        email,
        password,
    });
    await user.save();

    const accessToken = jwt.sign({user},process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "3600m",
    });

    return res.json({
        error: false,
        user,
        accessToken,
        message:"Registeraton Successful",
    })

});
// Login To an Exist Account 
app.post("/login", async (req,res) => {
    const{email,password} = req.body;
    if(!email){
        return res
        .status(400)
        .json({error:true,message:"email is required",});
    }
    if(!password){
        return res
        .status(400)
        .json({error:true,message:"password is required"});
    }
    const userInfo= await User.findOne({email: email});
    if(!userInfo) {
        return res.status(400).json({message:"no user with these credentials"});
    }

    if(userInfo.email==email && userInfo.password==password){
        const user = {user: userInfo };
        const accessToken = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
            expiresIn: "3600m",
        });
        return res.json({
            error:false,
            message:"Login Successful",
            email,
            accessToken,
        });
    } else {
        return res.status(400).json({
            error:true,
            message:"Email Or Password is Not Valid",
        })
    }
});

// ADD A NEW NOTE
app.post('/add-note',authenticateToken,async (req,res) => {

    const {title, content, tags } = req.body;
    const {user} = req.user;

    if(!title) {
        return res.status(400).json({error:true,message:"title is required"});
    }

    if(!content) {
        return res.status(400).json({error:true,message:"Content is Required"});

    }

    try{
        const note = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });
        await note.save();
        return res.json({
            error:false,
            note,
            message: "Note added successfully",
        });
    } catch (error) {
        return res.status(500).json({
            error:true,
            message:"Internal Server Error",
        });
    }
});

// EDIT AN EXIST NOTE 
app.put('/edit-note/:noteId',authenticateToken,async (req,res) => {

    const { noteId } = req.params;
    const {title, content, tags, isPinned} = req.body;
    const { user } = req.user;

    if(!title && !content && !tags) {
        return res.status(400)
        .json({error:true,message:"No Changes Provided !"});
    }

    try{
        const note = await Note.findOne({ _id: noteId,userId:user._id});
        if (!note) {
            return res.status(404)
            .json({error:true,message:"note Not Found ! "});
        }

        if (title) note.title = title;
        if (content) note.content = content;
        if (tags) note.tags = tags;
        if (isPinned) note.isPinned = isPinned;

        await note.save()
        return res.status(200).json({
            error:false,
            note,
            message:"Note Updated Successfully"
        });
    }catch(error){
        // console.log(error)
        return res.status(500)
        .json({error:true,message:"Internal Server Error"});
    }


});

// GET ALL NOTES 
app.get('/get-all-notes',authenticateToken, async(req,res) => {

    const { user } = req.user;

    try{
    const notes = await Note.find({userId:user._id}).sort({isPinned:-1})
    ;

    return res.status(200).json({error:false,notes,message:"All Notes retrieved successfully !"});

    }catch(error){
    return res.status(500).json({error:true,message:"Internal Server ERROR !"});
    }

    
});

app.listen(8000);

module.exports=app;