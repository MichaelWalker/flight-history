import React, { FunctionComponent } from "react";
import { Header, Table } from "../tables/Table";
import { Api } from "../../api/apiClient";
import { LinkTableCell } from "../tables/cells/LinkTableCell";
import { Aircraft } from "../../models/aircraft";
import { TextTableCell } from "../tables/cells/TextTableCell";

const headers: Header[] = [
    { displayName: "registration", sortName: "registration" },
    { displayName: "model", sortName: "model" },
];

function renderRow(aircraft: Aircraft) {
    return (
        <>
            <LinkTableCell text={aircraft.registration} to={`/api/aircraft/${aircraft.id}`} />
            <TextTableCell text={aircraft.registration} />
        </>
    );
}

export const AircraftTable: FunctionComponent = () => {
    return <Table fetchItems={Api.aircraft.list} renderRow={renderRow} headers={headers} />;
};
