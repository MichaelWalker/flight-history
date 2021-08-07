import type { FunctionComponent } from "react";
import React from "react";
import type { Header } from "../tables/Table";
import { Table } from "../tables/Table";
import { Api } from "../../api/apiClient";
import { LinkTableCell } from "../tables/cells/LinkTableCell";
import type { Aircraft } from "../../models/aircraft";
import { TextTableCell } from "../tables/cells/TextTableCell";

const headers: Header[] = [
    { displayName: "registration", sortName: "registration" },
    { displayName: "model", sortName: "model" },
];

function renderRow(aircraft: Aircraft) {
    return (
        <>
            <LinkTableCell text={aircraft.registration} to={`/api/aircraft/${aircraft.id}`} />
            <TextTableCell text={aircraft.model} />
        </>
    );
}

export const AircraftTable: FunctionComponent = () => {
    return <Table fetchItems={Api.aircraft.list} renderRow={renderRow} headers={headers} />;
};
