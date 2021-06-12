import React, { FunctionComponent } from "react";
import styles from "./TableCell.module.scss";

interface TextTableCellProps {
    text: string;
}

export const TextTableCell: FunctionComponent<TextTableCellProps> = ({ text }) => {
    return <td className={styles.textCell}>{text}</td>;
};
