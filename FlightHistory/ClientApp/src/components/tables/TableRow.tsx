import React, {FunctionComponent, ReactElement} from "react";
import {Item} from "../../api/apiHelpers";
import styles from "./TableRow.module.scss";

interface TableRowProps<T extends Item> {
    item: T;
    renderRow: (item: T) => ReactElement;
}

export function TableRow<T extends Item>({item, renderRow}: TableRowProps<T>) {
    return (
        <tr className={styles.tableRow}>
            {renderRow(item)}
        </tr>
    );
}