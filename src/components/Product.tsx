import { useNavigate } from "react-router-dom"
import { Product } from "../entity/products"

interface ProductProps {
    index: number
    element: Product
}
export default function ProductComponent(props: ProductProps) {
    const navigate = useNavigate()

    const handleClick = (id: number) => {
        navigate('/productDetails', { state: { id: id } })
    }
    return (<>
        <div className="product-card" key={props.index}
            onClick={() => {
                handleClick(props.index + 1)
            }} >
            <div>
                <img src={props.element.thumbnail} alt="img1" height={280} width={450} />
            </div>
            <div >
                <h2>{props.element.title}</h2>
                <div className="product-info" >
                    <h4>{props.element.brand}</h4>
                    <h4><i className="fa-solid fa-star"></i>  {props.element.rating}</h4>
                </div>
            </div>
        </div>
    </>)
}