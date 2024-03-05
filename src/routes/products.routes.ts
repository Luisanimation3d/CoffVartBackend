import { Router } from "express";
import multer from "multer";
import { getProducts, getProduct, postProducts, putProducts, deleteProducts, uploadImage,  getImage } from "../controllers/products.controller";
import { validateRoutePost } from "../middlewares/products.middlewares";
import { GetProductsMiddleware, PostProductsMiddleware, PutProductsMiddleware } from "../middlewares/products.middlewares";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";

const router= Router();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './src/uploads/products');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/ /g, '_')}`);
    }
})

const upload = multer({ storage });


router.get("/", /*extractUserMiddlewares*/ getProducts/*,  GetProductsMiddleware*/);
router.get("/:id",getProduct);
router.post("/", /*extractUserMiddlewares*/ postProducts/*, validateRoutePost,  /*PostProductsMiddleware*/);
router.put("/:id",/*extractUserMiddlewares,*/ putProducts/*, PutProductsMiddleware*/);
router.delete("/:id",deleteProducts);
router.post('/upload', upload.single('image'), uploadImage);

router.get('/image/:image', getImage);


export default router;