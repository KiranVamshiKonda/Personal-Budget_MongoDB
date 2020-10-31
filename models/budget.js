const mongoose=require("mongoose");
const budget_schema= new mongoose.Schema({
        title:{
            type:String,
            required:true,
            unique:true
        },
        budget:{
            type:Number,
            required:true
        },
        color:{
            type:String,
            required:true,
            validate: [isValid, 'Please enter color in Hexadecimal value']
            
        }
},{collection: 'test_collection'})

function isValid(s){
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(s)
}

module.exports=mongoose.model('test_collection',budget_schema)