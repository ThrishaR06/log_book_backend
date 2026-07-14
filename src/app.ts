import { Elysia } from "elysia";
import { cookie } from "@elysiajs/cookie";
import cors from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";

import { hospitalRoutes } from "./modules/hospitals/hospital.routes";
import { doctorRoutes } from "./modules/doctors/doctor.routes";
import { templateRoutes } from "./modules/templates/template.routes";
import { adminRoutes } from "./modules/admin/admin.routes";
import { masterPresetRoutes } from "./modules/master-presets/masterPreset.route";

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
import { monitoringMasterRoutes } from "./modules/monitoringMaster/monitoring.route";
import { dietMasterRoutes } from "./modules/dietMaster/diet.route";
import { woundCareMasterRoutes } from "./modules/woundCareMasters/woundCare.route";
import { drainManagementMasterRoutes } from "./modules/drainManagementMaster/drainManagement.route";
import { followUpMasterRoutes } from "./modules/followUpMaster/followUp.route";
import { followUpImagingMasterRoutes } from "./modules/followUpImagingMaster/followUpImaging.route";
import { surgeryStaffTypeRoutes } from "./modules/surgeryStaffType/surgeryStaffType.route";
import { subscriptionRoutes } from "./modules/subscription/subscription.route";
import { specialInstructionMasterRoutes } from "./modules/specialInstructionMasters/specialInstruction.route";
import {clinicalPresetsRoutes}from "./modules/clinicalPresets/clinicalPresets.routes";
import { dashboardRoutes } from "./modules/dashboard/dashboard.route";
//import "./config/redis";
import { mediaRoutes } from "./modules/media/media.route";
import { businessSettingRoutes } from "./modules/business-setting/businessSetting.route";

import { bloodLossMasterRoutes } from "./modules/blood-loss-master/bloodLossMaster.route";
import { specimensMasterRoutes } from "./modules/specimens-master/specimensMaster.route";
import { additionalNotesMasterRoutes } from "./modules/additional-notes-master/additionalNotesMaster.route";

export const app = new Elysia()
    .use(
        cors({
            origin: ["http://localhost:5173"],
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
    .use(adminRoutes)
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
    .use(mediaRoutes)
    .use(positionRoutes)
    .use(incisionRoutes)
    .use(surgeryClinicalSelectionsRoutes)
    .use(surgeryImagesRoutes)
    .use(surgeryFinanceRoutes)
    .use(dashboardRoutes)
    .use(businessSettingRoutes)
    
    .use(diagnosisMasterRoutes)
    .use(operativeFindingsRoutes)
    .use(procedureDetailsRoutes)
    .use(monitoringMasterRoutes)
    .use(dietMasterRoutes)
    .use(drainManagementMasterRoutes)
    .use(woundCareMasterRoutes)
    .use(specialInstructionMasterRoutes)
    .use(followUpMasterRoutes)
    .use(followUpImagingMasterRoutes)
    .use(surgeryStaffTypeRoutes)
    .use(clinicalPresetsRoutes)
    
    .use(surgeryCaseRoutes);
