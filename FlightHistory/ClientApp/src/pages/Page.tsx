import React, {FunctionComponent} from "react";
import styles from "./Page.module.scss";
import {Link} from "react-router-dom";

interface PageProps {
    title: string;
}

export const Page: FunctionComponent<PageProps> = ({ children , title}) => {
    return (
        <main className={styles.page}>
            <h1>{title}</h1>
            <div>
                <Link to={"/"}>Dashboard</Link>
                <Link to={"/flights"}>Flights</Link>
                <Link to={"/airports"}>Airports</Link>
                <Link to={"/aircraft"}>Aircraft</Link>
            </div>
            {children}
        </main>
    );
}