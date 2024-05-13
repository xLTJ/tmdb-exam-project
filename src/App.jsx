import './App.css'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Root from "./components/RootComponents/Root.jsx";
import LandingPage from "./components/LandingPageComponents/LandingPage.jsx";
import SearchPage from "./components/SearchingPage/SearchPage.jsx";
import MovieInfo from "./components/MovieInfoComponents/MovieInfo.jsx";
import GraphPage from "./components/GraphPage/GraphPage.jsx";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/'} element={<Root/>}>
        <Route path={'/'} element={<LandingPage/>}/>
        <Route path={'/search'} element={<SearchPage/>}/>
        <Route path={'/graph'} element={<GraphPage/>}/>
        <Route path={'/movie/:movieId'} element={<MovieInfo/>}/>
        <Route path={'/tv/:movieId'} element={<MovieInfo/>}/>
    </Route>
), {basename: "/tmdb-exam-project/"})

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
