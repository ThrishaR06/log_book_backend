import { Elysia } from "elysia";
import { SurgeryCaseController } from "./surgeryCase.controller";

const controller = new SurgeryCaseController();

export const surgeryCaseRoutes = new Elysia({
  prefix: "/surgery-cases",
})

.post("/", async ({ request }) => {

  const formData = await request.formData();

  const body: any = {};

  for (const [key, value] of formData.entries()) {

    if (
      key === "preOpImages" ||
      key === "intraOpImages" ||
      key === "postOpImages"
    ) {

      if (!body[key]) {
        body[key] = [];
      }

      body[key].push(value);

    } else {

      body[key] = value;
    }
  }

  return controller.create(body);

})

.get(
  "/:id",
  async ({ params }) => {
    return await controller.getById(params);
  }
);