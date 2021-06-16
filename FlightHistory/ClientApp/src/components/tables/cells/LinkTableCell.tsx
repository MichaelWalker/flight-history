import type { FunctionComponent } from "react";
import React from "react";
import { Link } from "react-router-dom";
import styles from "./TableCell.module.scss";

interface LinkTableCellProps {
    text: string;
    to: string;
}

export const LinkTableCell: FunctionComponent<LinkTableCellProps> = ({ text, to }) => {
    return (
        <td className={styles.linkCell}>
            <Link to={to}>{text}</Link>
        </td>
    );
};
