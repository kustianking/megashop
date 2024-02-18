import dotenv from "dotenv";
import express, { response } from "express";
import cookieParser from "cookie-parser";
import emailValidator from "email-validator";

import jwt from "jsonwebtoken";

dotenv.config();

const router = express.Router();
router.use(cookieParser());

import auth from "../db/middlewares/auth.js";
import adminAuth from "../db/middlewares/adminauth.js";

import login from "../controllers/loginController.js";
import register from "../controllers/registerController.js";

import Users from "../db/models/User.js";
import Orders from "../db/models/Order.js";
import Admins from "../db/models/Admin.js";
import CurrencySettings from "../db/models/CurrencySetting.js";

import axios from "axios";

router.post("/register", register);

import nodemailer from "nodemailer";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_HOST,
    pass: process.env.SMTP_PASSWORD,
  },
});

// SMTP_HOST=mail.megashop.ng
// SMTP_USER=global@megashop.ng
// SMTP_PASSWORD=^SE&7eCO=o
// SMTP_RECEIVER=global@megashop.ng

// let transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: 465,
//   auth: {
//     user: process.env.SMTP_USER,
//     pass: process.env.SMTP_PASSWORD,
//   },
// });

router.post("/login", login);

router.put("/update-location", async (req, res) => {
  try {
    const { email, location } = req.body;

    // Find the user by email and update the location
    const updatedUser = await Users.findOneAndUpdate(
      { email: email },
      { location: location },
      { new: true } // To return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the updated user object as response
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating location:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Handle email confirmation endpoint
router.post("/confirm-email", async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.EMAIL_CONFIRMATION_SECRET
    );
    const email = decodedToken.email;

    await Users.findOneAndUpdate({ email }, { isEmailConfirmed: true });

    res.status(200).json({ message: "Email confirmed successfully" });
  } catch (error) {
    console.error("Error confirming email:", error);
    res.status(400).json({ message: "Invalid or expired confirmation token" });
  }
});

// admin routes

//add admin controller
router.post("/addadmin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || !emailValidator.validate(email)) {
    res.status(400).json({
      message: "Please Fill All The Details Correctly!!",
    });
  }

  try {
    const check = await Admins.findOne({ email: email });
    if (check) {
      res.status(420).json({
        message: "The email already exists!",
      });
    }

    const adminData = new Admins({
      email: email,
      password: password,
    });

    await adminData.generateAuthToken();
    await adminData.save();
    res.status(200).json({
      message: "New Admin is Added Successfully!",
    });
  } catch (error) {
    // console.log(error);
  }
});

// admin login handling
router.post("/adminlogin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(450).json({ message: "Please Fill The Details" });
  }

  try {
    const signInData = await Admins.findOne({
      email: { $regex: new RegExp(email, "i") },
    });
    if (signInData) {
      if (password !== signInData.password) {
        res.status(400).json({ message: "Password is not matching" });
      } else {
        const token = signInData.tokens[0].token;

        res.status(200).json({
          message: "Logged in to Dashboard!",
          adminData: signInData,
          token,
        });
      }
    } else {
      res.status(420).json({ message: "Email Does Not Exist!" });
    }
  } catch (error) {
    // console.log(error);
  }
});

