import {NavLink} from "react-router-dom";
import {useMovieStore, useMovieConnectionStore} from "../../services/store.js";
import Movie from "../../services/movieClass.js";

export default function Header() {
    // Test functions
    const testAddMovie = (e) => {
        e.preventDefault()
        useMovieStore.getState().addMovie(new Movie({id: 157336, name: "Interstellar", mainGenre: 878}));

        console.log(useMovieStore.getState())
        console.log(useMovieConnectionStore.getState())
    }

    const testRemoveMovie = (e) => {
        e.preventDefault();
        useMovieConnectionStore.getState().removeConnection(1)

        console.log(useMovieConnectionStore.getState())
    }

    // Render the header
    return (
        <header className={'navbar bg-neutral text-neutral-content gap-4 top-0 sticky z-50'}>
            <div className={'navbar-start'}>
                <NavLink className={'btn btn-ghost text-2xl font-bold'} to={'/'}>TMDB<span
                    className={'text-primary'}>Thingy</span></NavLink>
            </div>
            <div className={'navbar-center'}>
                <input type={'text'} placeholder={'Search movie or series'} className={'input input-primary w-96'}/>
            </div>
            <div className={'navbar-end gap-2'}>
                <ul className={"menu menu-horizontal text-lg gap-2 pt-0 pb-0"}>
                    <li><NavLink to={'/graph'}>Movie Graph</NavLink></li>
                </ul>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-secondary rounded-btn text-lg">Menu</div>
                    <ul tabIndex={0}
                        className="menu dropdown-content shadow bg-base-200 rounded-box w-52 text-base-content">
                        <li><a onClick={testAddMovie}>Test Add Movie</a></li>
                        <li><a onClick={testRemoveMovie}>Test remove links</a></li>
                    </ul>
                </div>
            </div>
        </header>
)
}