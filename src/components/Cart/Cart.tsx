import { Box, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Carts } from "../../entity/carts";
import { getCartByUserId } from "../../service/cart";
import { useLocation } from "react-router-dom";
import { authenticateUser } from "../../service/auth";
import { Profile } from "../../entity/profile";

export default function UserCart() {
    const location = useLocation()
    const [authUser, setAuthUser] = useState<Profile>();
    const [userCart, setUserCart] = useState<Carts[]>()
    useEffect(() => {
        authenticatedUser()
    }, [])

    // useEffect(() => {
    //     console.log("auth id in carts   ::" + location.state.authUser?.id)
    //     if (location.state.authUser?.id) {
    //         setTimeout(() => {
    //             cartByUserId(Number(location.state.authUser?.id));
    //         }, 2000);
    //     }
    // }, [authUser])

    const authenticatedUser = async () => {
        let response = await authenticateUser();
        setAuthUser(response)
        console.log("auth id in carts   ::" + response.id)
        let cartResponse = await getCartByUserId(Number(response.id));
        setUserCart(cartResponse)

    }
    // const cartByUserId = async (id: number) => {
    //     await getCartByUserId(id);
    //     setUserCart(response)
    // }
    return (<>
        <Container>
            <Box>
                <h1>Carts Page</h1>
                {
                    userCart?.map((element) => (
                        <>
                            <p>{element.id}</p>
                            <p>{element.products.map((product) => (
                                <p>{product.title}</p>
                            ))}</p>
                        </>
                    ))
                    // userCart?.products.map((element) => (
                    //     <p>{element.id}</p>
                    // )
                    // )
                }
            </Box>
        </Container ></>
    )
}