const generateOrderEmail = (orderData) => {
  return `<html>
<head>
  <style>
    /* Add your CSS styles here */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #333;
      background: #f4f4f4; /* Background color */
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      border-radius: 8px;
      background: #fff; /* Background color */
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Shadow effect */
    }
    .header {
      text-align: center;
      margin-bottom: 20px;
    }
    .header h1 {
      color: #333; /* Dark color */
      margin-top: 0;
    }
    .order-details {
      border-radius: 8px;
      margin-bottom: 20px;
      background: #f9f9f9; /* Light background color */
      padding: 20px;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); /* Shadow effect */
    }
    .order-details p {
      margin: 0;
      padding: 5px 0;
      color: #555; /* Medium color */
    }
    .order-details strong {
      color: #333; /* Dark color */
    }
    .products {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    .products th,
    .products td {
      border: 1px solid #ddd; /* Light border color */
      padding: 8px;
    }
    .products th {
      background-color: #f2f2f2; /* Light gray background color */
    }
    .footer {
      text-align: center;
      color: #888; /* Medium color */
      margin-top: 20px;
    }
    .logo {
      color: #ff7f50; /* Coral color */
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You for Your Order!</h1>
      <p>Hi ${orderData.buyer},</p>
    </div>
    <div class="order-details">
      <p><strong>Status:</strong> ${orderData.status}</p>
      <p><strong>Reference Number:</strong> ${orderData.referenceNumber}</p>
      <p><strong>Email:</strong> ${orderData.email}</p>
      <p><strong>Total Amount:</strong> $${orderData.amount}</p>
      <p><strong>Quantity:</strong> ${orderData.quantity}</p>
      <p><strong>Location:</strong> ${orderData.location}</p>
      <p><strong>Products:</strong></p>
      <table class="products">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${orderData.products
            .map(
              (product) =>
                `<tr><td>${product.name}</td><td>$${product.price}</td></tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
    <div class="footer">
      <p>We appreciate your business and look forward to serving you again. For tracking of your products visit the orders page.</p>
      <p>Best Regards,</p>
      <p class="logo">Megashop</p>
    </div>
  </div>
</body>
</html>
  `;
};

// storing orders
router.post("/orders", async (req, res) => {
  try {
    const order = new Orders(req.body);
    await order.save();

    const emailContent = generateOrderEmail(req.body);
    const mailOptions = {
      from: process.env.SMTP_RECEIVER,
      to: req.body.email,
      subject: "Your Order Confirmation",
      html: emailContent,
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

    res.status(201).json(order);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//sending users data to clients
router.get("/users", async (req, res) => {
  try {
    const users = await Users.find({}).sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

//sending orders data to client
router.get("/orders", async (req, res) => {
  try {
    const orders = await Orders.find({}).sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/admins", async (req, res) => {
  try {
    const admins = await Admins.find({}).sort({ createdAt: -1 });

    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

//update the order model using id
router.put(
  "/adminorders/:id/:orderamount/:orderstatus/:orderemail/:orderbuyer",
  async (req, res) => {
    try {
      const { id, orderamount, orderemail, orderbuyer } = req.params;
      const products = JSON.parse(req.query.products);

      await Orders.updateOne(
        { _id: id },
        {
          $set: {
            status: "Delivered",
          },
        }
      );

      const mailOptions = {
        from: process.env.SMTP_RECEIVER,
        to: orderemail,
        subject: "Order Delivered",
        html: `
          <html>
            <head>
              <style>
                /* Add your CSS styles here */
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  padding: 20px;
                }
                .container {
                  max-width: 600px;
                  margin: 0 auto;
                  background-color: #fff;
                  border-radius: 8px;
                  padding: 20px;
                  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                }
                .header {
                  text-align: center;
                  margin-bottom: 20px;
                }
                .header h1 {
                  color: #333;
                  margin-top: 0;
                }
                .content {
                  margin-bottom: 20px;
                }
                .content p {
                  margin: 0;
                  padding: 5px 0;
                  color: #333;
                }
                .product {
                  display: flex;
                  align-items: center;
                  margin-bottom: 10px;
                }
                .product img {
                  width: 50px; /* Adjust size as needed */
                  height: 50px; /* Adjust size as needed */
                  margin-right: 10px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Order Delivered</h1>
                </div>
                <div class="content">
                  <p>Hi ${orderbuyer},</p>
                  <p>Your order of total <strong>$${orderamount}</strong> has been successfully delivered. We hope you enjoy your purchase!</p>
                  <p>Here are the products you purchased:</p>
                  ${products
                    .map(
                      (product) => `
                      <div class="product">
                        <img src="${product.image}" alt="${product.name}">
                        <div>
                          <p>${product.name}</p>
                          <p>Quantity: ${product.quantity}</p>
                          <p>Price: ${(
                            product.price * product.quantity
                          ).toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}</p>
                        </div>
                      </div>
                    `
                    )
                    .join("")}
                </div>
                <div class="footer">
                  <p>Thank you for shopping with us. If you want to track your order, please visit the orders page.</p>
                  <p>This is an automated email. Please do not reply.</p>
                </div>
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

      res.status(200).json({ message: "Order Updated" });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Unexpected Error" });
    }
  }
);

router.post("/addadmin", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password || !emailValidator.validate(email)) {
    res.status(400).json({
      message: "Please Fill All The Details Correctly!!",
    });
  }

  try {
    const check = await Admins.findOne({ email: email });
    if (check) {
      res.status(420).json({
        message: "The email already exists!",
      });
    }

    const adminData = new Admins({
      email: email,
      password: password,
    });

    await adminData.generateAuthToken();
    await adminData.save();
    res.status(200).json({
      message: "New Admin is Added Successfully!",
    });
  } catch (error) {
    // console.log(error);
  }
});

router.get("/deleteadmin/:adminId", async (req, res) => {
  try {
    const adminId = req.params.adminId;
    const deletedAdmin = await Admins.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    res.json(adminId);
  } catch (error) {
    console.error("Error Deleting Admin:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/admincheck/:token", adminAuth, (req, res) => {
  res.send(req.rootAdmin);
});

router.get("/check/:token", auth, (req, res) => {
  res.send(req.rootUser);
});

// Fetch currency settings
router.get("/currency-settings", async (req, res) => {
  try {
    const settings = await CurrencySettings.findOne();
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update currency settings
router.post("/currency-settings", async (req, res) => {
  const { serviceFee, conversionRate, shippingFee } = req.body;
  try {
    // Use findOneAndUpdate to update existing document or create a new one
    const settings = await CurrencySettings.findOneAndUpdate(
      {},
      { serviceFee, conversionRate, shippingFee },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
