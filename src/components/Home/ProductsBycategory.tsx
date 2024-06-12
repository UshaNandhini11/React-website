import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { getproductsBycategory } from "../../service/product"
import { Product } from "../../entity/products"
import ProductComponent from "../Product/Product"

export default function ProductsBycategory() {
    const location = useLocation()
    const [productsBycategory, setProductsByCategory] = useState<Product[]>()

    useEffect(() => {
        loadproductsBycategory(location.state.category)
    }, [])

    const loadproductsBycategory = async (categoryName: string) => {
        try {
            let response = await getproductsBycategory(categoryName)
            setProductsByCategory(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (<>
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', margin: 20, padding: 20, backgroundColor: 'hotpink' }} >
                {
                    productsBycategory?.map((productBycategory, index) => {
                        return (
                            <div key={index}>
                                <ProductComponent index={index} product={productBycategory} categories={undefined} brands={location.state.brands}
                                    handleDelete={function (index: number): void {
                                    }} toggleView={false} />
                            </div>
                        )
                    })
                }
            </div>
        </div> </>)
}