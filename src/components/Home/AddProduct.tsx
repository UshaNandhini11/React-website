import { Alert, Button, Container, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { Product } from "../../entity/products";
import { addProduct, getProductById, getProductsCategories, updateProduct } from "../../service/product";
import { useLocation } from "react-router-dom";

export default function AddProduct() {
    const location = useLocation()
    const [product, setProduct] = useState<Product>()
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [price, setPrice] = useState<number>(0)
    const [rating, setRating] = useState<number>(0)
    const [discount, setDiscount] = useState<number>(0)
    const [stock, setStock] = useState<number>(0)
    const [isProductAdded, setIsProductAdded] = useState<boolean>(false)
    const [isTitleError, setIsTitleError] = useState<boolean>(false)
    const [titleErrorText, setTitleErrorText] = useState<string>()
    const [isBrandError, setIsBrandError] = useState<boolean>(false)
    const [brandErrorText, setBrandErrorText] = useState<string>()
    const [isCategoryError, setIsCategoryError] = useState<boolean>(false)
    const [categoryErrorText, setCategoryErrorText] = useState<string>()
    const [isPriceError, setIspriceError] = useState<boolean>(false)
    const [priceErrorText, setPriceErrorText] = useState<string>()
    const [isStockError, setIsStockError] = useState<boolean>(false)
    const [stockErrorText, setStockErrorText] = useState<string>()
    const [categories, setCategories] = useState<string[] | undefined>()

    useEffect(() => {
        if (location.state.mode == 'edit') {
            getProductDetailsById(location.state.id)
        }
        getCategories();
    }, [])

    const handleTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(event.target.value)
    }
    const handlePrice = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPrice(Number(event.target.value))
    }
    const handleRating = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRating(Number(event.target.value))
    }
    const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }
    const handleBrand = (event: SelectChangeEvent<string>) => {
        setBrand(event.target.value)
    }
    const handleCategory = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value)
    }
    const handleDiscount = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDiscount(Number(event.target.value))
    }
    const handleStock = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStock(Number(event.target.value))
    }
    function validateForm(product: Product): boolean {
        if (price) {
            setPriceErrorText('')
            setIspriceError(false)
        } else {
            setPriceErrorText('Please enter price')
            setIspriceError(true)
        }
        if (stock) {
            setStockErrorText('')
            setIsStockError(false)
        } else {
            setStockErrorText('Please enter Stock')
            setIsStockError(true)
        }
        if (!brand) {
            setBrandErrorText('Please select a Brand')
            setIsBrandError(true)
        } else {
            setBrandErrorText('')
            setIsBrandError(false)
        }
        if (!category) {
            setCategoryErrorText('Please select a Category')
            setIsCategoryError(true)
        } else {
            setCategoryErrorText('')
            setIsCategoryError(false)
        }
        if (product.title.length == 0) {
            setIsTitleError(true)
            setTitleErrorText('Please enter Product Name')
            return false
        } else {
            setTitleErrorText('')
            setIsTitleError(false)
            return true
        }
    }
    const handleFormData = async () => {
        let product = new Product()
        product.title = title
        product.description = description
        product.price = Number(price)
        product.rating = Number(rating)
        product.brand = brand
        product.category = category
        product.discountPercentage = Number(discount)
        product.stock = Number(stock)

        if (validateForm(product)) {
            let response: Product;
            if (location.state.mode == 'edit') {
                response = await updateProduct(location.state.id, product)
            } else {
                response = await addProduct(product)
            }
            setProduct(response)
            if (response) {
                setIsProductAdded(!isProductAdded)
            }
        }
    }
    const getProductDetailsById = async (id: number) => {
        try {
            let response = await getProductById(id)
            setProduct(response)
            setTitle(response.title)
            setBrand(response.brand)
            setPrice(response.price)
            setDiscount(response.discountPercentage)
            setRating(response.rating)
            setCategory(response.category)
            setDescription(response.description)
            setStock(response.stock)
        } catch (error) {
            console.log(error)
        }
    }
    const getCategories = async () => {
        try {
            let response = await getProductsCategories()
            setCategories(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <Container style={{ backgroundColor: 'lightcoral' }} >
            <div className="add-product">
                <div >
                    {location.state.mode == "add" ?
                        <>
                            <h1>Add a Product</h1>
                            {
                                isProductAdded ?
                                    (<>
                                        <Alert variant="filled" severity="success">
                                            <p>{"Product Added Successfully by id: " + product?.id}</p>
                                        </Alert>
                                    </>) : null
                            }
                        </>
                        :
                        <>
                            <h1>Update a Product</h1>
                            {
                                isProductAdded ?
                                    (<>
                                        <Alert variant="filled" severity="success">
                                            <p>{"Product Updated Successfully by id: " + product?.id}</p>
                                        </Alert></>) : null
                            }
                        </>
                    }
                </div>
                <div className="add-product" >
                    <form className="reactForm" >
                        {/* <InputLabel htmlFor="name">Product Name:</InputLabel> */}
                        <TextField type="text"
                            id="title"
                            label="Product Name"
                            variant="outlined"
                            placeholder="Enter product Name"
                            value={title}
                            error={isTitleError}
                            helperText={titleErrorText}
                            onChange={(event) => { handleTitle(event) }} /><br />

                        <InputLabel htmlFor="brand">Brand :</InputLabel>
                        <Select
                            id="brand"
                            labelId="Brand"
                            value={brand}
                            placeholder="select Brand"
                            error={isBrandError}
                            onChange={(event) => { handleBrand(event) }} >
                            {
                                location.state.brands.map((brand: string, index: number) => {
                                    return (
                                        <MenuItem key={index} value={brand}>{brand}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <FormHelperText>{brandErrorText}</FormHelperText><br />

                        {/* <InputLabel htmlFor="price">Price:</InputLabel> */}
                        <TextField type="number"
                            id="price"
                            label="Price"
                            variant="outlined"
                            placeholder="Enter Price"
                            value={price}
                            error={isPriceError}
                            helperText={priceErrorText}
                            onChange={(event) => { handlePrice(event) }}
                        /><br />

                        {/* <InputLabel htmlFor="rating">Rating:</InputLabel> */}
                        <TextField type="number"
                            id="rating"
                            label="Rating"
                            variant="outlined"
                            placeholder="Enter rating"
                            value={rating}
                            onChange={(event) => { handleRating(event) }}
                        /><br />

                        <InputLabel htmlFor="description">Product Description:</InputLabel>
                        <textarea name="description"
                            id="description"
                            placeholder="Enter description"
                            cols={30} rows={10}
                            value={description}
                            onChange={(event) => { handleDescription(event) }} />
                        <br />

                        <InputLabel htmlFor="category">Category :</InputLabel>
                        <Select id="category"
                            value={category}
                            error={isCategoryError}
                            placeholder="select Category"
                            onChange={(event) => { handleCategory(event) }} >
                            {
                                //  location.state.categories.map((category: string, index: number) => {
                                categories?.map((category: string, index: number) => {
                                    return (
                                        <MenuItem key={index} value={category}>{category}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                        <FormHelperText>{categoryErrorText}</FormHelperText><br />
                        <br />
                        <InputLabel htmlFor="discount">Discount:</InputLabel>
                        <TextField type="number"
                            id="discount"
                            variant="outlined"
                            placeholder="Enter discount"
                            value={discount}
                            onChange={(event) => { handleDiscount(event) }}
                        /><br />
                        <InputLabel htmlFor="stock">Stock:</InputLabel>
                        <TextField type="number"
                            id="stock"
                            variant="outlined"
                            placeholder="Enter stock"
                            value={stock}
                            error={isStockError}
                            helperText={stockErrorText}
                            onChange={(event) => { handleStock(event) }}
                        /><br />
                        {
                            location.state.mode == 'add' ? (<>
                                <Button onClick={() => handleFormData()} variant="contained">Submit</Button>
                            </>)
                                :
                                (<>
                                    <Button onClick={() => handleFormData()} variant="contained">Update</Button>
                                </>)
                        }
                    </form>
                </div>
            </div>
        </Container >
    )
}