import User from "../models/userModel.js"
import bcrypt from "bcrypt"
import { tokenGenerator } from "../services/jwt.js"

export const register = async (req, res) => {
    let { firstname, lastname, date, email, password } = req.body

    if (!firstname || !lastname || !date || !email || !password) {
        return res.status(400).json({
            status: "error",
            message: "You must fill out the entire form ! ! !"
        })
    }
    try {
        const existingUsers = await User.find({ email: email.toLowerCase() })
        if (existingUsers && existingUsers.length >= 1) {
            return res.status(200).json({
                status: "success",
                message: "you already have an account"
            })
        }

        let pwd = await bcrypt.hash(password, 10)
        password = pwd

        let userToSave = new User({
            firstname,
            lastname,
            date,
            email,
            password
        })

        let savedUser = await userToSave.save()

        return res.status(200).json({
            status: "success",
            message: "A new user has been registered ! ! !",
            savedUser
        })
    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "server error ! ! !",
            error
        })
    }
}

export const login = async (req, res) => {
    let { email, password } = req.body

    if (!email || !password) {
        return res.status(500).json({
            status: "error",
            message: "You must fill out the entire form ! ! ! ! !"
        })
    }
    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User doesn't exist."
            })
        }

        let pwd = bcrypt.compareSync(password, user.password)

        if (!pwd) {
            return res.status(400).json({
                status: "error",
                message: "the password is wrong"
            })
        }

        const token = await tokenGenerator(user)

        return res.status(200).json({
            status: "success",
            message: "you have logged into your account",
            user: {
                id: user._id,
                name: user.firstname
            },
            token
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "server error ! ! !",
            error: error.message
        })
    }
}