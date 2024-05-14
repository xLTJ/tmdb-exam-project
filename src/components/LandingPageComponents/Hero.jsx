import {Link} from "react-router-dom";

export default function Hero() {
    return (
        <div
            className="hero min-h-[40rem] gradient-mask-b-50 bg-blend-lighten bg-[url('https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg')]">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold text-white">Movie Website</h1>
                    <p className="py-6 text-white">Here you can look up information about movies. You can also add movies to our 3d graph where you can get more movie recommendations and see how different movies connect to eachother. You can also use it for stuff like making your own collection of movies you want to save.</p>
                    <Link className="btn btn-primary" to={'/graph'}>Go to graph</Link>
                </div>
            </div>
        </div>
    )
}