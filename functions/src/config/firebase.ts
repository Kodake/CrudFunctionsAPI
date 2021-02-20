import * as admin from 'firebase-admin';
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://crudfunctionsapi-be745.firebaseio.com"
});

const db = admin.firestore();
export { admin, db };