import {useMovieGraphSettings} from "../../services/store.js";

export default function GraphSettings () {
    return (
        <div className={"collapse m-10 max-w-32 z-20"}>
            <input type="checkbox" className={"peer"}/>
            <div
                className="collapse-title text-xl font-medium bg-neutral bg-opacity-10 peer-hover:bg-opacity-60 peer-checked:bg-opacity-40">
                Settings
            </div>
            <div
                className={"bg-neutral bg-opacity-60 collapse-content bg-opacity-10 peer-hover:bg-opacity-60 peer-checked:bg-opacity-40"}>
                <label>
                    <span className={"label-text"}>Show Titles</span>
                    <input
                        type="checkbox"
                        className="toggle toggle-accent mt-2"
                        checked={useMovieGraphSettings(state => state.displayNames)}
                        onClick={useMovieGraphSettings.getState().toggleDisplayText}
                    />
                </label>
            </div>
        </div>
    )
}