import { useNavigate } from "react-router-dom"
import { Product } from "../entity/products"

interface ProductProps {
    index: number
    product: Product
}
export default function ProductComponent(props: ProductProps) {
    const navigate = useNavigate()

    const handleClick = (id: number) => {
        navigate('/productDetails', { state: { id: id } })
    }
    const handleEdit = () => {
        navigate('/addProduct', { state: { mode: 'edit', id: props.product.id } })
    }

    return (<>
        <div className="productContent">
            <div className="edit-icon" onClick={() => { handleEdit() }}><i className="fas fa-edit"></i></div>
            <div className="product-card" key={props.index}
                onClick={() => {
                    handleClick(props.index + 1)
                }} >
                <div style={{ position: 'relative' }}>
                    <img src={props.product.thumbnail} alt="img1" height={280} width={570} />
                </div>
                <div >
                    <h2>{props.product.title}</h2>
                    <div className="product-info" >
                        <h4>{props.product.brand}</h4>
                        <h4><i className="fa-solid fa-star"></i>  {props.product.rating}</h4>
                    </div>
                </div>
            </div>
        </div>
    </>)
}