import { Cashfree } from "cashfree-pg/dist/esm/index.js";

Cashfree.XClientId = process.env.CASHFREE_APP_ID!;
Cashfree.XClientSecret = process.env.CASHFREE_SECRET_KEY!;

Cashfree.XEnvironment =
    process.env.CASHFREE_ENVIRONMENT === "PRODUCTION"
        ? Cashfree.Environment.PRODUCTION
        : Cashfree.Environment.SANDBOX;

export default Cashfree;