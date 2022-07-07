import fs from 'fs'

let CarritoProductos = []

const getCarritoProductosbyID = async(req, res) => {
    try {
        const { id } = req.params
        let DatosLeidos = await fs.promises.readFile(`./src/controllers/CarritoProductos.txt`)
        console.log(DatosLeidos)
        if (DatosLeidos != '') {
            CarritoProductos = JSON.parse(DatosLeidos)
            const car = CarritoProductos.filter(carrito => {
                return carrito.id === Number(id)
            })
            if (car.length == 0) {
                res.json({ "Mensaje": "El id del carrito no existe" })
            } else {
                res.json(car[0].productos)
            }
        } else {
            res.json({ "Mensaje": "El catalogo de carritos esta vacio" })
        }

    } catch (e) {
        console.log('Error:', e)
        res.sendStatus(500)
    }
}

const delCarrito = async(req, res) => {
    try {
        const { id } = req.params
        let DatosLeidos = await fs.promises.readFile(`./src/controllers/CarritoProductos.txt`)
            //console.log(DatosLeidos)
        if (DatosLeidos != '') {
            CarritoProductos = JSON.parse(DatosLeidos)
            const index = CarritoProductos.findIndex(carrito => {
                return carrito.id === Number(id);
            });

            if (index == -1) {
                res.json({ "Mensaje": `El carrito id ${id}  no existe` })
            } else {


                CarritoProductos.splice(index, 1);
                await fs.promises.writeFile(`./src/controllers/CarritoProductos.txt`, JSON.stringify(CarritoProductos))
                res.json({ "Mensaje": `El carrito con el id ${id} ha sido Eliminado` })
            }
        } else {
            res.json({ "Mensaje": "El catalogo de carritos esta vacio" })
        }
    } catch (e) {
        console.log('Error:', e)
        res.sendStatus(500)
    }
}

const addCarrito = async(req, res) => {
    try {
        //console.log(req.body)
        //const { nombre } = req.body
        let indexCarrito = 1
        let DatosLeidos = await fs.promises.readFile(`./src/controllers/CarritoProductos.txt`)
        if (DatosLeidos != '') {
            CarritoProductos = JSON.parse(DatosLeidos)
            indexCarrito = Number(CarritoProductos[CarritoProductos.length - 1].id) + 1
        }
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        //console.log(today)
        CarritoProductos.push({ "id": indexCarrito, "timestamp": today, "productos": [] })
        await fs.promises.writeFile(`./src/controllers/CarritoProductos.txt`, JSON.stringify(CarritoProductos))
        res.json(`Se agrego un nuevo carrito con el id ${indexCarrito}`)

    } catch (e) {
        console.log('Error:', e)
        res.sendStatus(500)
    }
}

const addCarritoProductos = async(req, res) => {
    try {
        //console.log(req.body)
        const { id } = req.params
        const { id_product, nombre, descripcion, codigo, foto, precio, cantidad } = req.body
        let DatosLeidos = await fs.promises.readFile(`./src/controllers/CarritoProductos.txt`)
        if (DatosLeidos != '') {
            CarritoProductos = JSON.parse(DatosLeidos)
            const index = CarritoProductos.findIndex(carrito => {
                return carrito.id === Number(id);
            });

            if (index == -1) {
                res.json({ "Mensaje": `El carrito id ${id}  no existe` })
            } else {
                const index_producto = CarritoProductos[index].productos.findIndex(producto => {
                    return producto.id === Number(id_product);
                });

                if (index_producto == -1) {
                    CarritoProductos[index].productos.push({ "id": id_product, nombre, descripcion, codigo, foto, precio, cantidad })
                } else {
                    let cantidadActual = Number(CarritoProductos[index].productos[index_producto].cantidad)
                    CarritoProductos[index].productos[index_producto].cantidad = cantidadActual + Number(cantidad);
                }
                await fs.promises.writeFile(`./src/controllers/CarritoProductos.txt`, JSON.stringify(CarritoProductos))
                res.json(`Se agrego un nuevo producto al carrito con el id ${id}`)
            }
        } else {
            res.json({ "Mensaje": "El catalogo de carritos esta vacio" })
        }

    } catch (e) {
        console.log('Error:', e)
        res.sendStatus(500)
    }
}

const delCarritoProductos = async(req, res) => {
    try {
        //console.log(req.body)
        const { id, id_prod } = req.params
        let DatosLeidos = await fs.promises.readFile(`./src/controllers/CarritoProductos.txt`)
        if (DatosLeidos != '') {
            CarritoProductos = JSON.parse(DatosLeidos)
            const index = CarritoProductos.findIndex(carrito => {
                return carrito.id === Number(id);
            });

            if (index == -1) {
                res.json({ "Mensaje": `El carrito id ${id}  no existe` })
            } else {

                const index_producto = CarritoProductos[index].productos.findIndex(producto => {
                    return producto.id === Number(id_prod);
                });


                if (index_producto == -1) {
                    res.json({ "Mensaje": `El producto con id ${id_prod} no existe en el carrito id ${id}` })
                } else {
                    let cantidadActual = Number(CarritoProductos[index].productos[index_producto].cantidad)
                    if (cantidadActual > 1) {
                        CarritoProductos[index].productos[index_producto].cantidad = cantidadActual - 1;
                    } else {
                        CarritoProductos[index].productos.splice(index_producto, 1);
                    }
                    await fs.promises.writeFile(`./src/controllers/CarritoProductos.txt`, JSON.stringify(CarritoProductos))
                    res.json({ "Mensaje": `El producto con el id ${id_prod} ha sido Eliminado del carrio id ${id}` })
                }
            }
        } else {
            res.json({ "Mensaje": "El catalogo de carritos esta vacio" })
        }

    } catch (e) {
        console.log('Error:', e)
        res.sendStatus(500)
    }
}



export {
    getCarritoProductosbyID,
    delCarrito,
    addCarrito,
    addCarritoProductos,
    delCarritoProductos
}