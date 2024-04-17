import { useNavigate } from 'react-router-dom'
import '../components/Home/product.css'
interface ProductCategoryProps {
    element: string
    brands: string[] | undefined
}
export default function ProductCategory(props: ProductCategoryProps) {
    const navigate = useNavigate()

    const handleCategoryCard = () => {
        let categoryName = props.element
        console.log(categoryName)
        navigate('/productsBycategory', { state: { category: props.element, brands: props.brands } })
    }

    return (<>
        <div className='category-card'>
            <p onClick={() => {
                handleCategoryCard()
            }}>{props.element}</p>
        </div>
    </>)
}