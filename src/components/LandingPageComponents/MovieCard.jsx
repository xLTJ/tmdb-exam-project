import {NavLink} from "react-router-dom";

export default function MovieCard(movieInfo) {
    return (
        <NavLink
            className={'card max-w-64 bg-base-200 shadow-lg hover:shadow-gray-500/50 transition ease-in-out hover:scale-105 shrink-0 first:ml-10 last:mr-10'}
            to={"/search"}>
            <figure className={"gradient-mask-b-70"}><img
                src={'https://image.tmdb.org/t/p/w500/fLbbBf8IlUjLTeY9lWTC3WG9T0P.jpg'}/></figure>
            <div className={'card-body pt-5'}>
                <h2 className="card-title">Serial Experiments Lain</h2>
                <p>(July 6, 1998)</p>
            </div>
        </NavLink>
    )
}