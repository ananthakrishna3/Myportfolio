const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 3000
const nodemailer = require("nodemailer");
const multiparty = require("multiparty");
require("dotenv").config();

app.use(express.static('./assests'))
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))


app.set('view engine','ejs')


// routes
app.get('/',(req,res)=>{
    res.render('index')
})

  

  app.post("/sendMail", (req, res) => {

    const Email = req.body.email
    const Message = req.body.message
    const Name = req.body.name

    var transporter = nodemailer.createTransport(
        {
            service:'gmail',
            auth:{
                user:"clashak1111@gmail.com",
                pass:"plvm urys uxgm qsof", 
            }
        }
    )

    console.log(
        {Email,Message,Name}
    )

    var mailOptions = {
        from:"ananthakrishna3233@gmail.com",
        to:req.body.email,
        cc: 'ananthakrishna3233@gmail.com',
        subject:'Thanks for contacting me!!' + Name,
        text:"Thanks for your message : " + Message,
    }


    transporter.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)

        }
        else{
            res.render('index')
            console.log('email sent ' + info.response)
        }
    })

  });

 
  




app.listen(PORT,()=>{
    console.log(`Server is running on port: ${PORT}`)
})