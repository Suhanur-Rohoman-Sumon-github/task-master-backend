const express = require("express");
const jwt = require('jsonwebtoken');
const userRouter = express.Router();
const User = require("../models/userModel")
const bcrypt = require('bcrypt');
const saltRounds = 10;

// user register handaling start  there
userRouter.post('/register', async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email})
        if (user) {
            res.status(400).send("user already exist")
        }
        bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            const newUser = new User({
                email: req.body.email,
                name: req.body.name,
                password: hash
            })
            await newUser.save()
                .then((user) => {
                    res.status(200).send({
                        sucsses: true,
                        masseage: "user is created sucssesfully",
                        user: {
                            userId: user._id
                        }
                    })
                })
                .catch(err => {
                    res.status(500).send(err)
                })

        });
    } catch (error) {
        res.status(500).send(error.masseage)
    }
})
// user register handaling end  there
// user login start there
userRouter.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.status(401).send({
                success: false,
                message: "User not found"
            });
        }

        // Compare the entered password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(req.body.password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({
                success: false,
                message: "Incorrect password"
            });
        }

        const payload = {
            id:user._id,
            email: user.email,
            name: user.name,
        };

        const token = jwt.sign(payload, process.env.json_key, {
            expiresIn: "2d"
        });

        return res.status(200).send({
            success: true,
            message: "User logged in successfully",
            token: "Bearer " + token
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// user login end there
userRouter.get("/user", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error.message);
    }
});



module.exports = userRouter;