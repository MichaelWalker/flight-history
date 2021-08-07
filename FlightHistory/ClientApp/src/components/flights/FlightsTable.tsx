import type { FunctionComponent } from "react";
import React from "react";
import type { Header } from "../tables/Table";
import { Table } from "../tables/Table";
import { LinkTableCell } from "../tables/cells/LinkTableCell";
import { TextTableCell } from "../tables/cells/TextTableCell";
import type { Flight } from "../../models/flight";
import { FlightClient } from "../../api/flightsClient";

const headers: Header[] = [
    { displayName: "date", sortName: "date" },
    { displayName: "source", sortName: "source" },
    { displayName: "destination", sortName: "destination" },
    { displayName: "aircraft", sortName: "aircraft" },
    { displayName: "airline", sortName: "airline" },
];

function renderRow(flight: Flight) {
    return (
        <>
            <TextTableCell text={flight.date} />
            <LinkTableCell text={flight.source.name} to={`/api/aircraft/${flight.source.id}`} />
            <LinkTableCell
                text={flight.destination.name}
                to={`/api/aircraft/${flight.destination.id}`}
            />
            <LinkTableCell
                text={flight.aircraft.registration}
                to={`/api/aircraft/${flight.aircraft.id}`}
            />
            <LinkTableCell text={flight.airline.name} to={`/api/aircraft/${flight.airline.id}`} />
        </>
    );
}

export const FlightsTable: FunctionComponent = () => {
    return <Table fetchItems={FlightClient.list} renderRow={renderRow} headers={headers} />;
};
