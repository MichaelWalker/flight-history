import React, {FunctionComponent, ReactNode} from "react";
import styles from "./NavItem.module.scss";
import {NavLink} from "react-router-dom";

interface NavItemProps {
    to: string;
    icon: ReactNode;
}

export const NavItem: FunctionComponent<NavItemProps> = ({to, icon, children}) => {
    return (
        <NavLink to={to} className={styles.navItem} activeClassName={styles.active} exact={true}>
            <div className={styles.iconContainer}>{icon}</div>
            {children}
        </NavLink>
    );
};
    