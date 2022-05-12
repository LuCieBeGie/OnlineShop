import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ADD_TO_CART, GET_ALL_PRODUCTS } from "../../store/sagaTypes"
import './AllProducts.css'


function AllProducts() {
    const { products } = useSelector(state => state.prodState)
    // console.log(products);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: GET_ALL_PRODUCTS })
    }, [])
    return (<>
        <div>
            <div className="main-div">
                {
                    products.map((product, productId) => {
                        return <div key={productId} className="main_children">
                            {
                                product.photos && <img src={'http://localhost:4000/img/' + product.photos[0]?.url} className="w-25 h-25" />
                            }
                            <h1>{product.name}</h1>
                            <span>{product.price}</span>
                            {product.count} psc. available
                            <button className="btn btn-primary"
                                onClick={() => { dispatch({ type: ADD_TO_CART, id: product.id }) }}>Add to Cart</button>
                        </div>
                    })
                }
            </div>
        </div>
    </>)
}
export default AllProducts