import { Link } from "react-router-dom"

function Account() {
    return (
        <Link to={'/nomercy/login'}>
            <img style={{ height: "2rem", marginLeft: "1rem" }} src={`${import.meta.env.BASE_URL}user-ICON.svg`} alt="user icon" />
        </Link>
    )
}

export default Account 