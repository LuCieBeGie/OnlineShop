import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom";
import { GET_PRODUCT } from "../store/sagaTypes";
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function ProdInfo() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    const { product } = useSelector(state => state.prodState)
    console.log(product);
    const dispatch = useDispatch()
    const { id } = useParams()
    useEffect(() => {
        dispatch({ type: GET_PRODUCT, id: id })
    }, [])
    return (<>
        {
            <div className="w-100 bg-danger bg-opacity-10">
                <div className="p-5 w-50 mx-auto bg-danger bg-opacity-25 ">
                    <Slider {...settings}>
                        {
                            product.photos && product.photos.map((photo, photoId) => {
                                return <img key={photoId} src={'http://localhost:4000/img/' + photo.url} />
                            })
                        }
                    </Slider>
                    <hr />
                    <div className="w-50 mx-auto d-flex justify-content-center p-5">
                        <div className='p-3'>
                            <h1>Name</h1>
                            <ul>
                                <li><h2>{product.name}</h2></li>
                            </ul>
                        </div>
                        <div className='p-3'>
                            <h1>Price</h1>
                            <ul>
                                <li><h2>{product.price}</h2></li>
                            </ul>
                        </div>
                        <div className='p-3'>
                            <h1>Quantity</h1>
                            <ul>
                                <li><h2>{product.count}</h2></li>
                            </ul>
                        </div>
                        <div className='p-3 '>
                            <h1>Details</h1>
                            <ul>
                                <li><h2>{product.description}</h2></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        }
    </>)
}
export default ProdInfo