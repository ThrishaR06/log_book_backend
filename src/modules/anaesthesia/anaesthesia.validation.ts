import { t } from "elysia";

export const createAnaesthesiaSchema = t.Object({

  anaesthesiaName: t.String()

});

export const updateAnaesthesiaSchema = t.Object({
  anaesthesiaName: t.String()
});