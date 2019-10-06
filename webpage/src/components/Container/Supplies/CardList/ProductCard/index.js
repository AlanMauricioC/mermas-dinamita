import React from 'react'
import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/styles';
import { Grid, Grow } from '@material-ui/core';
import ProductCardContent from "./ProductCardContent";
import DialogUpdateProduct from "./DialogUpdateProduct";

const ProductCard = ({ card }) => {
    const useStyles = makeStyles({
        root: {
            border: 0,
            boxShadow: '5px 4px 18px -2px rgba(0,0,0,0.75)',
            margin: 10,
            borderRadius: '10px'
        },
        media: {
            height: 0,
            backgroundColor: 'white',
            paddingTop: '70.25%', // 16:9
        },
    });

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return <Grid item xs={12} sm={6} md={4} lg={3}>
        <Grow in={true}>
            <Card className={classes.root} onClick={handleClickOpen}>
                <CardContent>
                    <ProductCardContent content={card}></ProductCardContent>
                </CardContent>
            </Card>
        </Grow>
        <DialogUpdateProduct handleClose={handleClose} open={open} card={card}></DialogUpdateProduct>
    </Grid>
}
//julioalarcon962@gmail.com
export default ProductCard