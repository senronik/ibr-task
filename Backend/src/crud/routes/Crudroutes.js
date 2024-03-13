const express  = require('express');
const verifyAdmin = require('../../middlewares/auth')
const router = express.Router();
const crudController = require('../controller/Crudcontroller');
const upload = require('../../config/multerconfig')

router.post('/add-product',verifyAdmin ,crudController.addProduct);
router.post('/update-product/:id' ,crudController.updateProduct);
router.delete('/delete-product/:id' ,crudController.deleteProduct);
router.get('/products',crudController.getAllproducts);
router.post('/import-csv',upload.single('file'),crudController.importCsv);
router.get('/export-csv',crudController.exportCsv);

module.exports = router;