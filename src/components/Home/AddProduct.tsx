import { Button, Container, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { Product } from "../../entity/products";
import { addProduct } from "../../service/product";

export default function AddProduct() {
    const [product, setProduct] = useState<Product>()
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [price, setPrice] = useState<string>()
    const [rating, setRating] = useState<string>()
    const [discount, setDiscount] = useState<string>()
    const [stock, setStock] = useState<string>()
    const [thumbnail, setThumbnail] = useState<string>()
    const [isProductAdded, setIsProductAdded] = useState<boolean>(false)
    const [isTitleEmpty, setIsTitleEmpty] = useState<boolean>(false)
    const [titleErrorText, setTitleErrorText] = useState<string>()
    const [isBrandSelected, setIsBrandSelected] = useState<boolean>(false)
    const [brandErrorText, setBrandErrorText] = useState<string>()
    const [isCategorySelected, setIsCategorySelected] = useState<boolean>(false)
    const [categoryErrorText, setCategoryErrorText] = useState<string>()
    const [isPriceEmpty, setIspriceEmpty] = useState<boolean>(false)
    const [priceErrorText, setPriceErrorText] = useState<string>()
    const [isDescriptionEmpty, setIsDescriptionEmpty] = useState<boolean>(false)
    const [descriptionErrorText, setDescriptionErrorText] = useState<string>()
    const [isStockEmpty, setIsStockEmpty] = useState<boolean>(false)
    const [stockErrorText, setStockErrorText] = useState<string>()

    const handleTitle = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(event.target.value)
    }
    const handlePrice = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPrice(event.target.value)
    }
    const handleRating = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRating(event.target.value)
    }
    const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value)
    }
    const handleBrand = (event: SelectChangeEvent<string>) => {
        setBrand(event.target.value)
        setIsBrandSelected(true)
    }
    const handleCategory = (event: SelectChangeEvent<string>) => {
        setCategory(event.target.value)
    }
    const handleDiscount = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDiscount(event.target.value)
    }
    const handleStock = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setStock(event.target.value)
    }
    function validateForm(product: Product): boolean {
        let validRegex = /^[0-9]{10}$/;
        if (!validRegex.test(String(product.price))) {
            setIspriceEmpty(true)
            setPriceErrorText('Please enter price')
        }

        if (!validRegex.test(String(product.stock))) {
            setIsStockEmpty(true)
            setStockErrorText('Please enter Stock')
        } else {
            setStockErrorText('')
        }

        if (!isBrandSelected) {
            setBrandErrorText('Please select a Brand')
            setIsBrandSelected(true)
        } else {
            setBrandErrorText('')
            setIsBrandSelected(false)
        }

        if (!isCategorySelected) {
            setCategoryErrorText('Please select a Category')
            setIsCategorySelected(true)
        } else {
            setCategoryErrorText('')
            setIsCategorySelected(false)
        }

        if (product.description.length == 0) {
            setIsDescriptionEmpty(true)
            setDescriptionErrorText('Please enter Product Description')
        } else {
            setDescriptionErrorText('')
            setIsDescriptionEmpty(false)
        }

        if (product.title.length == 0) {
            setIsTitleEmpty(true)
            setTitleErrorText('Please enter Product Name')
            return false
        } else {
            setTitleErrorText('')
            setIsTitleEmpty(false)
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
            let response = await addProduct(product)
            setProduct(response)
            if (response) {
                setIsProductAdded(!isProductAdded)
            }
        }
    }
    return (
        <Container style={{ backgroundColor: 'lightcoral' }} >
            <div className="add-product">
                <div >
                    <h1>Add a Product</h1>
                    {
                        isProductAdded ?
                            (<>
                                <p>{"Product Added Successfully by id: " + product?.id}</p>
                            </>)
                            :
                            null
                    }
                </div>
                <div className="add-product" >
                    <form className="reactForm" >
                        <InputLabel htmlFor="name">Product Name:</InputLabel>
                        <TextField type="text"
                            id="title"
                            variant="outlined"
                            placeholder="Enter Title"
                            value={title}
                            error={isTitleEmpty}
                            helperText={titleErrorText}
                            onChange={(event) => { handleTitle(event) }} />

                        <InputLabel id="brand">Brand :</InputLabel>
                        <Select
                            labelId="brand"
                            id="brand"
                            value={brand}
                            placeholder="select Brand"
                            error={isBrandSelected}
                            onChange={(event) => { handleBrand(event) }} >
                            <MenuItem value="Apple">Apple</MenuItem>
                            <MenuItem value="Samsung">Samsung</MenuItem>
                            <MenuItem value="Vivo">Vivo</MenuItem>
                            <MenuItem value="OnePlus">OnePlus</MenuItem>
                            <MenuItem value="Oppo">Oppo</MenuItem>
                            <MenuItem value="Huawei">Huawei</MenuItem>
                            <MenuItem value="L'Oreal Paris">L'Oreal Paris</MenuItem>
                            <MenuItem value="Hemani Tea">Hemani Tea</MenuItem>
                            <MenuItem value="Dermive">Dermive</MenuItem>
                        </Select>
                        <FormHelperText>{brandErrorText}</FormHelperText><br />

                        <InputLabel htmlFor="price">Price:</InputLabel>
                        <TextField type="number"
                            id="price"
                            variant="outlined"
                            placeholder="Enter Price"
                            value={price}
                            error={isPriceEmpty}
                            helperText={priceErrorText}
                            onChange={(event) => { handlePrice(event) }}
                        /><br />

                        <InputLabel htmlFor="rating">Rating:</InputLabel>
                        <TextField type="number"
                            id="rating"
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

                        <InputLabel id="category">Category :</InputLabel>
                        <Select id="category"
                            value={category}
                            error={isCategorySelected}
                            placeholder="select Category"
                            onChange={(event) => { handleCategory(event) }} >
                            <MenuItem value="skincare">skincare</MenuItem>
                            <MenuItem value="Smartphones">Smartphones</MenuItem>
                            <MenuItem value="Laptops">Laptops</MenuItem>
                            <MenuItem value="Home-decors">Home-decors</MenuItem>
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
                            error={isStockEmpty}
                            helperText={stockErrorText}
                            onChange={(event) => { handleStock(event) }}
                        /><br />
                        <Button onClick={() => handleFormData()} variant="contained">Submit</Button>
                    </form>
                </div>
            </div>
        </Container >
    )
}


