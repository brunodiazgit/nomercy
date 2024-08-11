import FormInput from "./FormInput"

function Login(){
    return(
        <form className='d-flex flex-column align-items-center justify-content-center gap-4'>
        <div className='d-flex flex-column'>
        <label htmlFor="email">Email Address</label>
        <FormInput
            className="input-login"
            type='email'
            ph='   Enter email address'
            id='email'
        />
        </div>

        <div className='d-flex flex-column'>
        <label htmlFor="pass">Password</label>
        <FormInput
            className="input-login"
            type='password'
            ph='   Enter password'
            id='pass'
        />
        </div>
        <button className='loginbtn mt-3'>LOG IN</button>
    </form>
    )
}

export default Login