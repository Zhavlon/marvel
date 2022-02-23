import {lazy, Suspense} from 'react'
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Loader from "../loader/loader";

const NoMatch = lazy(() => import('../pages/404'))
const MainPage = lazy(() => import('../pages/mainPage'))
const ComicsPage = lazy(() => import('../pages/comicsPage'))
const SingleComicPage = lazy(() => import('../pages/singleComicPage'))

const App = () => {
	return (
		<Router>
			<div className="app">
				<AppHeader/>
				<main>
					<Suspense fallback={<Loader/>}>
						<Switch>
							<Route exact path='/'>
								<MainPage/>
							</Route>
							<Route exact path='/comics'>
								<ComicsPage/>
							</Route>
							<Route exact path='/comics/:comicId'>
								<SingleComicPage/>
							</Route>
							<Route path='*'>
								<NoMatch/>
							</Route>
						</Switch>
					</Suspense>
				</main>
			</div>
		</Router>
	)
}

export default App;