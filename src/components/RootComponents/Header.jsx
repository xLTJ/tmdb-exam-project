import {NavLink} from "react-router-dom";
import {useMovieStore, useMovieConnectionStore} from "../../services/store.js";
import Movie from "../../services/movieClass.js";

export default function Header() {
    // Test functions
    const testAddMovie = (e) => {
        e.preventDefault()
        useMovieStore.getState().addMovie(new Movie({id: 438631, name: "Dune", mainGenre: 28}));

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
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <input type={'checkbox'} value={'autumn'} className={'toggle theme-controller'}/>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <path
                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
                </svg>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn text-lg">Menu</div>
                    <ul tabIndex={0}
                        className="menu dropdown-content shadow bg-base-100 rounded-box w-52 text-base-content">
                        <li><a onClick={testAddMovie}>Test Add Movie</a></li>
                        <li><a onClick={testRemoveMovie}>Test remove links</a></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}