const { Router } = require("express")
const router = Router()

const Controller = require("../controllers/manager.controller")
const Middleware = require("../middlewares")
const SuperAdminModel = require("../models/superAdmin.model")
const ManagerModel = require("../models/manager.model")

const { CreateManagerSchema, UpdateManagerSchema, LoginManagerSchema } = require("../validations/manager.validation")


router.post("/manager", Middleware.verifyToken(process.env.JWT_TOKEN_ACCESS), Middleware.isCorrectRole([SuperAdminModel]), Middleware.verifyValidation(CreateManagerSchema), Controller.createManager)
router.get("/managers", Middleware.verifyToken(process.env.JWT_TOKEN_ACCESS), Middleware.isCorrectRole([SuperAdminModel]), Controller.getAllManagers)
router.get("/manager/:id", Middleware.verifyToken(process.env.JWT_TOKEN_ACCESS), Middleware.isCorrectRole([SuperAdminModel, ManagerModel]), Controller.getManagerById)
router.put("/manager/:id", Middleware.verifyToken(process.env.JWT_TOKEN_ACCESS), Middleware.isCorrectRole([SuperAdminModel, ManagerModel]), Middleware.verifyValidation(UpdateManagerSchema), Controller.updateManager)
router.delete("/manager/:id", Middleware.verifyToken(process.env.JWT_TOKEN_ACCESS), Middleware.isCorrectRole([SuperAdminModel]), Controller.deleteManager)

module.exports = router