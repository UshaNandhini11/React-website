import { useNavigate } from "react-router-dom"
import { Product } from "../../entity/products"
import Button from "@mui/material/Button"
import { useState } from "react"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import TextField from "@mui/material/TextField"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"

interface ProductProps {
    index: number
    product: Product
    categories: string[] | undefined
    brands: String[] | undefined
    handleDelete: (index: number) => void
}
export default function ProductComponent(props: ProductProps) {
    const navigate = useNavigate()
    const [open, setOpen] = useState<boolean>(false);
    // const [quantity, setQuantity] = useState<string>()

    const handleClick = () => {
        navigate('/productDetails', { state: { id: props.product.id } })
    }
    const handleEdit = () => {
        navigate('/addProduct', {
            state: {
                mode: 'edit',
                id: props.product.id,
                categories: props.categories,
                brands: props.brands
            }
        })
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleToCart = () => {

        navigate('/')
    }

    return (<>
        <div className="productContent">
            <div className="product-card" key={props.product.id}
                onClick={() => {
                    handleClick()
                }} >
                <div style={{ position: 'relative' }}>
                    <img src={props.product.thumbnail} alt="img1" height={280} width={570} />
                </div>
                <div >
                    <h2>{props.product.title}</h2>
                    <div className="product-info" >
                        <h4>{props.product.brand}</h4>
                        <h4><i className="fa-solid fa-star"></i>  {props.product.rating}</h4>
                    </div>
                </div>
            </div>
            <div className="product-actions">
                <div className="cart-btn">
                    <Button variant='contained' onClick={() => {
                        handleClickOpen()
                    }}>Add to cart</Button>
                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            const formData = new FormData(event.currentTarget);
                            const formJson = Object.fromEntries((formData as any).entries());
                            const quantity = formJson.quantity
                            console.log(quantity);
                            handleToCart();
                            handleClose();
                        },
                    }}
                >
                    <DialogTitle>Add Product to your cart </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Select product's quantity
                        </DialogContentText>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="quantity"
                            label="Quantity"
                            type="number"
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' onClick={handleClose}>Cancel</Button>
                        <Button variant='contained' type="submit">Add To cart</Button>
                    </DialogActions>
                </Dialog>
                <div className="delete-icon" onClick={() => { props.handleDelete(props.product.id) }}><i className="fa-solid fa-trash"></i></div>
                <div className="edit-icon" onClick={() => { handleEdit() }}><i className="fas fa-edit"></i></div>
            </div>

        </div>
    </>)
}