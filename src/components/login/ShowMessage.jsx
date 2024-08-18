/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"

function ShowMessage({ message, onHide }) { // Acepta una función de callback `onHide`
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            if (onHide) onHide()
        }, 3000);

        return () => clearTimeout(timer)
    }, [onHide])

    return (
        isVisible && (<div className="show-m mt-5">
            <p className="message m-0">{message}</p>
        </div>)
    )
}

export default ShowMessage
