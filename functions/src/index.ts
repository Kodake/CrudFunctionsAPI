import * as functions from 'firebase-functions';
import * as express from 'express';
import { addProducto, getProductos, getProducto, updateProducto, deleteProducto } from './productoController';

const app = express();

export const helloWorld = functions.https.onRequest((request, response) => {
    response.json({
        message: "Hello World from Firebase!"
    });
});

export const helloFirebase = functions.https.onRequest((request, response) => {
    response.json({
        message: "Hello Firebase!"
    });
});

app.get('/', (req, res) => res.status(200).send('Hey there!'));
app.post('/producto', addProducto);
app.get('/productos', getProductos);
app.get('/producto/:id', getProducto);
app.patch('/producto/:id', updateProducto);
app.delete('/producto/:id', deleteProducto);

export const api = functions.https.onRequest(app);