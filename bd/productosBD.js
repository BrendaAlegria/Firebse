var conexion=require("./conexion").conexionProductos;
var Producto=require("../modelos/Producto");

async function mostrarProductos(){
    var prods=[];
    try{
        var productos = await conexion.get();
        console.log(productos.nombre);
        productos.forEach(producto => {
            var prod=new Producto(producto.id, producto.data());
            if (prod.bandera == 0){
                prods.push(prod.obtenerDatos);
            }
        });
    }
    catch(err){
        console.log("Error al recuperar productos de la BD: " + err);
    }
    return prods;
}

async function BuscarPorID(id){
    var product;
    try{
        var producto=await conexion.doc(id).get();
        var productoObjeto=new Producto(producto.id, producto.data());
        if (productoObjeto.bandera==0){
            product=productoObjeto.obtenerDatos;
        }
    }
    catch(err){
        console.log("Error al recuperar al producto "+err);
    }
    return product;
}

async function nuevoProducto(datos){
    var product=new Producto(null,datos);
    var error=1;
    if (product.bandera==0){
        try{
            await conexion.doc().set(product.obtenerDatos);
            console.log("Producto insertado a la BD");
            error=0;
        }
        catch(err){
            console.log("Error al capturar el nuevo producto "+err);
        }
    }
    return error;
}

async function modificarProducto(datos){ 
    var product=new Producto(datos.id,datos);
    var error=1;
    if (product.bandera==0){
        try{
            await conexion.doc(product.id).set(product.obtenerDatos);
            console.log("Producto actualizado ");
            error=0;
        }
        catch(err){
            console.log("Error al modificar al producto "+err);
        }
    }
    return error;
}

async function borrarProducto(id){
    try{
        await conexion.doc(id).delete();
        console.log("Producto borrado ");
    }
    catch(err){
        console.log("Error al borrar al producto "+err);
    }
}

module.exports={
    mostrarProductos,
    BuscarPorID,
    nuevoProducto,
    modificarProducto,
    borrarProducto
}