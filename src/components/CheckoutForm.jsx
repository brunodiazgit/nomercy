/* eslint-disable react/prop-types */

function CheckoutForm({handleSubmit, formValues, handleChange}){
    return(
        <>
        <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                <h1>Checkout</h1>
                <h2 className="checkoutmessage">Please fill in your details.</h2>
            </div>
            <form className="checkout-form" onSubmit={handleSubmit}>
                <h1>NoMercy</h1>
                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={formValues.name}
                    onChange={handleChange}
                    className="input-checkout"
                    required
                />
                <input
                    type='email'
                    placeholder='email@example.com'
                    name='email'
                    value={formValues.email}
                    onChange={handleChange}
                    className="input-checkout"
                    required
                />
                <input
                    type='number'
                    placeholder='Phone number'
                    name='phone'
                    value={formValues.phone}
                    onChange={handleChange}
                    className="input-checkout"
                    required
                />
                <button style={{marginLeft:"1rem"}} type="submit" className="atc-btn">Create order</button>
            </form>
        </>
    )
}

export default CheckoutForm