import { lazy } from "react";
const HomePage = lazy(()=>import("../pages/HomePage/HomePage"));

export const routes = [
    {path: "/", page: <HomePage/>, isShowHeader:true},
]