import data from './data';
import express from 'express';
import mongoose from 'mongoose';
import router from './routes/UserRoutes';
import bodyParser from 'body-parser';
let server = express(); 
const MONGO_URL = "mongodb://localhost/healthy";
try {
   const database = mongoose.connect(MONGO_URL, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true
    })
    if (database){
        console.log("database connected successfully");    }
}catch(error){
    console.log(error.reason)
}

server.use(bodyParser.json())
server.use("/users", router)
server.post("/api/products", (req, res)=> {
    res.send("wonderfully made")
    res.send(data.products);
});
server.get("/api/products/:id", (req, res)=> {
    // res.send("wonderfully made")
    // console.log(req.params.id);
    const productId = req.params.id;
    var product = data.products.find(x=>x._id === productId)
    if (product){
    res.send(product);
    // res.send("wonderfully made")

    console.log(product)
    }
    else {
        res.status(404).send({msg:"product Not found"})
        console.log("part of the else")
    }
});

server.listen("5000", ()=>{
    console.log("server connected successfully");
})