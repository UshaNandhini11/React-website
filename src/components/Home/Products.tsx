import './product.css'
import { useEffect, useState } from "react";
import { Product } from "../../entity/products";
import { getProductList, getProductsCategories } from "../../service/product";
import ProductCategory from '../ProductCategory';
import ProductComponent from '../Product';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[] | undefined>()
    const [brands, setBrands] = useState<string[] | undefined>()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
        if (products?.length > 0) {
            getCategories();
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
    const getCategories = async () => {
        try {
            let response = await getProductsCategories();
            setCategories(response)
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
                                    element={element}
                                    brands={brands} />
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
                <section>
                    <div className='loading-circular-progress'>
                        {
                            isLoading ? (<>
                                <CircularProgress /></>) : (<></>)
                        }
                    </div>
                </section>
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