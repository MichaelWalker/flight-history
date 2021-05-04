import React, {FunctionComponent} from "react";
import styles from "./Page.module.scss";
import {Nav} from "../components/navigation/Nav";
import {Link} from "react-router-dom";

interface PageProps {
    title: string;
}

export const Page: FunctionComponent<PageProps> = ({ children , title}) => {
    return (
        <div className={styles.page}>
            <div className={styles.navContainer}>
                <Link to="/" className={styles.appName}>Flight History</Link>
                <Nav/>
            </div>
            <main className={styles.main}>
                <h1 className={styles.title}>{title}</h1>
                {children}
            </main>
        </div>
    );
}
