import React, {FunctionComponent, ReactElement} from "react";
import {TableItem} from "./Table";

interface TableRowProps<T extends TableItem> {
    item: T;
    renderRow: (item: T) => ReactElement;
}

export function TableRow<T extends TableItem>({item, renderRow}: TableRowProps<T>) {
    return (
        <tr>
            {renderRow(item)}
        </tr>
    );
}