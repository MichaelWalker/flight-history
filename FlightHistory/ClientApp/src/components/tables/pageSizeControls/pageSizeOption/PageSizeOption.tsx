import React, { FC } from "react";
import { useUniqueId } from "../../../../hooks/useUniqueId";
import styles from "./PageSizeOption.module.scss";

interface PageSizeOptionProps {
    option: number;
    pageSize: number;
    updatePageSize: (pageSize: number) => void;
}

export const PageSizeOption: FC<PageSizeOptionProps> = ({ option, pageSize, updatePageSize }) => {
    const id = useUniqueId("page-size-option");
    return (
        <>
            <input
                id={id}
                className={styles.input}
                type="radio"
                name={"page-size"}
                value={option}
                checked={pageSize === option}
                onChange={() => updatePageSize(option)}
            />
            <label htmlFor={id} className={styles.label}>
                {option} <span className={styles.visuallyHidden}>results per page</span>
            </label>
        </>
    );
};
