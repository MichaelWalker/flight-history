import React, { FC } from "react";
import { Link } from "react-router-dom";
import * as styles from "../button.styles";

interface LinkButtonProps {
    to: string;
}

export const PrimaryLinkButton: FC<LinkButtonProps> = ({ children, to }) => {
    return (
        <Link to={to} className={styles.primaryButton}>
            {children}
        </Link>
    );
};

export const SecondaryLinkButton: FC<LinkButtonProps> = ({ children, to }) => {
    return (
        <Link to={to} className={styles.secondaryButton}>
            {children}
        </Link>
    );
};
