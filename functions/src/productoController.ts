import { Response } from 'express'
import { db } from './config/firebase';

type Producto = {
    _id?: string,
    nombre: string,
    categoria: string,
    ubicacion: string,
    precio: number
}

type Request = {
    body: Producto,
    params: { id: string }
}

const getProductos = async (req: Request, res: Response) => {
    try {
        const productos: Producto[] = [];

        const querySnapshot = await db.collection('crud').get();

        querySnapshot.forEach((doc: any) => productos.push({
            _id: doc.id,
            ...doc.data()
        }));
        
        return res.status(200).json(productos);
    } catch (error) { return res.status(500).json(error.message) }
}

const getProducto = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) throw new Error('El id del producto es requerido');
        const producto = await db.collection('crud').doc(id).get();

        if (!producto.exists) throw new Error('El producto no existe');

        res.json(producto.data());

    } catch (error) { res.status(500).send(error) }
}

const addProducto = async (req: Request, res: Response) => {
    const { nombre, categoria, ubicacion, precio } = req.body
    try {
        const entry = db.collection('crud').doc();

        const PRODUCTO = {
            nombre,
            categoria,
            ubicacion,
            precio
        }

        await entry.set(PRODUCTO).catch(error => {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        });

        res.status(200).send({
            status: 'success',
            message: 'Producto agregado satisfactoriamente'
        });

    } catch (error) { res.status(500).json(error.message) }
}

const updateProducto = async (req: Request, res: Response) => {
    const { body: { nombre, categoria, ubicacion, precio }, params: { id } } = req

    try {
        const entry = db.collection('crud').doc(id);

        const currentData = (await entry.get()).data() || {}

        const entryObject = {
            nombre: nombre || currentData.nombre,
            categoria: categoria || currentData.categoria,
            ubicacion: ubicacion || currentData.ubicacion,
            precio: precio || currentData.precio,
        }

        await entry.set(entryObject).catch(error => {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        });

        return res.status(200).json({
            status: 'success',
            message: 'Producto actualizado satisfactoriamente'
        });

    } catch (error) { return res.status(500).json(error.message) }
}

const deleteProducto = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const entry = db.collection('crud').doc(id)

        await entry.delete().catch(error => {
            return res.status(400).json({
                status: 'error',
                message: error.message
            });
        });

        return res.status(200).json({
            status: 'success',
            message: 'Producto eliminado satisfactoriamente'
        });

    } catch (error) { return res.status(500).json(error.message) }
}

export { addProducto, getProductos, getProducto, updateProducto, deleteProducto }
