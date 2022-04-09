import React, {useState} from 'react';
import {Grid} from '@material-ui/core';
import ProductoCatalogo from './ProductoCatalogo/ProductoCatalogo';
import useStyles from './styles';
import {Button, Divider, Menu, MenuItem, Pagination} from "@mui/material";
import { Icon } from '@iconify/react';
import Box from "@mui/material/Box";
import { Producto } from '../../shared/shareddtypes';

const ProductosCatalogo = ({productos} : {productos : Producto[]}) => {


    // Ordenar
    const [open, setOpen] = useState(null);

    const handleOpen = (event : any) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
       // TODO
        setOpen(null)
    };

    const ordenarAsc = (lista : Producto[]) => {
        lista.sort((a, b) => a.price - b.price);
        handleClose();
    }
    
    const ordenarDesc = (lista : Producto[])  => {
        lista.sort((a, b) => - a.price + b.price);
        handleClose();
    }

    const classes = useStyles();
    return (
        <>
            <main className={classes.main}>
                <div className={classes.titulo}>
                    <Box component="h1" color="indigo" >Catálogo de productos</Box>
                    <Divider />
                </div>

                <div className={classes.filtro}>
                    <Button onClick={handleOpen} disableRipple className={classes.paginacion}>
                        Ordenar
                        <Icon icon="ic:round-filter-list" />
                    </Button>
                </div>

                <Menu
                    keepMounted
                    anchorEl={open}
                    open={Boolean(open)}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <MenuItem onClick={() => ordenarAsc(productos)}>Precio ascendente</MenuItem>
                    <MenuItem onClick={() => ordenarDesc(productos)}>Precio descendente</MenuItem>
                </Menu>
                <Grid container justifyContent="center" spacing={1}>
                    {productos.map((producto : any) => (
                        <Grid item key={producto.ids} xs={12} sm={6} md={4} lg={3}>
                            <ProductoCatalogo producto={producto} />
                        </Grid>
                    ))}
                </Grid>
                <Pagination className={classes.paginacion} count={10} shape="rounded" />
            </main>
        </>
    );
}

export default ProductosCatalogo;