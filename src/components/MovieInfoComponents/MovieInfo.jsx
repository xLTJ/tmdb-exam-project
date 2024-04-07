import {useParams} from "react-router-dom";

export default function MovieInfo() {
    const {movieId} = useParams()
    return (
        <div className={"container"}>
            <h1>Get data from movie: {movieId}</h1>
        </div>
    )
}