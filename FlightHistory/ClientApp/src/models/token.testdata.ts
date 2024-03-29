import { generateTestAccessToken } from "../helpers/stubTokenHelpers";
import { stubUser } from "./user.testdata";
import type { Token } from "./token";

export const stubToken: Token = {
    token: generateTestAccessToken(stubUser, 5),
};
