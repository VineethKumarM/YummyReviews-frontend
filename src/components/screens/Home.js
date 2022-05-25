import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Posts from "../Posts";
const Home = () => {
	React.useEffect(() => {
			fetchDetails()
		}, []);
		
		const [applications,setapplications] = React.useState(null)
		const auth = "Bearer " + localStorage.getItem("jwt"); 
		const fetchDetails = async() => {
			const response = await axios.get('/allposts', {
				headers: {
					"Authorization": auth,
				},
			})
			if(response){
				setapplications((response.data.foods))
			}
		}

	if(!applications){
		return (
			<h1>
				Loading
			</h1>
		)
	}
	else {
		let pos = Array.from(applications)
		let cnt=0;
		return (
			<div className="home">
			<Posts  applications={pos} flag={false}/>
			
			</div> 
			
		)
	}
	
	
};

export default Home;
