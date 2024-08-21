import Login from "./Login"
import { useState } from "react"
import Signup from "./SignUp"

function LoginContainer() {
    const[change, setChange] = useState(false)

    const showSignup = ()=>{
        setChange(true)
    }

    const showLogin = ()=>{
        setChange(false)
    }

    return (
        <div className="d-flex align-items-center">
            <div className="login-image-container">
                <img src="../../public/model.png" alt="model login" className="model-img" />
            </div>
            <div className="login-container d-flex flex-column align-items-center">
                <img style={{width:'200px'}} className='logo pb-3' src="../../public/nomercy-logo.png" alt="nomercy logo" />
                <div className='d-flex gap-5'>
                    <button onClick={showLogin} className="switch-btn">LOG IN</button>
                    <button onClick={showSignup} className="switch-btn">SIGN UP</button>
                </div>
                {change ? <Signup/> : <Login/>}
            </div>
        </div>
    )
}

export default LoginContainer
