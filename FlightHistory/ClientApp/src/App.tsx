import React, {FunctionComponent} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {FlightsPage} from "./pages/Flights";
import {AirportsPage} from "./pages/Airports";
import {AircraftPage} from "./pages/Aircraft";
import {NotFoundPage} from "./pages/NotFound";
import {DashboardPage} from "./pages/Dashboard";
import {UserContextProvider} from "./contexts/UserContext";

export const App: FunctionComponent = () => {
    return (
        <UserContextProvider>
            <Router>
                <Switch>
                    <Route path={"/"} exact={true} children={DashboardPage}/>
                    <Route path={"/flights"} exact={true} children={FlightsPage}/>
                    <Route path={"/airports"} exact={true} children={AirportsPage}/>
                    <Route path={"/aircraft"} exact={true} children={AircraftPage}/>
                    <Route path={"/"} children={NotFoundPage}/>
                </Switch>
            </Router>
        </UserContextProvider>
    );  
};