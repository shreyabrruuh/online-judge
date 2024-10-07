import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/Users.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const forgotpassword = async (req, res) => {
  const { email } = req.body;
    console.log(req.body);
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        
      },
    });
    console.log(process.env.EMAIL_USER)
    console.log(process.env.EMAIL_PASS)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password Link",
      html: `<p>You requested a password reset</p>
             <p>Click this <a href="http://localhost:5173/reset-password/${user._id}/${token}">link</a> to reset your password</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ status: "Failed to send email" });
      }
      console.log("Email sent:", info.response);
      return res.status(200).json({ status: "Success" });
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    return res.status(500).json({ status: "Failed to process request" });
  }
};

export const resetpassword = async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (decoded.id !== id) {
        return res.status(400).json({ status: "Invalid token" });
      }
      console.log("decoded token:",decoded)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.findByIdAndUpdate(id, { password: hashedPassword }/*, { new: true }*/);

    if (!user) {
      return res.status(404).json({ status: "User not found" });
    }

    res.status(200).json({ status: "Success" });
  } catch (error) {
    console.error("Error in reset password:", error);
    if (error.name === 'TokenExpiredError') {
      return res.status(400).json({ status: "Token expired" });
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(400).json({ status: "Invalid token" });
    }
    return res.status(500).json({ status: "Failed to process request" });
  }
};

export const totaluser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

//module.exports = { forgotpassword, resetpassword, totaluser };
