import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom";
import { GET_USER, LOG_OUT } from "../store/sagaTypes";

function Profile() {
    const { user } = useSelector(state => state.userState)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: GET_USER })
    }, [])
    return (
        <>
            <div className=''>
            <button className="btn btn-light float-md-end"
                onClick={() => { dispatch({ type: LOG_OUT, navigate }) }}
            >Log Out
            </button>
            <h1>Welcome</h1>
            <h1 className="">{user.name} {user.surname}</h1>
            {/* <h2>{user.age}</h2> */}
            <div className="p-5">
                <button className="btn btn-info text-decoration-none" ><Link to="/addProduct">Add Product</Link></button>
                <button className="btn btn-danger text-decoration-none"><Link to="/myProducts">My Products</Link></button>
            </div>
        </div>
        </>
    )
}
export default Profile