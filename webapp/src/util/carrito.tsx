import { Producto, ProductoCarrito } from "../shared/shareddtypes";

export const getCarrito = (): ProductoCarrito[] => {
    let carritoString = sessionStorage.getItem('carrito');
    if (carritoString != null)
        return JSON.parse(carritoString);

    return [];
}

export const getProductosIndividualesCarrito = (): Producto[] => {
    const productos: Producto[] = [];
    const productosStr = sessionStorage.getItem("carrito");
    if (productosStr) {
        const productosCarrito: any[] = JSON.parse(productosStr);
        // Transformamos el número de unidades en productos individuales
        for (let i = 0; i < productosCarrito.length; i++) {
            const productoCarrito = productosCarrito.at(i);
            for (let j = 0; j < productoCarrito.cantidad; j++) {
                productos.push(productoCarrito.producto)
            }
        }
    }
    return productos;
}


// Guarda el producto en la sesión.
export const añadirAlCarrito = (producto: Producto) => {
    let carrito = getCarrito();
    let entrada : ProductoCarrito | undefined = carrito.find(elem => elem.producto._id === producto._id);
    if (entrada) {
        let entradaIndice = carrito.indexOf(entrada);
        let newEntrada : ProductoCarrito;
        if (entrada.cantidad === 0)
            newEntrada = { producto: entrada.producto, cantidad: 1, precioTotal: entrada.producto.price };
        else
            newEntrada = {producto: entrada.producto, cantidad: entrada.cantidad + 1, precioTotal: entrada.precioTotal + producto.price};
        carrito.splice(entradaIndice, 1, newEntrada)

        sessionStorage.setItem('carrito', JSON.stringify(carrito))
    }

}


// Eliminamos el producto en la sesión.
export const eliminarAlCarrito = (producto: Producto) => {
    let carrito = getCarrito();
    let entrada : ProductoCarrito | undefined = carrito.find(elem => elem.producto._id === producto._id);
    if (entrada) {
        let entradaIndice = carrito.indexOf(entrada);

        if (entrada.cantidad === 1)
            carrito = carrito.filter(el => el !== entrada);
        else {
            let productoCarrito: ProductoCarrito = { producto: entrada.producto, cantidad: entrada.cantidad - 1, precioTotal: entrada.precioTotal - producto.price };
            carrito.splice(entradaIndice, 1, productoCarrito);
        }
        
        sessionStorage.setItem('carrito', JSON.stringify(carrito));
    }

    sessionStorage.setItem('carrito', JSON.stringify(carrito))
    window.location.reload();
}

export const añadirAlCarritoNuevoProducto = (producto: any) => {
    const carritoString = sessionStorage.getItem('carrito');
    let carrito = [];
    if (carritoString != null)
        carrito = JSON.parse(carritoString!);
    //let productoCarrito: ProductoCarrito = { producto: producto, cantidad: 1, precioTotal: parseFloat(producto.price) };

    let borrar=-1;
    let c=0;
    let p=0;
    carrito.forEach(function(value:any,index:any){

        if(value.producto._id===producto._id){
            borrar=index;
            c=value.cantidad;  
        }
    });


    if(borrar>=0){
        let productoCarrito: ProductoCarrito = { producto: producto, cantidad: c+1, precioTotal: parseFloat(producto.price)*(c+1) };

        carrito.splice(borrar,1,productoCarrito);
    }else{
        let productoCarrito: ProductoCarrito = { producto: producto, cantidad: 1, precioTotal: parseFloat(producto.price) };
        carrito.push(productoCarrito);
    }

    sessionStorage.setItem('carrito', JSON.stringify(carrito))

}