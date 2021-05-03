import {AuthClient} from "./authClient";
import {AirlineClient} from "./airlineClient";

export const Api = {
    airlines: AirlineClient,
    auth: AuthClient,
}