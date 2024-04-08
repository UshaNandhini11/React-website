import { useEffect, useState } from 'react';
import './product.css'
import { Product } from '../../entity/products';
import { getProductList } from '../../service/product';

export default function ProductCategory() {
    const [product, setProduct] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>()

    useEffect(() => {
        getProductsCategories();
    }, []);

    const getProductsCategories = async () => {
        try {
            let response = await getProductList()
            setProduct(response)
            let category = product.map((element) => element.category).filter((value, index, currentValue) =>
                currentValue.indexOf(value) === index)
            console.log(category)
            setCategories(category)
        } catch (error) {
            console.log(error)
        }
    }
    return (<>
        <div className="categories">
            <div className="category-list">
                {
                    categories?.map((element, index) => {
                        return (
                            <div key={index} className='category-card'>
                                <p>{element}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    </>)
}