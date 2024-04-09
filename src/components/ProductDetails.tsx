import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { Product } from "../entity/products";
import { getProductById } from "../service/product";
import { useLocation } from "react-router-dom";

export default function ProductDetails() {
    const [product, setProduct] = useState<Product>();
    const location = useLocation()

    const getProductDetailsById = async (id: number) => {
        try {
            let response = await getProductById(id)
            setProduct(response)
        } catch (error) {

        }
    }
    useEffect(() => {
        console.log("id::" + location.state.id)
        getProductDetailsById(location.state.id)
    }, [])
    return (<>
        <Container>
            <div className="product-details">
                <div className="product-name">
                    <img src={product?.thumbnail} alt={location.state.id} height={400} width={400} />
                    <h2>{product?.title}</h2>
                </div>
                <div className="product-details">
                    <label htmlFor="brand">Brand : </label> <h2>{product?.brand}</h2>
                    <label htmlFor="description">Description : </label> <p>{product?.description}</p>
                    <label htmlFor="discount">Discount : </label><p>{product?.discountPercentage}</p>
                    <label htmlFor="price">Price : </label><p>{product?.price}</p>
                    <label htmlFor="rating">Rating : </label> <p>{product?.rating}</p>
                    <label htmlFor="stock">Stock : </label> <p>{product?.stock}</p>
                    {/* <p>{
                        product?.images.map((element,index) => {
                            return (
                                <div className="product-img" key={index}>
                                    <img src={element} alt="image" />
                                    <p>{element}</p>
                                </div>
                            )
                        })
                    }
                    </p> */}
                </div >
            </div >
        </Container >

    </>)
}