import {NavLink as Link} from 'react-router-dom'
import './appHeader.scss';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to="/">
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><Link exact activeClassName='app__header-active' to="/">Characters</Link></li>
                    /
                    <li><Link exact activeClassName='app__header-active' to="/comics">Comics</Link></li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;