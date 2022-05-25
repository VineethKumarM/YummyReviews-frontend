import react, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import M from "materialize-css";
// import tata from "tata-js";
// vinnie@1234
const Signup = () => {
	const history = useNavigate();
	const [name, setName] = useState("");
	const [email, setemail] = useState("");
	const [password, setpassword] = useState("");
	const PostData = () => {
		if (
			!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
				email
			)
		) {
			alert("Invalid Email");
			setemail("");
			setpassword("");
			return;
		}
		// console.log("hello");
		fetch("/signup", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name,
				email,
				password,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.error) {
					// tata.error(data.error);
					// console.log(error);
					alert(data.error);
				} else {
					alert(data.message);
					history("/login");
				}
			})
			.catch((err) => {
				console.log("There is some error");
			});
	};

	return (
		<div className="mycard">
			<div className="card auth-card ">
				<h2>Sign up</h2>
				<p className="card-text">
					<input
						type="text"
						name="name"
						id="name"
						placeholder="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</p>
				<p className="card-text">
					<input
						type="email"
						name="email"
						id="email"
						placeholder="email"
						value={email}
						onChange={(e) => setemail(e.target.value)}
					/>
				</p>
				<p className="card-text">
					<input
						type="password"
						name="password"
						id="password"
						placeholder="password"
						value={password}
						onChange={(e) => setpassword(e.target.value)}
					/>
				</p>
				<p>
					<Link to="/login"> Already have an account?</Link>
				</p>

				<button className="btn btn-primary" onClick={() => PostData()}>
					Sign Up
				</button>
			</div>
		</div>
	);
};

export default Signup;