import '../Home/css/product.css'
import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../../entity/products";
import { deleteProduct, getProductList, getProductsCategories } from "../../service/product";
import ProductCategory from '../Product/ProductCategory';
import ProductComponent from '../Product/Product';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Container from '@mui/material/Container';
import { refreshToken } from '../../service/auth';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<string[] | undefined>()
    const [brands, setBrands] = useState<string[] | undefined>()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>();
    const [searchText, setSearchText] = useState<string>('')
    const [deleteMessage, setDeleteMessage] = useState<string>('')
    const [toggleView, setToggleView] = useState<boolean>(true)
    const [productsPerPage, setProductsPerPage] = useState<number>(12);

    useEffect(() => {
        getProducts();
        // getNewToken();
    }, []);

    useEffect(() => {
        if (products?.length > 0) {
            getCategories();
            getBrands();
        }
    }, [products])
    useEffect(() => {
        if (searchText) {
            searchProduct(searchText)
        } else {
            setProducts(products)
        }
    }, [searchText]);
    const getNewToken = async () => {
        let response = await refreshToken();
        console.log("new token::" + response.token)
    }
    const getProducts = async () => {
        try {
            setIsLoading(true)
            // let response = await getProductList()
            let response = await getProductList(Number(productsPerPage));
            setProducts(response)
            setIsLoading(false)
        } catch (error) {
            console.log(error)
        }
    }
    const getCategories = async () => {
        try {
            setIsLoading(true)
            let response = await getProductsCategories();
            setCategories(response)
            setIsLoading(false)
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
    const searchProduct = async (text: string) => {
        try {
            const filterBySearch = products.filter((product) => {
                if (
                    product?.title?.toLowerCase()?.includes(text?.toLowerCase()) ||
                    product?.category?.toLowerCase()?.includes(text?.toLowerCase()) ||
                    product?.description?.toLowerCase()?.includes(text?.toLowerCase()) ||
                    product?.brand?.toLowerCase()?.includes(text?.toLowerCase())
                ) {
                    return product;
                }
            })
            // console.log(filterBySearch)
            setProducts(filterBySearch);
        } catch (error) {
            console.log(error)
        }
    }
    const handleSearchInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(event?.target.value)
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
    const selectViewType = () => {
        setToggleView(!toggleView)
    }
    const handlePagination = async (event: SelectChangeEvent<number>) => {
        setProductsPerPage(Number(event?.target?.value))
        console.log("productsPerPage---" + event?.target?.value)
        console.log("productsPerPageq2---" + Number(productsPerPage))
        let response = await getProductList(Number(event?.target?.value))
        // let response = await getProductList(Number(productsPerPage))
        // console.log(response)
        setProducts(response)
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
                    <div> <h1>Products</h1></div>
                    <div className="search-card">
                        <TextField
                            id="search-bar"
                            // className="text"
                            variant="outlined"
                            placeholder="Search..."
                            size="small"
                            value={searchText}
                            onChange={(event) => {
                                handleSearchInput(event)
                            }}
                        />
                    </div>
                    <div className='view-icons'>
                        <ListIcon fontSize="large" onClick={() => { selectViewType() }} />
                        <GridViewIcon fontSize="medium" onClick={() => { selectViewType() }} />
                    </div>
                    <div className='pagination'>
                        <label htmlFor="selectPage">Show:  </label>
                        <Select id="selectPage"
                            value={productsPerPage}
                            onChange={(event) => { handlePagination(event) }} >
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={25}>25</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                            <MenuItem value={100}>100</MenuItem>
                            <MenuItem value={200}>200</MenuItem>
                        </Select>
                    </div>
                    <div><Button variant='contained' onClick={() => handleAddProduct()}>Add Product</Button></div>
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
                    <div className={toggleView ? "product-cardCover-gridView" : "product-cardCover-listView"}>
                        {
                            products.length > 0 &&
                            products.map((product, index) => {
                                return (
                                    <ProductComponent
                                        key={index}
                                        index={index}
                                        product={product}
                                        categories={categories}
                                        brands={brands}
                                        toggleView={toggleView}
                                        handleDelete={(index) => {
                                            handleDelete(index)
                                        }}
                                    />
                                )
                            })
                        }
                    </div>
                </section>
            </div >
        </div >
    </>)
}