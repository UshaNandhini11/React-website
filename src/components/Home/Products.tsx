import './product.css'
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Product } from "../../entity/products";
import { getProductList } from "../../service/product";
import ProductCategory from './ProductCategory';

export default function Products() {
    const [product, setProduct] = useState<Product[]>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            let response = await getProductList()
            setProduct(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (<>
        <Box className="product">
            <header>
                <h1>Products</h1>
            </header>
            <section className="productList">
                <div className="product-card-cover">
                    {
                        product.map((element, index) => {
                            return (
                                <div className="product-card" key={index}>
                                    <div>
                                        <img src={element.thumbnail} alt="img1" height={280} width={450} />
                                    </div>
                                    <div >
                                        <h2>{element.title}</h2>
                                        <div className="product-details" >
                                            <h4>{element.brand}</h4>
                                            <h4><i className="fa-solid fa-star"></i>  {element.rating}</h4>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </section>
        </Box>
    </>)
}