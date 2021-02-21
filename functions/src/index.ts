import * as functions from 'firebase-functions';
import * as express from 'express';
import * as cors from 'cors';

import { addProducto, getProductos, getProducto, updateProducto, deleteProducto } from './productoController';

const app = express();
app.use(cors());

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
app.post('/productos', addProducto);
app.get('/productos', getProductos);
app.get('/productos/:id', getProducto);
app.put('/productos/:id', updateProducto);
app.delete('/productos/:id', deleteProducto);

export const api = functions.https.onRequest(app);