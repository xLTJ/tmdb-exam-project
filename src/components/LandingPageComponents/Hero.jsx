import {NavLink} from "react-router-dom";

export default function Hero() {
    return (
        <div
            className="hero min-h-[40rem] gradient-mask-b-50 bg-blend-lighten bg-[url('https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg')]">
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold text-white">Movie Website</h1>
                    <p className="py-6 text-white">På denne episke hjemmeside kan du finde episke film (woah)</p>
                    <NavLink className="btn btn-primary" to={'/graph'}>Get Started</NavLink>
                </div>
            </div>
        </div>
    )
}