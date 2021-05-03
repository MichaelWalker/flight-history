import {AuthClient} from "./authClient";
import {AirlineClient} from "./airlineClient";
import {AircraftClient} from "./aircraftClient";
import {AirportsClient} from "./airportsClient";
import {FlightClient} from "./flightsClient";

export const Api = {
    aircraft: AircraftClient,
    airlines: AirlineClient,
    airports: AirportsClient,
    auth: AuthClient,
    flights: FlightClient,
}