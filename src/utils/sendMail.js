import nodeMailer from 'nodemailer';

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


// send mail using nodemailer  
export const sendEmail = async (receiver, subject = '', message, buttonText = "Write Prompt", buttonUrl = process.env.PRODUCTION_URL) => {
  console.log(process.env.MAIL_HOST);
  try {
    // HTML email template with dynamic message and button
    const htmlTemplate = `
          <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4; border-radius: 8px;">
            <div style="text-align: center; padding: 10px 0;">
              <img src="https://res.cloudinary.com/dab0ekhmy/image/upload/v1727896191/thik-ai/m4edgpbovwz7efpt9xxp.png" style="width: 100px; margin-bottom: 10px;" />
              <h2 style="color: #333;">Welcome to thinkCraft.ai</h2>
            </div>
            <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <p style="font-size: 16px; color: #333;">
                Hello 👋, <br><br>
                ${message}
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${buttonUrl}" style="text-decoration: none;">
                  <button style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
                    ${buttonText}
                  </button>
                </a>
              </div>
            </div>
            <div style="text-align: center; padding: 20px 0;">
              <p style="font-size: 12px; color: #999;">If you did not request this email, please ignore it.</p>
              <p style="font-size: 12px; color: #999;">&copy; 2024 ThinkCraft.ai. All rights reserved.</p>
              <div style="margin: 10px 0;">
                <a href="https://github.com/Sombhu2022" style="text-decoration: none; margin: 0 10px;">
                  <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style="width: 24px; height: 24px;">
                </a>
                <a href="https://www.linkedin.com/in/sombhu-das-21176823a/" style="text-decoration: none; margin: 0 10px;">
                  <img src="https://cdn-icons-png.flaticon.com/512/61/61109.png" alt="LinkedIn" style="width: 24px; height: 24px;">
                </a>
              </div>
            </div>
          </div>
        `;

    const mailOptions = {
      from: `thinkCraft.ai <${process.env.MAIL_NAME}>`,
      to: receiver,
      subject: subject || 'Notification from ThinkCraft.ai',
      html: htmlTemplate, // Use the HTML template here
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent");
    return true;
  } catch (error) {
    console.log("Email not sent", error);
    return false;
  }
};


const htmlTemplateForEmailVerification = (verificationLink) => {
  return `
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif; background-color: #f4f4f4; border-radius: 8px;">
      <div style="text-align: center; padding: 10px 0;">
        <img src="https://res.cloudinary.com/dab0ekhmy/image/upload/v1727896191/thik-ai/m4edgpbovwz7efpt9xxp.png" style="width: 100px; margin-bottom: 10px;" />
        <h2 style="color: #333;">Welcome to ThinkCraft.ai</h2>
      </div>
      <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; color: #333;">
          Hello 👋, <br><br>
          Please verify your email address to complete your profile with ThinkCraft.ai. <br><br>
          Click the button below to verify your email and activate your account:
        </p>
        <div style="text-align: center; margin: 20px 0;">
          <a href="${verificationLink}" style="text-decoration: none;">
            <button style="padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; font-size: 16px; cursor: pointer;">
              Verify Email
            </button>
          </a>
        </div>
      </div>
      <div style="text-align: center; padding: 20px 0;">
        <p style="font-size: 12px; color: #999;">If you did not request this email, please ignore it.</p>
        <p style="font-size: 12px; color: #999;">&copy; 2024 ThinkCraft.ai. All rights reserved.</p>
        <div style="margin: 10px 0;">
          <a href="https://github.com/Sombhu2022" style="text-decoration: none; margin: 0 10px;">
            <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style="width: 24px; height: 24px;">
          </a>
          <a href="https://www.linkedin.com/in/sombhu-das-21176823a/" style="text-decoration: none; margin: 0 10px;">
            <img src="https://cdn-icons-png.flaticon.com/512/61/61109.png" alt="LinkedIn" style="width: 24px; height: 24px;">
          </a>
        </div>
      </div>
    </div>
  `;
};



export const sendVerifyEmail = async (receiver , token) => {
  try {

    const verifyLink = `${process.env.NEXTAUTH_URL}/profile/verify-email/${token}`

    const mailOptions = {
      from: `thinkCraft.ai <${process.env.MAIL_NAME}>`,
      to: receiver,
      subject:'Verification Requast from ThinkCraft.ai',
      html: htmlTemplateForEmailVerification(verifyLink), // Use the HTML template here
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent");
    return true;
  } catch (error) {
    console.log("Email not sent", error);
    return false;
  }
}