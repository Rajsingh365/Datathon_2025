// const nodemailer = require('nodemailer');

// // Email configuration with additional options
// const transporter = nodemailer.createTransport({
//     service: 'gmail',  // Use 'gmail' instead of host/port
//     auth: {
//         user: 'raj365.tsec@gmail.com',
//         pass: 'wwxqelujdtjxrcpy'
//     },
//     tls: {
//         rejectUnauthorized: false,  // Only use during testing/debugging
//         ciphers: 'SSLv3'
//     },
//     debug: true  // Enable debug logs
// });

// // Verify connection configuration
// transporter.verify(function(error, success) {
//     if (error) {
//         console.log('Server connection failed:', error);
//     } else {
//         console.log('Server is ready to take our messages');
//     }
// });

// // Function to send email
// async function sendEmail(user) {
//     const mailOptions = {
//         from: 'raj365.tsec@gmail.com',
//         to: user.email,
//         subject: 'Your Subject Here',
//         html: `
//             <p>Hello ${user.name},</p>
//             <p>Here is your message.</p>
//             <p>Best regards,</p>
//             <p>Your Name</p>
//         `
//     };

//     try {
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent successfully');
//         console.log('Message ID:', info.messageId);
//     } catch (error) {
//         console.error('Error sending email:', error);
//     }
// }

// // Test the connection
// sendEmail({ name: 'Raj Singh', email: 'sraj08188@gmail.com' });


import nodemailer  from "nodemailer"

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "raj365.tsec@gmail.com",
    pass: "wwxqelujdtjxrcpy",
  },
});

const mailOptions = {
  from: "raj365.tsec@gmail.com",
  to: "sraj08188@gmail.com",
  subject: "Hello from Nodemailer",
  text: "This is a test email sent using Nodemailer.",
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error("Error sending email: ", error);
  } else {
    console.log("Email sent: ", info.response);
  }
});