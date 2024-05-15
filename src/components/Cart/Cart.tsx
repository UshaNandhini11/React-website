import './cart.css'
import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { getCartByUserId } from "../../service/cart";
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

    return (<>
        <Container>
            <Box>
                <h1>Carts Page</h1>
                {
                    userCart?.carts.map((cart) => (
                        <div key={cart.id} className='carts'>
                            {
                                cart.products.map((product) => (
                                    <div key={product.id}>
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
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </Box>
        </Container ></>
    )
}