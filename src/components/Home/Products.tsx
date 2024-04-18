import './product.css'
import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../../entity/products";
import { getProductList, getProductsCategories, searchProducts } from "../../service/product";
import ProductCategory from '../ProductCategory';
import ProductComponent from '../Product';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[] | undefined>()
    const [brands, setBrands] = useState<string[] | undefined>()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState<string>('')

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

    useEffect(() => {
        if (searchText) {
            searchProduct();
        } else {
            setSearchedProducts([])
        }
    }, [searchText]);

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
    const searchProduct = async () => {
        try {
            let response = await searchProducts(searchText)
            setSearchedProducts(response)
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setSearchText(event?.target.value)
        console.log("search Text!!!" + searchText)
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
                    <div className="search-card">
                        <TextField
                            id="search-bar"
                            className="text"
                            variant="outlined"
                            placeholder="Search..."
                            size="small"
                            value={searchText}
                            onChange={(event) => {
                                handleSearch(event)
                            }}
                        />
                    </div>
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
                            searchedProducts.length > 0 ?
                                (<>
                                    {
                                        searchedProducts.map((product, index) => {
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
                                </>
                                ) : (
                                    <>
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
                                    </>
                                )


                        }
                    </div>
                </section>
            </div >
        </div>
    </>)
}