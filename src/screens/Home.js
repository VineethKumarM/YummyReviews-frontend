import React from "react";
import Posts from "../components/Posts";
var server= process.env.REACT_APP_BACKEND_URI;
const Home = () => {

	React.useEffect(() => {

		fetch(server+'/allposts', {
			method:"get",
			headers: {
				"Authorization": auth
			}
		}).then(
			res => res.json()
		).then(ress =>{
			setapplications(ress.Food)

		}).catch(
			error => {
				console.log(error);
			}
		)
		}, []);
	
	const [applications,setapplications] = React.useState(null)
	const auth = "Bearer " + localStorage.getItem("jwt"); 


	if(!applications){
		return (
			<h1>
				Loading
			</h1>
		)
	}
	else {
		let pos = Array.from(applications)
		return (
			<div className="home">
			<Posts  applications={pos} flag={false}/>
			
			</div> 
			
		)
	}
	
	
};

export default Home;
