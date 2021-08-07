import type { FunctionComponent } from "react";
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { UserContext, UserContextProvider } from "./contexts/UserContext";
import "./styles/reset.scss";
import { AirlinesPage } from "./pages/airlines/Airlines";
import { LoadingAnimation } from "./icons/loadingAnimation/LoadingAnimation";
import { AircraftPage } from "./pages/aircraft/Aircraft";
import { SignInPage } from "./pages/signIn/SignInPage";
import { DashboardPage } from "./pages/dashboard/Dashboard";
import { FlightsPage } from "./pages/flights/Flights";
import { AirportsPage } from "./pages/airports/Airports";
import { NotFoundPage } from "./pages/notFound/NotFound";

export const App: FunctionComponent = () => {
    return (
        <UserContextProvider>
            <Router>
                <AppContent />
            </Router>
        </UserContextProvider>
    );
};

const AppContent: FunctionComponent = () => {
    const { loading, currentUser } = useContext(UserContext);

    if (loading) {
        return <LoadingAnimation size={"LARGE"} />;
    }

    if (!currentUser) {
        return <SignInPage />;
    }

    return (
        <Switch>
            <Route path={"/"} exact={true}>
                <DashboardPage />
            </Route>
            <Route path={"/flights"} exact={true}>
                <FlightsPage />
            </Route>
            <Route path={"/airports"} exact={true}>
                <AirportsPage />
            </Route>
            <Route path={"/aircraft"} exact={true}>
                <AircraftPage />
            </Route>
            <Route path={"/airlines"} exact={true}>
                <AirlinesPage />
            </Route>
            <Route path={"/"}>
                <NotFoundPage />
            </Route>
        </Switch>
    );
};
