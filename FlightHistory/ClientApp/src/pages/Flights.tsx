import React, {FunctionComponent} from "react";
import {Page} from "./Page";
import {FlightsTable} from "../components/flights/FlightsTable";
import styles from './Flights.module.scss';

export const FlightsPage: FunctionComponent = () => {
    return (
        <Page title={"Flights"}>
            <section className={styles.statsContainer}>
                <div className={styles.card}/>
                <div className={styles.card}/>
                <div className={styles.card}/>
                <div className={styles.card}/>
            </section>
            <section className={styles.tableContainer}>
                <h2 className={styles.sectionHeading}>Flights</h2>
                <FlightsTable/>
            </section>
        </Page>
    );
};
