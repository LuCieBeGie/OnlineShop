import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ADD_USER } from '../../store/sagaTypes'
import './Users.css'

function AddUsers() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { users } = useSelector(state => state.userState)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const onSubmit = (user) => {
        console.log(user);
        let obj = {
            ...user,
        }
        dispatch({ type: ADD_USER, user: obj, navigate })
        reset()
    }
    return (<>
        <div className="main">
            <div className="cover">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group form-control p-3 div-form">
                        <label htmlFor="name">Name</label>
                        {errors.name && <span>This field must be filled</span>}
                        <input {...register('name', { required: true })}
                            className="form-control" />
                        <label htmlFor="surname">Surname</label>
                        {errors.count && <span>This field must be filled</span>}
                        <input {...register('surname', { required: true })}
                            className="form-control" />
                        <label htmlFor="age">Age</label>
                        {errors.age && <span>This field must be filled</span>}
                        <input {...register('age', { required: true })}
                            className="form-control" />
                        <label htmlFor="email">Email</label>
                        {errors.email && <span>This field must be filled</span>}
                        <input {...register('email', { required: true })}
                            className="form-control" />
                        <label htmlFor="password">Password</label>
                        {errors.password && <span>This field must be filled</span>}
                        <input type='password'{...register('password', { required: true })}
                            className="form-control" />
                        <label htmlFor="password_confirm">Confirm Password</label>
                        {errors.password_conf && <span>This field must be filled</span>}
                        <input type='password'{...register('password_confirm', { required: true })}
                            className="form-control" />
                        <br />
                        <button className="btn btn-primary"
                        >Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>)
}
export default AddUsers