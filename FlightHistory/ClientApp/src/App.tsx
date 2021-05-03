import React, {FunctionComponent, useContext} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {FlightsPage} from "./pages/Flights";
import {AirportsPage} from "./pages/Airports";
import {AircraftPage} from "./pages/Aircraft";
import {NotFoundPage} from "./pages/NotFound";
import {DashboardPage} from "./pages/Dashboard";
import {UserContext, UserContextProvider} from "./contexts/UserContext";
import {SignInPage} from "./pages/SignInPage";
import {Loading} from "./components/Loading";
import "./styles/reset.scss";

export const App: FunctionComponent = () => {
    return (
        <UserContextProvider>
            <Router>
                <AppContent/>
            </Router>
        </UserContextProvider>
    );
};

const AppContent: FunctionComponent = () => {
    const { loading, currentUser } = useContext(UserContext);
    
    if (loading) {
        return <Loading/>
    }
    
    if (!currentUser) {
        return <SignInPage/>
    }
    
    return (
        <Switch>
            <Route path={"/"} exact={true} children={DashboardPage}/>
            <Route path={"/flights"} exact={true} children={FlightsPage}/>
            <Route path={"/airports"} exact={true} children={AirportsPage}/>
            <Route path={"/aircraft"} exact={true} children={AircraftPage}/>
            <Route path={"/"} children={NotFoundPage}/>
        </Switch>
    );
}