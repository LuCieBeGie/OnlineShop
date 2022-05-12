import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { LOG_IN } from "../../store/sagaTypes"
import AddUsers from "../AddUser/Users"

import './LogIn.css'

function LogIn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = (data) => {
        console.log(data);
        let obj = {
            ...data
        }
        dispatch({ type: LOG_IN, data: obj, navigate });
        reset()
    }
    return (
        <>
            <div className='LogIn'>
                <form onSubmit={handleSubmit(onSubmit)} className="form bg-transparent">
                    <div className="form-group form-control p-3">
                        <label htmlFor="username">Username</label>
                        {errors.username && <span>This field must be filled</span>}
                        <input {...register('username', { required: true })}
                            className="form-control" />
                        <label htmlFor="password">Password</label>
                        {errors.password && <span>This field must be filled</span>}
                        <input type='password'{...register('password', { required: true })}
                            className="form-control" />
                        <br />
                        <button className="btn btn-primary form-control"
                        >Log In
                        </button> <hr /> Don't have an account? <button className="btn"><Link to='/addUser'> Sign In</Link></button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default LogIn