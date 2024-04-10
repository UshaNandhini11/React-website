import './product.css'
import { useEffect, useState } from "react";
import { Product } from "../../entity/products";
import { getProductList } from "../../service/product";
import ProductCategory from './ProductCategory';
import ProductComponent from '../Product';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>()
    const navigate = useNavigate()

    const getProducts = async () => {
        try {
            let response = await getProductList()
            setProducts(response)
        } catch (error) {
            console.log(error)
        }
    }
    const getProductsCategories = async () => {
        try {
            let category = products.map((element) => element.category).filter((value, index, currentValue) =>
                currentValue.indexOf(value) === index)
            setCategories(category)
        } catch (error) {
            console.log(error)
        }
    }
    const handleAddProduct = () => {
        navigate('/addProduct')
        // navigate('/addProduct', { state: { categories: categories } })
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (products?.length > 0) {
            getProductsCategories();
        }
    }, [products])
    return (<>
        <div>
            <div className="categories">
                <div className="category-list">
                    {
                        categories?.map((element, index) => {
                            return (
                                <ProductCategory
                                    key={index}
                                    element={element} />
                            )
                        })
                    }
                </div>
            </div>
            <div className="product">
                <header className='product-header'>
                    <h1>Products</h1>
                    <Button variant='contained' style={{ marginTop: 30 }} onClick={() => handleAddProduct()}>Add Product</Button>
                </header>
                <section className="productList">
                    <div className="product-card-cover">
                        {
                            products.map((element, index) => {
                                return (
                                    <ProductComponent
                                        key={index}
                                        index={index}
                                        element={element}
                                    />
                                )
                            })
                        }
                    </div>
                </section>
            </div >
        </div>
    </>)
}