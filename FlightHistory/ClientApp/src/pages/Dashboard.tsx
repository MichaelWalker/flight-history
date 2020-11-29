import React, {FunctionComponent} from "react";
import {Link} from "react-router-dom";

export const DashboardPage: FunctionComponent = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to={"/flights"}>Flights</Link>
            <Link to={"/airports"}>Airports</Link>
            <Link to={"/aircraft"}>Aircraft</Link>
        </div>
    );
};