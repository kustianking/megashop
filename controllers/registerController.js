import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";

import emailValidator from "email-validator";
import User from "../db/models/User.js";
import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_HOST,
    pass: process.env.SMTP_PASSWORD,
  },
});

// let transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: 465,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

const register = async (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  const location = req.body.location;

  if (
    !username ||
    !email ||
    !password ||
    !cpassword ||
    !location ||
    !emailValidator.validate(email)
  ) {
    res.status(400).json({
      message: "Please Fill All The Details Correctly!!",
    });
  }

  try {
    const check = await User.findOne({ email: email });
    if (check) {
      res.status(420).json({
        message: "The email already exists!",
      });
    }

    if (password == cpassword) {
      const confirmationToken = jwt.sign(
        { email },
        process.env.EMAIL_CONFIRMATION_SECRET,
        { expiresIn: "1d" }
      );
      const userData = new User({
        username: username,
        email: email,
        password: password,
        cpassword: cpassword,
        location: location,
        confirmationToken,
      });

      await userData.generateAuthToken();
      await userData.save();

      let mailOptions = {
        from: process.env.SMTP_RECEIVER,
        to: email,
        subject: "Confirm your email address",
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Our Website!</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #f5f5f5;
      padding: 20px;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 30px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      font-size: 24px;
      color: #333333;
    }

    p {
      font-size: 16px;
      color: #666666;
      margin-bottom: 20px;
    }

    a {
      display: inline-block;
      background-color: #4caf50;
      color: #ffffff;
      text-decoration: none;
      padding: 10px 20px;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    a:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to Our Website!</h1>
    <p>You are just one step away from experiencing global shopping with us.</p>
    <p>Please click the following link to confirm your email address:</p>
    <a style="color:white;" href="https://megashopmart.netlify.app/confirm-email/${confirmationToken}">Confirm Email</a>
  </div>
</body>
</html>

      `,
      };

      new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, response) {
          if (error) {
            reject(error);
          } else {
            resolve("email sent");
          }
        });
      });

      res.status(200).json({
        message: "Registration Successfull!",
      });
    } else {
      res.status(450).json({
        message: "Password are not matching",
      });
    }
  } catch (error) {
    // console.log(error);
  }
};

export default register;
