import type { FunctionComponent} from "react";
import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { FlightsPage } from "./pages/Flights";
import { AirportsPage } from "./pages/Airports";
import { AircraftPage } from "./pages/Aircraft";
import { NotFoundPage } from "./pages/NotFound";
import { DashboardPage } from "./pages/Dashboard";
import { UserContext, UserContextProvider } from "./contexts/UserContext";
import { SignInPage } from "./pages/SignInPage";
import "./styles/reset.scss";
import { AirlinesPage } from "./pages/Airlines";
import { LoadingAnimation } from "./icons/loadingAnimation/LoadingAnimation";

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
