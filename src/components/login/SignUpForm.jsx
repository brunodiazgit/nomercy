/* eslint-disable react/prop-types */

function SignupForm({ handleSubmit, handleChange, formData, message}) {

    return (
        <>
            <form onSubmit={handleSubmit} className='signup p-5'>
                <div className="signup-input">
                    <div className='d-flex flex-column'>
                        <label htmlFor="username">First Name</label>
                        <input
                            className="input-login p-2"
                            type='text'
                            placeholder='Enter first name'
                            id='username'
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="signup-input">
                    <div className='d-flex flex-column'>
                        <label htmlFor="email">Email Address</label>
                        <input
                            className="input-login p-2"
                            type='email'
                            placeholder='Enter email address'
                            id='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className='d-flex flex-column p-2'>
                    <label htmlFor="password">Password</label>
                    <input
                        className="input-login p-2"
                        type='password'
                        placeholder='Enter password'
                        id='password'
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                {message && <p className="text-center" style={{color: "red"}}>{message}</p>}
                <button className='loginbtn mt-3'>CREATE ACCOUNT</button>
            </form>
        </>
    )
}

export default SignupForm