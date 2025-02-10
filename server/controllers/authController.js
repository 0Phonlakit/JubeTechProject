const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const User = require("../models/User");
const Tokens = require("../models/Token");
require("dotenv").config();

const signupValidate = Joi.object({
    email: Joi.string().trim().max(250).required().email({ tlds: { allow: ["com", "net", "org", "edu"] } }),
    password: Joi.string().trim().min(6).max(150).required(),
    otp: Joi.number().integer().min(100000).max(999999).required(),
    ref_code: Joi.string().length(36).required(),
    confirm_password: Joi.string().equal(Joi.ref('password')).required().messages({
        "any.only": "รหัสผ่านไม่ตรงกัน"
    })
});

const signinValidate = Joi.object({
    email: Joi.string().trim().max(250).required().email({ tlds: { allow: ["com", "net", "org", "edu"] } }),
    password: Joi.string().trim().min(6).max(150).required(),
});

async function signin(req, res) {
    try {
        const { error } = signinValidate.validate(req.body);
        if (error && error.details[0]) return res.status(400).json({ message: error.details[0] });
        // Check Email
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
        // Check Password
        const matched = await bcrypt.compare(password, user.password);
        if (!matched) return res.status(400).json({ message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
        // Create JWT
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, { expiresIn: "14d" });
        return res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ", token });
    } catch (err) {
        console.log({ position: "Sigin", error: err });
        return
    }
}

async function signup(req, res) {
    // try {
    //     const { error } = signupValidate.validate(req.body);
    //     if (error) return res.status(400).json({ message: error.details[0] });

    //     const { email, password, otp, ref_code } = req.body;
    // } catch (err) {
    //     console.log({ position: "Signup", error: err });
    //     return
    // }
}

module.exports = {
    signin,
    signup
}