﻿import {User} from "../../models/user";
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
    email: "user@sample.com",
    password: "password",
    token: generateTestAccessToken(user),
    details: user,
};

export const SampleUsers: FakeUser[] = [
    SampleUser
]