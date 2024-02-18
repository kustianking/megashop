import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import Admins from "../models/Admin.js";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.params.token;
    const verifyToken = jwt.verify(token, process.env.SECRET_KEY_ADMIN);
    const rootAdmin = await Admins.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootAdmin) {
      throw new Error("This is invalid Admin");
    }

    req.token = token;
    req.rootAdmin = rootAdmin;
    req.adminId = rootAdmin._id;

    next();
  } catch (error) {
    res.status(200).send("Unathorized Admin");
    // console.log(error);
  }
};

export default adminAuth;
