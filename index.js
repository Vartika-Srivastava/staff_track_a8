
if(process.env.NODE_ENV !== 'prodection'){
    require('dotenv').config();
}

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const User=require('./models/user');
const methodOverride=require('method-override');
// const seedDB = require('./seed')

// Sendgrid api
// const sgMail=require('@sendgrid/mail');
// sgMail.setApiKey(process.env.sg_API);

// Twilio sms
const client = require('twilio')(process.env.twilio_id, process.env.twilio_API);



mongoose.connect(process.env.mongo_url)
.then(()=>{
    console.log("DB CONNECTED")
})
.catch((er)=>{
    console.log(er)
})

// seedDB();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname,'public')))

// app.get('/',(req,res)=>{
//     res.send("connected");
// })

app.get('/',async (req,res)=>{
    const user = await User.find({});
    res.render('index',{user});
})
app.get('/home/enter',(req,res)=>{
    res.render('enter');
})
app.post('/home',async(req,res)=>{
    const {name,email,phone,cinh,cinm}=req.body;
    sendEnter(email,cinh,cinm,phone);
    await User.create({name,email,phone,cinh,cinm});
    res.redirect('/home');
})
app.get('/home/:id',async(req,res)=>{
    const {id}=req.params;
    const u=await User.findById(id);
    res.render('exit',{u});
})

app.put('/home/:id',async(req,res)=>{
    const {id}=req.params;
    const {couth,coutm}=req.body;
    const outh=couth;
    const outm=coutm;
    const u=await User.findById(id)
    sendExit(u.email,outh,outm,u.phone)
    await User.findByIdAndUpdate(id,{$set:{inOffice:"false",couth:outh,coutm,outm}});
    res.redirect('/home');
})
app.delete('/home/:id',async (req,res)=>{
    const {id}=req.params;
    await User.findByIdAndDelete(id);
    res.redirect('/home');
})




// sendgrid mail
function sendEnter(email,cinh,cinm,phone){
    const sgMail=require('@sendgrid/mail');
    sgMail.setApiKey(process.env.sg_API);
    let min=cinm.toString();
    let hr=cinh.toString();
    let ph = parseInt(phone); 
    if(cinm<=9){
        min='0'+cinm.toString();
    }
    if(cinh<=9){
        hr='0'+cinh.toString();
    }
    //   sendgrid
    const message={
        to: email,
        from: 'vartika1382.cse19@chitkara.edu.in',
        subject:"Check in",
        text:`Hi you entered the Office at ${hr}:${min}` ,
        html: `<h1>Hi you entered the office at ${hr}:${min}</h1>`
    }
    sgMail.send(message)
    .then(() => {
        console.log('Email succesfully sent.')
    })
    .catch((err) => {
        console.log(err)
    })

    //   twilio
        client.messages.create({
            body: `Hi you entered the Office at ${hr}:${min}`,
            to: ph,
            from: '+12055760211'
        })
        .then(message => console.log('SMS sent'))
        .catch(err => console.log(err.response.data))
}


function sendExit(email,couth,coutm,phone){
    const sgMail=require('@sendgrid/mail');
    sgMail.setApiKey(process.env.sg_API);
    let min=coutm.toString();
    let hr=couth.toString();
    let ph = parseInt(phone);
    if(coutm<=9){
        min='0'+coutm.toString();
    }
    if(couth<=9){
        hr='0'+couth.toString()
    }
    const message={
        to: email,
        from: 'vartika1382.cse19@chitkara.edu.in',
        subject: "Checking out",
        text:`Hi you left the office at ${hr}:${min}`,
        html: `<h1>Hi you left the office at ${hr}:${min}</h1>`
    };
    sgMail.send(message)
    .then(() => {
        console.log('Email succesfully sent.')
    })
    .catch((err) => {
        console.log(err)
    })
    //   twilio sms
        client.messages.create({
            body: `Hi you left the office at ${hr}:${min}`,
            to: ph,
            from: '+12055760211'
        })
        .then(message => console.log('SMS sent'))
        .catch(error => console.log('SMS not sent'))
}


app.listen(process.env.PORT || 2323,(req,res)=>{
    console.log("UP AT 2323");
})







// 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
// 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