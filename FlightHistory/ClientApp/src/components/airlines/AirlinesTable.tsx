import type { FunctionComponent } from "react";
import React from "react";
import type { Header } from "../tables/Table";
import { Table } from "../tables/Table";
import type { Airline } from "../../models/airline";
import { LinkTableCell } from "../tables/cells/LinkTableCell";
import { AirlineClient } from "../../api/airlineClient";

const headers: Header[] = [{ displayName: "name", sortName: "name" }];

function renderRow(airline: Airline) {
    return (
        <>
            <LinkTableCell text={airline.name} to={`/api/airlines/${airline.id}`} />
        </>
    );
}

export const AirlinesTable: FunctionComponent = () => {
    return <Table fetchItems={AirlineClient.list} renderRow={renderRow} headers={headers} />;
};
