/* eslint-disable react/prop-types */

function SignupForm({handleSubmit, handleChange, formData}) {
    return (
        <>
            <form onSubmit={handleSubmit} className='signup p-0'>
                <div className="signup-input">
                    <div className='d-flex flex-column'>
                        <label htmlFor="firstname">First Name</label>
                        <input
                            className="input-login p-2"
                            type='text'
                            placeholder='Enter first name'
                            id='firstname'
                            value={formData.firstname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='d-flex flex-column'>
                        <label htmlFor="lastname">Last Name</label>
                        <input
                            className="input-login p-2"
                            type='text'
                            placeholder='Enter last name'
                            id='lastname'
                            value={formData.lastname}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="signup-input">
                    <div className='d-flex flex-column'>
                        <label htmlFor="date">Date of Birth</label>
                        <input
                            className="input-login p-2"
                            type='date'
                            placeholder='Select date'
                            id='date'
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                <button className='loginbtn mt-3'>CREATE ACCOUNT</button>
            </form>
        </>
    )
}

export default SignupForm