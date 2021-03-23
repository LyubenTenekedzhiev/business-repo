import { BusinessInterface } from "../types/types";
import { handleErrorStatusCodes } from "../utils/errors";

export const API_BASE = "https://api.jsonbin.io/b/60215a7906934b65f530333a";

export const getBusinesses = async () => {
    const req = await fetch(API_BASE);
    return handleErrorStatusCodes<BusinessInterface[]>(req);
};
