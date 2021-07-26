const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require ("body-parser");
var Schema = mongoose.Schema;

app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb+srv://123:123@cluster1.yeojp.mongodb.net/koi",{ useUnifiedTopology: true , useCreateIndex: true, useNewUrlParser: true })

var pesanscema = new mongoose.Schema({
    name: String,
    emails: String,
    subject: String,
    message: String,

});
var pesan = mongoose.model ('pesan', pesanscema );

var notesSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    address: String,
    address2: String,
    country: String,
    state: String,
    zip: String,
    jenisIkan: String,
    jumlahIkan: String,
    paymentMethod: String,
    ccName: String,
    ccNumber: String,
    ccExpiration: String,
    ccCvv: String,

});
var pemesanan = mongoose.model ('pemesanan', notesSchema);

mongoose.connection.once("open", function(){
    console.log("connection made");
}).on("error", function(error){
    console.log("is error", error);
});

app.use(express.static(__dirname,));

app.get("/pesan", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/pesan", (req, res)=>{
    var info= {
        name: req.body.name,
        emails: req.body.emails,
        subject: req.body.subject,
        message: req.body.message,
    };
    var im = new pesan (info);
    im.save (function(err){
        if(err){
            console.log('error');
        } else{
            console.log('done');
        }
    });
    res.send('<p style="text-align:center;">Pesan Terkirim</p>');
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res)=>{
    var info={
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        address: req.body.address,
        address2: req.body.address2,
        country: req.body.country,
        state: req.body.state,
        zip: req.body.zip,
        jenisIkan: req.body.jenisIkan,
        jumlahIkan: req.body.jumlahIkan,
        paymentMethod: req.body.paymentMethod,
        ccName: req.body.Name,
        ccNumber: req.body.ccNumber,
        ccExpiration: req.body.ccExpiration,
        ccCvv: req.body.ccCvv,
    };
    var me = new pemesanan (info);
    me.save (function(err){
        if(err){
            console.log('error');
        } else{
            console.log('done');
        }
    });
    res.sendFile(__dirname + "/Thankyou.html");
});
app.listen(process.env.PORT || 8080, function(){
    console.log("server is running on 8080");
})