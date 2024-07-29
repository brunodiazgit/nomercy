/* eslint-disable react/prop-types */

const FormInput = ({ type, ph, name, value, onChange }) => {
    return (
        <input
            type={type}
            placeholder={ph}
            name={name}
            value={value}
            onChange={onChange}
            className="p-2 rounded-md border-2 border-gray-300 focus:border-pink-500 outline-none"
            required
        />
    )
}

export default FormInput