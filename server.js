const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Login = require('./Model/loginModel');
const app = express()

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/login', async(req, res) => {
    try {
        console.log(req.body);
        const login = await Login.find({});
        res.status(200).json(login);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get('/login/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const login= await Login.findById(id);
        res.status(200).json(login);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.post('/login', async(req, res) => {
    try {
        console.log("req.body:",req.body);
        const login = await Login.create(req.body)
        res.status(200).json(login);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/login/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const login = await Login.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!login){
            return res.status(404).json({message: `cannot find any form with ID ${id}`})
        }
        const updatedLogin = await Login.findById(id);
        res.status(200).json(updatedLogin);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product

app.delete('/login/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const login = await Login.findByIdAndDelete(id);
        if(!login){
            return res.status(404).json({message: `cannot find any form with ID ${id}`})
        }
        res.status(200).json(login);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

mongoose.set("strictQuery", false)
mongoose.connect('mongodb+srv://patil:0987654321@cluster0.ellsl9j.mongodb.net/Login_api?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, ()=> {
        console.log(`Node API app is running on port 3000`)
    });
}).catch((error) => {
    console.log(error)
})