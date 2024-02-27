import { Router } from "express";
import multer from "multer";
import { getUsers, getUser, postUser, putUser, deleteUser, validateUserAlreadyExists, uploadImage, getImage } from "../controllers/users.controller";

// import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
// import { GetUsersMiddleware, PostUsersMiddleware } from "../middlewares/users.middlewares";

const router = Router();

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, './src/uploads/users');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname.replace(/ /g, '_')}`);
    }
})

const upload = multer({ storage });

/* The code is defining the routes for handling HTTP requests related to users. */
// router.get('/', extractUserMiddlewares, GetUsersMiddleware, getUsers);
router.get('/', getUsers);
router.get('/:id', getUser);
// router.post('/', extractUserMiddlewares, PostUsersMiddleware, postUser);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);
router.get('/validate', validateUserAlreadyExists);
router.post('/upload', upload.single('image'), uploadImage);
router.get('/image/:image', getImage);

export default router;