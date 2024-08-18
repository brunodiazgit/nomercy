/* eslint-disable react/prop-types */

function CheckoutForm({handleSubmit, formValues, handleChange}){
    return(
        <>
        <div className='d-flex flex-column justify-content-center align-items-center gap-3'>
                <h1>Checkout</h1>
                <h2 style={{fontSize: "5rem" , color: "rgb(177, 169, 169)"}}>Please fill in your details.</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <h1>NoMercy</h1>
                <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={formValues.name}
                    onChange={handleChange}
                    className="p-1"
                    required
                />
                <input
                    type='email'
                    placeholder='email@example.com'
                    name='email'
                    value={formValues.email}
                    onChange={handleChange}
                    className="p-1"
                    required
                />
                <input
                    type='number'
                    placeholder='Phone number'
                    name='phone'
                    value={formValues.phone}
                    onChange={handleChange}
                    className="p-1"
                    required
                />
                <button style={{marginLeft:"1rem"}} type="submit" className="atc-btn">Create order</button>
            </form>
        </>
    )
}

export default CheckoutForm