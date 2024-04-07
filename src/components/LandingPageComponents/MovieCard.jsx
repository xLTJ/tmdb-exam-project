import {NavLink} from "react-router-dom";

export default function MovieCard({movieInfo}) {

    const formatDate = (dateToConvert) => {
        const date = new Date(dateToConvert);
        const format = {month: 'long', day: 'numeric', year: 'numeric'};
        return date.toLocaleDateString('en-US', format);
    }

    return (
        <NavLink
            className={'card max-w-64 bg-base-200 shadow-lg hover:shadow-accent transition ease-in-out hover:scale-105 shrink-0 first:ml-12 last:mr-12'}
            to={`/movie/${movieInfo.id}`}>
            <figure className={"gradient-mask-b-70"}><img
                src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}.jpg`}/></figure>
            <div className={'card-body pt-5'}>
                <h2 className="card-title">{movieInfo.title}</h2>
                <p>{formatDate(movieInfo.release_date)}</p>
            </div>
        </NavLink>
    )
}