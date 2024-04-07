import Container from "@mui/material/Container";
import './product.css'

export default function Products() {
    const products = [
        {
            name: 'product1'
        },
        {
            name: 'product2'
        },
        {
            name: 'product3'
        },
        {
            name: 'product4'
        },
        {
            name: 'product5'
        },
        {
            name: 'product6'
        },
        {
            name: 'product7'
        }
    ]
    return (<>
        <Container>
            <header>
                <h1>Products</h1>
            </header>
            <section className="productList">
                {
                    products.map((element, index) => {
                        return (
                            <div className="product">
                                <div key={index}>
                                    <p>{element.name}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </section>
        </Container>
    </>)
}