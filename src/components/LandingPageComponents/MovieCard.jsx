import {Link, NavLink} from "react-router-dom";

// Function to format the date
const formatDate = (dateToConvert) => {
    const date = new Date(dateToConvert);
    const format = {month: 'long', day: 'numeric', year: 'numeric'};
    return date.toLocaleDateString('en-US', format);
}

export default function MovieCard({movieInfo, type}) {
    // Check if the movie is a movie or a series and use the correct key for the date
    const date = type === "movie" ? formatDate(movieInfo.release_date) : formatDate(movieInfo.first_air_date)
    //console.log(movieInfo)

    return (
        <Link
            className={'card max-w-64 bg-base-200 shadow-lg hover:shadow-accent transition ease-in-out hover:scale-105 shrink-0 first:ml-12 last:mr-12'}
            to={`/${type}/${movieInfo.id}`}>
            <figure className={"gradient-mask-b-70"}><img
                src={`https://image.tmdb.org/t/p/w500${movieInfo.poster_path}.jpg`}/></figure>
            <div className={'card-body pt-5'}>
                <h2 className="card-title">{movieInfo.title || movieInfo.name}</h2>
                <p>{date}</p>
            </div>
        </Link>
    )
}