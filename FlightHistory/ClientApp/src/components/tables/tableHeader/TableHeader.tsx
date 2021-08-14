import type { FC } from "react";
import React, { memo } from "react";
import type { Header } from "../Table";
import type { Sort } from "../../../api/apiHelpers";
import { TableHeaderItem } from "./tableHeaderItem/TableHeaderItem";

interface TableHeaderProps {
    headers: Header[];
    sort: Sort | undefined;
    setSort: (sort: Sort) => void;
}

export const TableHeader: FC<TableHeaderProps> = memo(({ headers, sort, setSort }) => {
    return (
        <thead>
            <tr>
                {headers.map((header) => (
                    <TableHeaderItem
                        displayName={header.displayName}
                        sortBy={header.sortName}
                        key={header.displayName}
                        currentSort={sort}
                        setSort={setSort}
                    />
                ))}
            </tr>
        </thead>
    );
});

TableHeader.displayName = "TableHeader";
