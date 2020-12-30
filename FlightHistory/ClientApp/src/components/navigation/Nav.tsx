import React, {FunctionComponent} from "react";
import styles from "./Nav.module.scss";
import {DashboardIcon} from "../../icons/DashboardIcon";
import {NavItem} from "./NavItem";
import {AirlineIcon} from "../../icons/AirlineIcon";
import {AirportIcon} from "../../icons/AirportIcon";
import {AircraftIcon} from "../../icons/AircraftIcon";
import {FlightIcon} from "../../icons/FlightIcon";

export const Nav: FunctionComponent = () => {
    return (
        <nav className={styles.nav}>
            <NavItem to={'/'} icon={<DashboardIcon/>}>Dashboard</NavItem>
            <NavItem to={'/flights'} icon={<FlightIcon/>}>Flights</NavItem>
            <NavItem to={'/airports'} icon={<AirportIcon/>}>Airports</NavItem>
            <NavItem to={'/aircraft'} icon={<AircraftIcon/>}>Aircraft</NavItem>
            <NavItem to={'/airlines'} icon={<AirlineIcon/>}>Airlines</NavItem>
        </nav>
    );  
};
