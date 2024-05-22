import './cart.css'
import { Box, Button, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { deleteProductFromCart, getCartByUserId } from "../../service/cart";
import { authenticateUser } from "../../service/auth";
import { CartsResponse } from "../../entity/cartsResponse";

export default function UserCart() {
    const [userCart, setUserCart] = useState<CartsResponse | undefined>()
    useEffect(() => {
        authenticatedUser()
    }, [])

    const authenticatedUser = async () => {
        let response = await authenticateUser();
        let cartResponse = await getCartByUserId(Number(response.id));
        setUserCart(cartResponse)
    }

    const handleDeleteProduct = async (productId: number) => {
        let response = await deleteProductFromCart(productId);
        // getCartByUserId()

    }
    return (<>
        <div className='maincontainer'>
            <Box className='container'>
                <h1>Cart Items</h1>
                {
                    userCart?.carts.map((cart) => (
                        <div key={cart.id} className='carts'>
                            {
                                cart.products.map((product) => (
                                    <div key={product.id}>
                                        < Container>
                                            <div className="cartProduct">
                                                <form >
                                                    <table>
                                                        <tbody>
                                                            <tr>
                                                                <td><label htmlFor="productName">Product Name : </label></td>
                                                                <td><p>{product.title}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><label htmlFor="quantity">Quantity: </label></td>
                                                                <td><p>{product.quantity}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><label htmlFor="price">Product price : </label></td>
                                                                <td><p>{product.price}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><label htmlFor="discountPercentage">Discounted Percentage : </label></td>
                                                                <td><p>{product.discountPercentage}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><label htmlFor="discountAmt">Discounted amount : </label></td>
                                                                <td><p>{product.discountedPrice}</p></td>
                                                            </tr>
                                                            <tr>
                                                                <td><label htmlFor="total">Total Amount: </label></td>
                                                                <td><p>{product.total}</p></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </form>
                                                <div>
                                                    <Button variant='contained' onClick={() => handleDeleteProduct(product.id)}>Delete Product</Button>
                                                </div>
                                            </div>
                                        </Container>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </Box >
        </div>
    </>
    )
}