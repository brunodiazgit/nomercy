/* eslint-disable react/prop-types */

const FormInput = ({ type, ph, name, value, onChange, htmlFor, id, className}) => {
    return (
        <input
            type={type}
            placeholder={ph}
            name={name}
            value={value}
            onChange={onChange}
            htmlFor={htmlFor}
            id={id}
            className={className}
            required
        />
    )
}

export default FormInput