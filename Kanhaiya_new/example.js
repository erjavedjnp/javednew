const nodemailer=require('nodemailer')


//step 1
    let transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'kainhaiyalal@gmail.com',
            pass:'8737046062'
        }
    });
    //step 2
    let mailOption={
        from:'kainhaiyalal@gmail.com',
        to:'makdu1998@gmail,com',
        subject:'Verify your gmail',
     text:'verify your gmail'
        
    }
//step 3
    transporter.sendMail(mailOption,(err,data)=>{
        if(err){
            console.log('Mail not Sent')
        }else{
            console.log('Mail sent!')
        }
    })




