import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import cors from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";

import { hospitalRoutes } from "./modules/hospitals/hospital.routes";
import { doctorRoutes } from "./modules/doctors/doctor.routes";
import { templateRoutes } from "./modules/templates/template.routes";
import { surgeryRoutes } from "./modules/surgeries/surgery.routes";
import { dashboardRoutes } from "./modules/dashboard/dashboard.routes";
import { reportRoutes } from "./modules/reports/reports.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import { exportRoutes } from "./modules/exports/export.routes";
import { notificationRoutes } from "./modules/notifications/notification.routes";
import { masterPresetRoutes } from "./modules/master-presets/masterPreset.route";
import { subscriptionRoutes } from "./modules/subscriptions/subscription.routes";

import { categoryRoutes } from "./modules/categories/category.route";
import { masterCategoryRoutes } from "./modules/master-categories/masterCategory.route";

import { ivFluidMasterRoutes } from "./modules/iv-fluid/ivFluid.route";
import { medicationRoutes } from "./modules/medications/medication.route";

import { surgeryStaffRoutes } from "./modules/surgery-staff/surgeryStaff.routes";
import { anaesthesiaRoutes } from "./modules/anaesthesia/anaesthesia.routes";
import { positionRoutes } from "./modules/position/position.routes";
import { incisionRoutes } from "./modules/incision/incision.routes";

import { surgeryClinicalSelectionsRoutes } from "./modules/surgeryClinicalSelections/surgeryClinicalSelections.routes";
import { clinicalDetailsRoutes } from "./modules/clinicalDetails/clinicalDetails.routes";
import { postOpOrdersRoutes } from "./modules/postOpOrders/postOpOrders.routes";
import { surgeryImagesRoutes } from "./modules/surgeryImages/surgeryImages.routes";
import { surgeryFinanceRoutes } from "./modules/surgeryFinance/surgeryFinance.routes";
import { surgeryCaseRoutes } from "./modules/surgeryCase/surgeryCase.routes";
import { diagnosisMasterRoutes }from "./modules/diagnosisMaster/diagnosisMaster.route";
import { operativeFindingsRoutes } from "./modules/operativeFindings/operativeFindings.route";
import { procedureDetailsRoutes } from "./modules/procedureDetails/procedureDetails.route";

import { bloodLossMasterRoutes } from "./modules/blood-loss-master/bloodLossMaster.route";
import { specimensMasterRoutes } from "./modules/specimens-master/specimensMaster.route";
import { additionalNotesMasterRoutes } from "./modules/additional-notes-master/additionalNotesMaster.route";

export const app = new Elysia()
    .use(
        cors({
            origin: true,
            credentials: true,
            methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        })
    )
    .use(cookie())
    .use(
        staticPlugin({
            assets: "uploads",
            prefix: "/uploads",
        })
    )
    .use(hospitalRoutes)
    .use(doctorRoutes)
    .use(subscriptionRoutes)
    .use(templateRoutes)
    .use(surgeryRoutes)
    .use(dashboardRoutes)
    .use(reportRoutes)
    .use(adminRoutes)
    .use(exportRoutes)
    .use(notificationRoutes)
    .use(masterPresetRoutes)
    .use(categoryRoutes)
    .use(masterCategoryRoutes)
    .use(bloodLossMasterRoutes)
    .use(specimensMasterRoutes)
    .use(additionalNotesMasterRoutes)
    .use(ivFluidMasterRoutes)
    .use(medicationRoutes)
    .use(postOpOrdersRoutes)
    .use(clinicalDetailsRoutes)
    .use(surgeryStaffRoutes)
    .use(anaesthesiaRoutes)
    .use(positionRoutes)
    .use(incisionRoutes)
    .use(surgeryClinicalSelectionsRoutes)
    .use(surgeryImagesRoutes)
    .use(surgeryFinanceRoutes)
    .use(surgeryCaseRoutes)
    .use(diagnosisMasterRoutes)
    .use(operativeFindingsRoutes)
    .use(procedureDetailsRoutes);