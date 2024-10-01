
import nodeMailer from 'nodemailer';

// send mail using nodemailer  
export const sendEmail = async (reciver , subject='' , message) => {
    console.log(process.env.MAIL_HOST);
    try {
        const transporter = nodeMailer.createTransport({
          host: process.env.MAIL_HOST,
          port: process.env.MAIL_PORT,
          service: process.env.MAIL_SERVICE,
          secure: false,
         auth: {
            user: process.env.MAIL_NAME,
            pass: process.env.MAIL_PASS,
          },
        }); 
      
        const mailOptions = {
          from: process.env.MAIL_NAME,
          to: reciver,
          subject: subject,
          text:message
        };
      
        await transporter.sendMail(mailOptions);
        console.log("email send");
        
       return true; 
    } catch (error) {
       console.log("email not send" , error);
      return false
    }
  };

