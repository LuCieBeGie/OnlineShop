import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { GET_USER, MY_CART, USER_CHECK } from "../store/sagaTypes"

function UserCheck() {
    const dispatch = useDispatch()
    let { auth, user } = useSelector(state => state.userState);
    // console.log(auth, 111);
    const navigate = useNavigate()
    const location = useLocation()
    useEffect(() => {
        dispatch({ type: GET_USER })
        dispatch({ type: MY_CART })
        dispatch({
            type: USER_CHECK,
            path: location.pathname,
            navigate: navigate
        })

    }, [])
    return user ? <Outlet /> : '';
}

export default UserCheck