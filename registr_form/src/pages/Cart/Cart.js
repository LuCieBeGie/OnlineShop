import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { CHECK_OUT, MY_CART, REMOVE_FROM_CART } from "../../store/sagaTypes";

import StripeCheckout from 'react-stripe-checkout'
import './Cart.css';
import { setMyCart } from "../../store/Cart/action";


function Cart() {
    const dispatch = useDispatch()
    const { myCart } = useSelector(state => state.cartState)
    // console.log(myCart)
    const amount = myCart.map((el) => el.product.price * el.count)
    const total = eval(amount.join('+'))
    const makePayment = (token) => {
        const body = {
            token,
            myCart,
        };
        const headers = {
            "Content-Type": "application/json",
        };
        return fetch(`http://localhost:4000/checkOut`, {
            method: "POST",
            credentials: "include",
            headers,
            body: JSON.stringify(body),
        })
            .then((response) => {
                console.log("RESPONSE", response);
                const { status } = response;
                console.log("STATUS", status);
                return response.json();
            })
            .then((data) => {
                dispatch(setMyCart(data.allcarts));
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        dispatch({ type: MY_CART })
    }, [])
    return (<>
        <div className='back'>
            <div className='heading'>
                <h1>Shpping Bag</h1>
            </div>
            <div>
                <div className="main-div">
                    {myCart.count}
                    {
                        myCart.map((el, elId) => {
                            return <div className="main_children"
                                key={elId}>
                                {el.product.photos && <img src={'http://localhost:4000/img/' + el.product.photos[0]?.url} className='item_img' />}
                                {el.count} pcs.
                                <h1>{el.product.name}</h1>
                                total {el.product.price * el.count}
                                <button className='btn btn-primary'
                                    onClick={() => { dispatch({ type: REMOVE_FROM_CART, id: el.id }) }}
                                >Remove
                                </button>
                            </div>
                        })
                    }
                    <br />
                    <hr />
                    <h1>{total >= 0 ? '' : 'Your shopping bag is empty'}</h1>
                </div>
                <div>
                    <h1>Total amount: {total}</h1>
                    <StripeCheckout
                        stripeKey={process.env.REACT_APP_KEY}
                        token={makePayment}
                        name='Fill in the fields'
                        amount={total * 100}>
                        <button className='btn btn-primary'
                            disabled={!myCart.length}
                        // onClick={() => { dispatch({ type: CHECK_OUT }); }}
                        >Check out</button>
                    </StripeCheckout>
                </div>
            </div>
        </div>

    </>)
}
export default Cart