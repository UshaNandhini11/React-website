import './product.css'
interface ProductCategoryProps {
    element: string
}
export default function ProductCategory(props: ProductCategoryProps) {
    return (<>
        <div className='category-card'>
            <p>{props.element}</p>
        </div>

    </>)
}