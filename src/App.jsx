import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Root from "./components/RootComponents/Root.jsx";
import LandingPage from "./components/LandingPageComponents/LandingPage.jsx";
import SearchPage from "./components/SearchPage.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'} element={<Root/>}>
        <Route path={'/home'} element={<LandingPage/>}/>
        <Route path={'/search'} element={<SearchPage/>}/>
    </Route>
))

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
