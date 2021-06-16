import type { FunctionComponent } from "react";
import React from "react";
import type { Header} from "../tables/Table";
import { Table } from "../tables/Table";
import { Api } from "../../api/apiClient";
import { LinkTableCell } from "../tables/cells/LinkTableCell";
import { TextTableCell } from "../tables/cells/TextTableCell";
import type { Airport } from "../../models/airport";

const headers: Header[] = [
    { displayName: "name", sortName: "name" },
    { displayName: "code", sortName: "code" },
];

function renderRow(airports: Airport) {
    return (
        <>
            <LinkTableCell text={airports.name} to={`/api/aircraft/${airports.id}`} />
            <TextTableCell text={airports.code} />
        </>
    );
}

export const AirportsTable: FunctionComponent = () => {
    return <Table fetchItems={Api.airports.list} renderRow={renderRow} headers={headers} />;
};
