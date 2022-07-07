import fs from 'fs'

let productos = []

const getProductos = async(req, res) => {
    try {
        let DatosLeidos = await fs.promises.readFile(`./src/controllers/Productos.txt`)
            //console.log(DatosLeidos)
        if (DatosLeidos != '') {
            productos = JSON.parse(DatosLeidos)
            res.json(productos)
        } else {
            res.json({ "Mensaje": "El catalogo de productos esta vacio" })
        }
    } catch (e) {
        console.log('Error:', e)
        res.sendStatus(500)
    }
}

const getProductosbyID = async(req, res) => {
    try {
        const { id } = req.params
        let DatosLeidos = await fs.promises.readFile(`./src/controllers/Productos.txt`)
            //console.log(DatosLeidos)
        if (DatosLeidos != '') {
            productos = JSON.parse(DatosLeidos)
            const product = productos.filter(producto => {
                return producto.id === Number(id)
            })
            if (product.length == 0) {
                res.json({ "Mensaje": "El id del producto no existe" })
            } else {
                res.json(product)
            }
        } else {
            res.json({ "Mensaje": "El catalogo de productos esta vacio" })
        }

    } catch (e) {
        console.log('Error:', e)
        res.sendStatus(500)
    }
}

const updateProductos = async(req, res) => {
    try {
        const { id } = req.params
        let DatosLeidos = await fs.promises.readFile(`./src/controllers/Productos.txt`)
            //console.log(DatosLeidos)
        if (DatosLeidos != '') {
            productos = JSON.parse(DatosLeidos)
            const index = productos.findIndex(producto => {
                return producto.id === Number(id);
            });

            if (index == -1) {
                res.json({ "Mensaje": `El id ${id} del producto no existe` })
            } else {
                let today = new Date()
                let dd = String(today.getDate()).padStart(2, '0');
                let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                let yyyy = today.getFullYear();

                today = mm + '/' + dd + '/' + yyyy;
                //console.log(today)
                const { nombre, descripcion, codigo, foto, precio, stock } = req.body
                productos[index] = { "id": Number(id), "timestamp": today, nombre, descripcion, codigo, foto, precio, stock }
                await fs.promises.writeFile(`./src/controllers/Productos.txt`, JSON.stringify(productos))
                res.json({ "Mensaje": `El producto con el id ${id} ha sido modificado` })
            }
        } else {
            res.json({ "Mensaje": "El catalogo de productos esta vacio" })
        }
    } catch (e) {
        console.log('Error:', e)
        res.sendStatus(500)
    }
}

const delProductos = async(req, res) => {
    try {
        const { id } = req.params
        let DatosLeidos = await fs.promises.readFile(`./src/controllers/Productos.txt`)
            //console.log(DatosLeidos)
        if (DatosLeidos != '') {
            productos = JSON.parse(DatosLeidos)
            const index = productos.findIndex(producto => {
                return producto.id === Number(id);
            });

            if (index == -1) {
                res.json({ "Mensaje": `El id ${id} del producto no existe` })
            } else {


                productos.splice(index, 1);
                await fs.promises.writeFile(`./src/controllers/Productos.txt`, JSON.stringify(productos))
                res.json({ "Mensaje": `El producto con el id ${id} ha sido Eliminado` })
            }
        }
    } catch (e) {
        console.log('Error:', e)
        res.sendStatus(500)
    }
}

const addProductos = async(req, res) => {
    try {
        //console.log(req.body)
        //const { nombre } = req.body
        let indexProductos = 1
        let DatosLeidos = await fs.promises.readFile(`./src/controllers/Productos.txt`)
        if (DatosLeidos != '') {
            productos = JSON.parse(DatosLeidos)
            indexProductos = Number(productos[productos.length - 1].id) + 1
        }
        let today = new Date()
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();

        today = mm + '/' + dd + '/' + yyyy;
        //console.log(today)
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body
        productos.push({ "id": indexProductos, "timestamp": today, nombre, descripcion, codigo, foto, precio, stock })
        await fs.promises.writeFile(`./src/controllers/Productos.txt`, JSON.stringify(productos))
        res.json(productos)

    } catch (e) {
        console.log('Error:', e)
        res.sendStatus(500)
    }
}

export {
    getProductos,
    getProductosbyID,
    addProductos,
    updateProductos,
    delProductos
}