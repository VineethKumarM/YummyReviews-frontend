import "./App.css";
import { useState, useEffect, createContext, useReducer ,useContext} from "react";
import {
	BrowserRouter as Router,
	Route,
	Routes,
	useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/screens/Home";
import Profile from "./components/screens/profile";
import Login from "./components/screens/login";
import Signup from "./components/screens/signup";
import NewPost from "./components/screens/NewPost";
import Usr from "./components/screens/usr";
import { reducer, initialState } from "./reducers/userReducer";
// import { useReducer } from "";
// import

export const UserContext = createContext();

const Routing = () => {
	const history = useNavigate();
	// const [user, setuser] = useState(JSON.parse(localStorage.getItem("user")));
	const {state,dispatch} = useContext(UserContext)
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			dispatch({type:"USER",payload:user})
			history("/");
		} else {
			history("/login");
		}
	}, []);
	return (
		<Routes>
			<Route exact path="/" element={<Home />} />
			<Route exact path="/login" element={<Login />} />
			<Route exact path="/profile" element={<Profile />} />
			<Route exact path="/signup" element={<Signup />} />
			<Route exact path="/newPost" element={<NewPost />} />
			<Route path="/profile/:name" element={<Usr />} />

		</Routes>
	);
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<UserContext.Provider value={{ state, dispatch }}>
			<Router>
				<div className="App">
					<Navbar></Navbar>
					<div className="content">
						<Routing />
					</div>
				</div>
			</Router>
		</UserContext.Provider>
	);
}

export default App;
