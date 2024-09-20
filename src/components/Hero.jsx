
function Hero() {
    return (
        <div className="d-flex flex-column align-items-center"> 
            <img className="hero" src={`${import.meta.env.BASE_URL}Maybelline-Lead-Short.jpg`} alt="maybelline lead" />
            <h1 className='d-flex justify-content-center m-5'>Maybelline NewYork</h1>
        </div>
    )
}

export default Hero