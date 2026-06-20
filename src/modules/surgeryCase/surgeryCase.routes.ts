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

    console.log("BODY =", body);
    console.log("PRE OP =", body.preOpImages);
    console.log("INTRA OP =", body.intraOpImages);
    console.log("POST OP =", body.postOpImages);

    return controller.create(body);

});