import FormInput from "./FormInput"

function Signup() {
    return (
        <form className='signup'>
            <div className="signup-input" >
                <div className='d-flex flex-column'>
                    <label htmlFor="firstname">First Name</label>
                    <FormInput
                        className="input-login"
                        type='text'
                        ph='   Enter first name'
                        id='firstname'
                    />
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="lastname">Last name</label>
                    <FormInput
                        className="input-login"
                        type='text'
                        ph='   Enter last name'
                        id='lastname'
                    />
                </div>
            </div>
            <div className="signup-input">
                <div className='d-flex flex-column'>
                    <label htmlFor="date">Date of Birth</label>
                    <FormInput
                        className="input-login"
                        type='date'
                        ph='   Select date'
                        id='date'
                    />
                </div>
                <div className='d-flex flex-column'>
                    <label htmlFor="email">Email Address</label>
                    <FormInput
                        className="input-login"
                        type='email'
                        ph='   Enter email address'
                        id='email'
                    />
                </div>
            </div>
            <div className='d-flex flex-column'>
                <label htmlFor="pass">Password</label>
                <FormInput
                    className="input-login "
                    type='password'
                    ph='   Enter password'
                    id='pass'
                />
            </div>
            <button className='loginbtn mt-3'>CREATE ACCOUNT</button>
        </form>
    )
}

export default Signup