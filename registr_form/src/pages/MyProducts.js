import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from 'react-router-dom'
import { GET_PRODUCTS } from "../store/sagaTypes";

function MyProducts() {
    const { products } = useSelector(state => state.prodState)
    console.log(products);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({ type: GET_PRODUCTS })
    }, [])
    return (<>
        <table className="table table-striped ">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Details</th>
                </tr>
            </thead>
            <tbody>
                {
                    products.map((product, productId) => {
                        return <tr key={productId}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.count}</td>
                            <td><Link to={'/product/' + product.id}>Details</Link></td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>)
}
export default MyProducts