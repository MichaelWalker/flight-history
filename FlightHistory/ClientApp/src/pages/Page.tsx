import type { FunctionComponent } from "react";
import React from "react";
import { NavBar } from "../components/navigation/Nav";
import { Link } from "react-router-dom";
import * as styles from "./page.styles";

interface PageProps {
    title: string;
}

export const Page: FunctionComponent<PageProps> = ({ children, title }) => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.navContainer}>
                <Link className={styles.homeLink} to="/">
                    Flight History
                </Link>
                <NavBar />
            </div>
            <div className={styles.pageContent}>
                <header className={styles.header}>
                    <h1 className={styles.title} data-testid="page-title">
                        {title}
                    </h1>
                </header>
                <main className={styles.main}>{children}</main>
            </div>
        </div>
    );
};
