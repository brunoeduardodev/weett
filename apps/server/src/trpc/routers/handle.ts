import { handleSchema } from "@weett/schemas";
import { t } from "..";
import { isHandleAvailable } from "../services/handle/isHandleAvailable";

export const handleRouter = t.router({
  isAvailable: t.procedure
    .input(handleSchema)
    .query(({ input }) => isHandleAvailable({ handle: input })),
});
