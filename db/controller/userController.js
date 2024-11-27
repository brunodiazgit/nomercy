import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import validator from 'validator'

export const prueba = (req, res) => {
    return res.status(200).json({
        status: "success",
        message: "The database is working fine"
    })
}

// register users

export const register = async (req, res, pool) => {
    const { username, email, password } = req.body

    try {
        if (!username || !email || !password) {
            return res.status(400).json({
                status: "error",
                message: "you need to fill in all the fields"
            })
        }

        //validator

        if (!validator.isEmail(email)){
            return res.status(400).json({
                status: "error",
                message: "The email is not valid"
            })
        }

        if(!validator.isLength(password,{min: 8})){
            return res.status(400).json({
                status: "error",
                message: "The password must be at least 8 characters long"
            })
        }

        const queryuser = `SELECT * FROM USERS WHERE email = $1`

        const existingUser = await pool.query(queryuser, [email])

        if (existingUser.rows.length > 0) {
            return res.status(404).json({
                status: "error",
                message: "you already have an account"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const userData = `INSERT INTO USERS(username, email, user_password)
        VALUES($1,$2,$3) RETURNING*`

        const newUser = await pool.query(userData, [username, email, hashedPassword])

        return res.status(200).json({
            status: "success",
            message: "An account has been successfully created",
            user: newUser.rows[0]
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "internal server error ! ! !",
            error: error.message
        })
    }
}

// login users 

export const login = async (req, res, pool) => {
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "you need to fill in all the fields"
            })
        }

        const query = `SELECT * FROM USERS WHERE email = $1`
        const userResult = await pool.query(query, [email])

        if (!userResult) {
            return res.status(404).json({
                status: "error",
                message: "No user is registered with this email."
            })
        }

        const user = userResult.rows[0]

        const isPasswordValid = await bcrypt.compare(password, user.user_password)

        if (!isPasswordValid) {
            return res.status(400).json({
                status: "error",
                message: "Email or password is wrong ."
            })
        }

        //generating token

        const token = jwt.sign(
            { id: user.id, name: user.username, email: user.email, role: user.user_role },
            'QKDSAPKGP$!6590_25137MNP',
            { expiresIn: '8h' }
        )

        return res.status(200).json({
            status: "success",
            token: token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.user_role
            }
        })

    } catch (error) {
        return res.status(500).json({
            status: "error",
            message: "internal server error ! ! !",
            error: error.message
        })
    }
}