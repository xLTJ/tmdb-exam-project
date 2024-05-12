import {useMovieGraphSettings, useMovieStore} from "../../services/store.js";

// This component is a collapsible settings menu for the graph.
export default function GraphSettings () {
    return (
        <div className={"collapse m-10 max-w-36 z-20"}>
            <input type="checkbox" className={"peer"}/>
            <div
                className="collapse-title text-xl font-medium bg-neutral bg-opacity-20 peer-hover:bg-opacity-60 peer-checked:bg-opacity-40">
                Settings
            </div>
            <div
                className={"bg-neutral bg-opacity-60 collapse-content bg-opacity-10 peer-hover:bg-opacity-60 peer-checked:bg-opacity-40 flex flex-col gap-4"}>
                <label>
                    <div className="divider m-0"></div>
                    <span className={"label-text"}>Node Titles</span>
                    <input
                        type="checkbox"
                        className="toggle toggle-accent mt-2"
                        checked={useMovieGraphSettings(state => state.displayNames)}
                        onClick={useMovieGraphSettings.getState().toggleDisplayText}
                    />
                </label>
                <div className="divider m-0"></div>
                <button
                    className={"btn btn-sm btn-error"}
                    onClick={useMovieStore.getState().removeAllMovies}
                >Remove All Movies
                </button>
                <span className={"text-xs"}>Tip: Right click nodes to delete them fast</span>
            </div>
        </div>
    )
}