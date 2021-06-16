import type { ReactElement } from "react";
import React from "react";
import type { Item } from "../../api/apiHelpers";
import styles from "./TableRow.module.scss";

interface TableRowProps<T extends Item> {
    item: T;
    renderRow: (item: T) => ReactElement;
}

export function TableRow<T extends Item>({ item, renderRow }: TableRowProps<T>): ReactElement {
    return <tr className={styles.tableRow}>{renderRow(item)}</tr>;
}
