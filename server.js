const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const mongoose = require("mongoose");
const budget_exp=require("./models/budget");


let url = 'mongodb://localhost:27017/testing_mongo';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>{
            console.log("Successfully connected to the database");
        })
        .catch((connectionError)=>{
            console.log(connectionError)
        })

        
mongoose.set('useCreateIndex', true);
app.use('',express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/budget', async (req, res) => {
    try{
        const budget_data = await budget_exp.find();
        res.send(budget_data);
    }
    catch(exception){
        console.log("error");
    }
});

app.post('/addDoc', async (req, res) => {
    const budget_data = new budget_exp({title: req.body.title, budget: req.body.budget, color: req.body.color}); 
    
    const budget_dataSaved = await budget_data.save();
    res.send(budget_dataSaved);
    
    
});

app.listen(port, ()=>{
    console.log(`API served at http://localhost:${port}`);
}); 