import '../Home/css/product.css'
import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../../entity/products";
import { deleteProduct, getProductList, getProductsCategories, searchProducts } from "../../service/product";
import ProductCategory from '../Product/ProductCategory';
import ProductComponent from '../Product/Product';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[] | undefined>()
    const [brands, setBrands] = useState<string[] | undefined>()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true);
    const [searchedProducts, setSearchedProducts] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState<string>('')
    const [deleteMessage, setDeleteMessage] = useState<string>('')

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
        if (products?.length > 0) {
            getCategories();
            getBrands();
        }
    }, [products])

    useEffect(() => {
        const delaySearchInput = setTimeout(() => {
            if (searchText) {
                searchProduct();
            } else {
                setSearchedProducts([])
            }
        }, 1000)

        return () => clearTimeout(delaySearchInput);
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
    }
    const handleDelete = async (id: number) => {
        try {
            let response = await deleteProduct(id)
            if (response) {
                setDeleteMessage('Product Deleted Successfully - Id : ' + id)
            }
            setTimeout(() => {
                setDeleteMessage("");
            }, 5000);
            getProducts();
        } catch (error) {
            console.log("Error in Delete Product :: " + error)
        }
    }
    return (<>
        <div>
            <div className="categories">
                <Container>
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
                </Container>
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
                <section>
                    {
                        deleteMessage ? (<>
                            <Alert variant="filled" severity="success">
                                {deleteMessage}
                            </Alert>
                        </>
                        ) : (<></>)
                    }
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
                                                    handleDelete={(index) => {
                                                        handleDelete(index)
                                                    }}
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
                                                        handleDelete={(index) => {
                                                            handleDelete(index)
                                                        }}
                                                    // handleAddCart={() => {

                                                    // }}
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