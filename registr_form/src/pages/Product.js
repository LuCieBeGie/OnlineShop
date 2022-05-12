import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { ADD_PRODUCT } from "../store/sagaTypes";

function Product() {
    const { products } = useSelector(state => state.prodState)
    const { register, handleSubmit, formState: { errors }, reset } = useForm()
    const dispatch = useDispatch()
    const onSubmit = (product, e) => {
        console.log(e.target);
        // console.log(product);
        let obj = {
            ...product,
        }
        dispatch({ type: ADD_PRODUCT, product: e.target })
        reset()
    }
    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="w-50 mx-auto ">
            <div className="form-group form-control p-3">
                <label htmlFor="name">Name</label>
                {errors.name && <span> field must be filled</span>}
                <input name="name"{...register('name', { required: true })}
                    className="form-control" />
                <label htmlFor="count">Count</label>
                {errors.count && <span> must be filled</span>}
                <input name="count"{...register('count', { required: true })}
                    className="form-control" />
                <label htmlFor="price">Price</label>
                {errors.price && <span> must be filled</span>}
                <input name="price"{...register('price', { required: true })}
                    className="form-control" />
                <label htmlFor="description">Description</label>
                {errors.description && <span> must be filled</span>}
                <textarea name="description"{...register('description', { required: true })}
                    className="form-control" />
                <br />
                <input type='file' name='photo' multiple />
                <br />
                <hr />
                <button className="btn btn-primary"
                >Add
                </button>
            </div>
        </form>
    </>)
}
export default Product