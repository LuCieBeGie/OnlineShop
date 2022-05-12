import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { USER_CHECK } from "../store/sagaTypes";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStroopwafel, faUser, faUserLarge, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faLinkedin, faGithub } from '@fortawesome/fontawesome-free-brands';


library.add(faStroopwafel)

function Header() {
    let { auth } = useSelector(state => state.userState);
    const dispatch = useDispatch()
    useEffect(() => { dispatch({ type: USER_CHECK }) }, [])
    return (<>
        <nav className="navbar navbar-expand-sm bg-light">
            <div className="container-fluid">
                <ul className="navbar-nav">
                    <li>
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/allProducts">All Product</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to={auth === true ? "/cartItems" : '/login'}>My Cart</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to={auth === true ? "/chat" : '/login'}>Chat</Link>
                    </li>
                </ul>
                <div className="d-flex">
                    <Link className="nav-link"
                        to={auth === true ? "/profile" : '/login'}>
                        <FontAwesomeIcon
                            className='font-awesome p-3'
                            icon={auth === true ? faUserLarge : faUserPlus} />
                    </Link>
                </div>
            </div>
        </nav>
        <Outlet />
    </>)
}
export default Header