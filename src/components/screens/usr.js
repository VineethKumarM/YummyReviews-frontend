import React, {useContext} from "react";
import Posts from "../Posts";
import { useParams} from "react-router-dom";
import { UserContext } from "../../App";
import axios from "axios";
import { useEffect } from "react";
const Usr = () => {

	// const {state,dispatch} = useContext(UserContext)
	const {name} = useParams()
	const [applications,setapplications] = React.useState(null)
	const [user,setuser] =React.useState(null) 
	useEffect(()=> {
		fetch(`/usr/${name}`, {
			method: "get",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(res=>res.json())
		.then((response) =>{
			console.log(response);
			setuser(response.savedUser)
			setapplications((response.foods))
		})
	})

	if(!applications || !user){
		return (
			<h1>
				Loading
			</h1>
		)
	}
	else {
	user.password=null
		let pos = Array.from(applications)

		return (
			<div
				className="d-flex 
			main-profile"
			>
				<div className="p-2 left flex-fill bd-highlight">
					<div className="card" style={{ padding: "20px" }}>
						<img
							style={{
								borderRadius: "50%",
								maxWidth: "200px",
								maxHeight: "200px",
							}}
							src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
							alt=""
						/>
						<h6>{user.name.toUpperCase()}</h6>
						<div className="inContent" style={{ textAlign: "left" }}>
							<h6>Wishlist</h6>
							<h6>Favourites</h6>
							<h6>followers</h6>
						</div>
					</div>
				</div>

				<div className="p-2 slider flex-fill bd-highlight">
				
					<Posts applications={pos} flag={true}></Posts>
				</div>

				<div className="p-2 right flex-fill bd-highlight">
					<div
						className="card"
						style={{
							padding: "30px",
							shadow: "inset 0px 8px 8px rgba(0, 0, 0, 0.25)",
						}}
					>
						<h4>Likes</h4>
						<div className="inContent" style={{ textAlign: "left" }}>
							<h6>
								<a href="/">post1</a>
							</h6>
							<h6>
								<a href="/">post1</a>
							</h6>
							<h6>
								<a href="/">post1</a>
							</h6>
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default Usr;
