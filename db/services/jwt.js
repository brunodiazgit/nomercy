import jwt from "jwt-simple"
import moment from "moment"

const key = "e8XWCIuiyp2Fk/c.hXXgB8S/ZKW5DIrEZ6L6bK"

export const tokenGenerator = (user) => {
    const payload = {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        data: user.data,
        email: user.email,
        image: user.image,
        iat: moment().unix(),
        exp: moment().add(30, "days").unix()
    }
    return jwt.encode(payload, key)
}

export default key