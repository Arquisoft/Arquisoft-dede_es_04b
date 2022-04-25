import express, { Router } from 'express';
import {check} from 'express-validator';

const {validateFields} = require("../validadores/validador");

const {
    exitsProduct,
    validPrice,
    validSize,
    existsSubcategory,
    existsProductNameSize,
    validPage
} = require("../validadores/ProductValidator");

const {
  addProduct,
  findAllProducts,
  findProduct,
  updateProduct,
  deleteProduct,
  calculateShippementCost,
  filterProductsBySubCategory,
  filterProductsByString,
  findProductSize,
  findByPage
} = require("./../controladores/ProductController")

const routerProduct:Router = express.Router();

//routers
routerProduct.get(
  "/list",
  findAllProducts
);

routerProduct.get(
  "/find/:id",
  [
      exitsProduct,
      validateFields
  ],
  findProduct,

);

routerProduct.get(
    "/find/:name/:size",[
        existsProductNameSize,
        validateFields
    ],
    findProductSize,
);

routerProduct.get(
    "/list/:page",
    [
        validPage,
        validateFields
    ],
    findByPage,
);

routerProduct.get(
    "/list/filterSubCategory/:sub_category",
    [
        existsSubcategory,
        validateFields
    ],
    filterProductsBySubCategory,
);

routerProduct.get(
    "/list/filterSearch/:search",
    filterProductsByString,
);

routerProduct.delete(
  "/delete/:id",
  [
      exitsProduct,
      validateFields
  ],
  deleteProduct
);

routerProduct.post(
  "/add"
    ,[
    check('name').isLength({ min: 1 }).trim().escape(),
    check('price').isLength({ min: 1 }).trim().escape(),
    check('price').isFloat(),
    check('short_description').isLength({ min: 1 }).trim().escape(),
    check('long_description').isLength({ min: 1 }).trim().escape(),
    check('brand').isLength({ min: 1 }).trim().escape(),
    check('category').isLength({ min: 1 }).trim().escape(),
    check('sub_category').isLength({ min: 1 }).trim().escape(),
    check('image').isLength({ min: 1 }).trim().escape(),
    validPrice,
    validSize,
    validateFields
  ],
  
  addProduct
);

routerProduct.put(
  "/update/:id",[
    validPrice,
    exitsProduct,
    validateFields
  ],
  updateProduct
);

routerProduct.post(
    "/shippementCost",
    calculateShippementCost
);

export default routerProduct;