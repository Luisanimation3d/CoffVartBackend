import { Router } from "express";
import { getCompany,getCompanys,postCompanys,putCompanys,deleteCompanys, } from "../controllers/companys.controller";
import { extractUserMiddlewares } from "../middlewares/extractUser.middlewares";
import { validateRouteGet, validateRoutePost, validateRoutePut, validateRouteDelete } from "../middlewares/companys.middlewares";

const router= Router();


/* These lines of code are defining the routes for handling HTTP requests in an Express.js application. */
router.get("/",extractUserMiddlewares,getCompanys);
router.get('/:id',extractUserMiddlewares,validateRouteGet,getCompany);
router.post("/",extractUserMiddlewares,validateRoutePost,postCompanys);
router.put("/:id",extractUserMiddlewares,validateRoutePut,putCompanys);
router.delete("/:id",extractUserMiddlewares,validateRouteDelete,deleteCompanys);

export default router;