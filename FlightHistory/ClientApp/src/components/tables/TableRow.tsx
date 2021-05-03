import React, {FunctionComponent, ReactElement} from "react";
import {Item} from "../../api/apiHelpers";

interface TableRowProps<T extends Item> {
    item: T;
    renderRow: (item: T) => ReactElement;
}

export function TableRow<T extends Item>({item, renderRow}: TableRowProps<T>) {
    return (
        <tr>
            {renderRow(item)}
        </tr>
    );
}