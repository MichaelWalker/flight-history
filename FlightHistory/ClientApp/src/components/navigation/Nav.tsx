import React, {FunctionComponent} from "react";
import styles from "./Nav.module.scss";
import {DashboardIcon} from "../../icons/DashboardIcon";
import {NavItem} from "./NavItem";

export const Nav: FunctionComponent = () => {
    return (
        <nav className={styles.nav}>
            <NavItem to={'/'} icon={<DashboardIcon/>}>Dashboard</NavItem>
            <NavItem to={'/flights'} icon={<DashboardIcon/>}>Flights</NavItem>
            <NavItem to={'/airports'} icon={<DashboardIcon/>}>Airports</NavItem>
            <NavItem to={'/aircraft'} icon={<DashboardIcon/>}>Aircraft</NavItem>
            <NavItem to={'/airlines'} icon={<DashboardIcon/>}>Airlines</NavItem>
        </nav>
    );  
};
