import { RouteObject } from "react-router-dom";
import GamePage from "../components/GamePage";
import HomePage from "../components/HomePage";

export const MainRoutePath: RouteObject[] = [
    {
        path: "/",
        element: <HomePage />
    },
    {
        path: "/play",
        element: <GamePage />
    }
];