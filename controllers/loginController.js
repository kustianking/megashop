import bcrypt from "bcryptjs";
import User from "../db/models/User.js";

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(450).json({ message: "Please Fill The Details" });
  }

  try {
    const signInData = await User.findOne({
      email: { $regex: new RegExp(email, "i") },
    });
    if (signInData) {
      const token = signInData.tokens[0].token;

      if (!signInData.isEmailConfirmed) {
        return res.status(401).json({
          message:
            "Email not confirmed. Please check your email for instructions.",
        });
      }

      const isMatch = await bcrypt.compare(password, signInData.password);

      if (!isMatch) {
        res.status(400).json({ message: "Password is not matching" });
      } else {
        res.status(200).json({
          message: "SignIn Successfull!",
          userData: signInData,
          token,
        });
      }
    } else {
      res.status(420).json({ message: "Email Does Not Exist!" });
    }
  } catch (error) {
    // console.log(error);
  }
};

export default login;
