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
    const [brands, setBrands] = useState<string[]>()
    const navigate = useNavigate()

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (products?.length > 0) {
            getProductsCategories();
            getBrands();
        }
    }, [products])

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
            console.log("Error in getCategories::" + error)
        }
    }
    const getBrands = async () => {
        try {
            let brand = products.map((element) => element.brand).filter((value, index, currentValue) =>
                currentValue.indexOf(value) === index)
            setBrands(brand)
        } catch (error) {
            console.log("Error in getbrands::" + error)
        }
    }
    const handleAddProduct = () => {
        navigate('/addProduct', { state: { mode: 'add', categories: categories, brands: brands } })
    }
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
                            products.map((product, index) => {
                                return (
                                    <ProductComponent
                                        key={index}
                                        index={index}
                                        product={product}
                                        categories={categories}
                                        brands={brands}
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