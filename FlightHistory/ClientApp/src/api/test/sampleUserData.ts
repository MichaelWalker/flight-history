import {User} from "../../models/user";
import {generateTestAccessToken} from "../../helpers/testHelper";

export type FakeUser = {
    token: string;
    email: string;
    password: string;
    details: User;
}

const user = {
    name: "User",
    email: "user@sample.com",
}

export const SampleUser: FakeUser = {
    email: "new@sample.com",
    password: "new-password",
    token: generateTestAccessToken(user),
    details: user,
};

export const SampleUsers: FakeUser[] = [
    SampleUser
]