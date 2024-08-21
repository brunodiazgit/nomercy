/* eslint-disable react/prop-types */
import ClipLoader from 'react-spinners/ClipLoader'

function Loader({ loading }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <ClipLoader color={"#123abc"} loading={loading} size={150} />
        </div>
    )
}

export default Loader
