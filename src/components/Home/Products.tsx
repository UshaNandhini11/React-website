import './product.css'
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Product } from "../../entity/products";
import { getProductList } from "../../service/product";
import ProductCategory from './ProductCategory';
import ProductComponent from '../Product';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[]>()

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
    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        if (products?.length > 0) {
            getProductsCategories();
        }
    }, [products])

    return (<>
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
        <Box className="product">
            <header>
                <h1>Products</h1>
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
        </Box >
    </>)
}