const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const collections = require('./config');
const { name } = require('ejs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false}))

app.set('view engine','ejs');
app.use(express.static("public"));

app.get('/',(req,res)=>{
res.render('login')
})

app.get('/signup',(req,res)=>{
    res.render('signup')
    })

app.post('/signup',async(req,res)=>{
    const data ={
        name: req.body.username,
        password: req.body.password
    }

    //check if the user already exists
    const userExists = await collections.findOne({name: data.name});
    if(userExists){
        res.send('User already exists');
    }else{
        //hash the password
        const salt = 10;
        data.password = await bcrypt.hash(data.password, salt);



        const userdata = await collections.insertMany(data);
        console.log(userdata);
    }

});    


//login user

app.post('/login',async(req,res)=>{
       try{
        const data ={
            name: req.body.username,
            password: req.body.password
           }
    
         const user = await collections.findOne({name: data.name});
         if(!user){
             res.send('User not found');
            }

            const match = await bcrypt.compare(data.password, user.password);
        
            if(match){
                res.render('home');
            } else{
                res.send('Incorrect password');
        }
   
    }catch{
        res.send('Server error');
    }

});


app.listen(5000,()=>{
    console.log('Server is running on port 5000');
})