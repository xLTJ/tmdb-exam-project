import {NavLink} from "react-router-dom";

export default function Header() {
    return (
        <header className={'navbar bg-neutral text-neutral-content gap-4'}>
            <div className={'navbar-start'}>
                <NavLink className={'btn btn-ghost text-2xl font-bold'} to={'/home'}>TMDB<span
                    className={'text-primary'}>Thingy</span></NavLink>
            </div>
            <div className={'navbar-end'}>
                <input type={'text'} placeholder={'Search movie or series'} className={'input input-primary w-96'}/>
            </div>
            <div className={'navbar-end gap-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
                <input type={'checkbox'} value={'light'} className={'toggle theme-controller'}/>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                     stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"/>
                    <path
                        d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/>
                </svg>
            </div>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn text-lg">Menu</div>
                <ul tabIndex={0}
                    className="menu dropdown-content shadow bg-base-100 rounded-box w-52 text-base-content">
                    <li><a>Login to something</a></li>
                    <li><a>Main Page</a></li>
                </ul>
            </div>
        </header>
    )
}