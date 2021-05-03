import React, {FunctionComponent} from "react";
import {Header, Table} from "../tables/Table";
import {Api} from "../../api/apiClient";
import {Airline} from "../../models/airline";
import {LinkTableCell} from "../tables/cells/LinkTableCell";

const headers: Header[] = [
    { displayName: 'name', sortName: 'name' },
]

function renderRow(airline: Airline) {
    return (
        <>
            <LinkTableCell text={airline.name} to={`/api/airlines/${airline.id}`}/>
        </>
    );
}

export const AirlinesTable: FunctionComponent = () => {
    return <Table fetchItems={Api.airlines.list} 
                  renderRow={renderRow} 
                  headers={headers}
    />;
};
