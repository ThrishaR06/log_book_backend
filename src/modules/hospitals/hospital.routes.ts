import { Elysia } from "elysia";
import { HospitalController } from "./hospital.controller";
import { authMiddleware } from "../../middleware/auth.middleware";
import { roleGuard } from "../../middleware/role.middleware";


export const hospitalRoutes = new Elysia({ prefix: "/hospitals" })
    .post("/register", HospitalController.register)
    .post("/login", HospitalController.login)
    .get("/doctors", HospitalController.getDoctors, {
    beforeHandle: [authMiddleware, roleGuard("hospital")]
});