import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import * as hospitals from "./schema/hospitals";
import * as doctors from "./schema/doctors";
import * as subscriptions from "./schema/subscriptions";
import * as templates from "./schema/templates";
import * as surgeries from "./schema/surgeries";
import * as admins from "./schema/admins";
import * as notifications from "./schema/notifications";
import * as masterPresets from "./schema/masterPresets";
import * as categories from "./schema/categories";
import * as ivFluidMasters from "./schema/ivFluidMasters";
import * as medicationMasters from "../db/schema/medicationMasters";
import * as masterCategories from "./schema/masterCategories";
import * as surgeryClinicalDetails from "./schema/surgeryClinicalDetails";
import * as sessions from "./schema/sessions";
import * as surgeryStaffMasters from "./schema/surgeryStaffMasters";
import * as surgeryCases from "./schema/surgeryCases";
import * as media from "./schema/media.schema";
import * as relations from "./schema/relations";




export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "saas_db",
    port: 3306,
});

export const db = drizzle(pool, {
    schema: {
        ...hospitals,
        ...doctors,
        ...subscriptions,
        ...templates,
        ...surgeries,
        ...admins,
        ...notifications,
        ...masterPresets,
        ...categories,
        ...ivFluidMasters,
        ...medicationMasters,
        ...masterCategories,
        ...surgeryClinicalDetails,
        ...sessions,
        ...surgeryStaffMasters,
        ...surgeryCases,
        ...media,
        ...relations,
    },
    mode: "default",
});