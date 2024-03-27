// this file is created to store the entered user detail to db
// nodemailer is installed to send email to users => npm i nodemailer

const express = require("express");
const router = new express.Router();
const users = require("../models/userSchema")
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});
// register user details
router.post("/register", async (req, res) => {
    const { fname, lname, email, mobile, message } = req.body;
    if (!fname || !lname || !email || !mobile) {
        res.status(401).json({ status: 401, error: "All input require" })
    }
    try {
        const preuser = await users.findOne({ email: email });
        if (preuser) {
            const userMessage = await preuser.MessageSave(message);
            console.log(userMessage);
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "sending email from bhuwan",
                text: "Your Response has been Submitted",

            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error" + error)
                } else {
                    console.log("email sent" + info.response);
                    res.status(201).json({ status: 201, message: "Email sent sucessfully" })
                }
            });

        } else {
            const finalUser = new users({
                fname, lname, email, mobile, message
            });
            const storeData = await finalUser.save();

            // kaslai email send garne k msg send garne vanne ko lagi
            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: "sending email from bhuwan",
                text: "Your Response has been Submitted",

            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log("error" + error)
                } else {
                    console.log("email sent" + info.response);
                    res.status(201).json({ status: 201, message: "Email sent sucessfully" })
                }
            });

            res.status(201).json({ status: 201, storeData })
        }
    } catch (error) {
        res.status(401).json({ status: 401, error: "All input require" })
        console.log("catch error")
    }
})

module.exports = router;