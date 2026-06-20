import { Elysia } from "elysia";
import { DoctorController } from "./doctor.controller";
import { authMiddleware } from "../../middleware/auth.middleware";

export const doctorRoutes = new Elysia({ prefix: "/doctors" })

  .post("/register", DoctorController.register)
  .post("/login", DoctorController.login)

  .put("/profile", DoctorController.updateProfile, {
    beforeHandle: [authMiddleware]
  })
  .post(
    "/logout",
    DoctorController.logout,
    {
        beforeHandle: [authMiddleware]
    }
)

  .get("/", DoctorController.getProfile, {
    beforeHandle: [authMiddleware]
})

  // 🚨 ADD THIS DEBUG ROUTE HERE
  .get("/debug-auth", ({ store }: any) => {
  return {
    success: true,
    user: store.user
  };
}, {
  beforeHandle: [authMiddleware]
})