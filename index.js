var express=require('express');
var mongoose=require('mongoose');
var app=express();
var cors=require('cors')
app.use(cors())
app.use(express.json())
app.get('/',(req,res)=>{res.send("welcome")})
app.listen(8080,()=>{console.log("SERVER CONNECTED")})
mongoose.connect('mongodb+srv://Lalith:lalith@cluster0.waohs.mongodb.net/bank').then(()=>{console.log("DB CONNECTED")})
let data=new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    amount:Number
})

let Data=mongoose.model("test",data)

// let data1= new Data({
//     name:"Lalith",
//     email:"lalithsv007@gmail.com",
//     password:"12345",
//     amount:1100
// })
// data1.save()

//API FOR FETCHING THE DATA

app.get('/data',(req,res)=>(Data.find().then((item)=>res.send(item))))

//API FOR CREATING DATA
app.post('/create',(req,res)=>(Data.create(req.body).then((item)=>res.send(item))))

// API FOR UPDATING DATA
app.put('/update/:id', (req, res) => {
    Data.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(item => res.send(item));
});     

// API FOR DELETING DATA
app.delete('/delete/:id', (req, res) => {
    Data.findByIdAndDelete(req.params.id)
        .then(() => res.send({ message: 'Deleted successfully' }));
});