import { Link } from "react-router-dom"

function Account() {
    return (
        <Link to={'/login'}>
            <img style={{ height: "2rem", marginLeft: "1rem" }} src="../../../public/user-ICON.svg" alt="user icon" />
        </Link>
    )
}

export default Account 