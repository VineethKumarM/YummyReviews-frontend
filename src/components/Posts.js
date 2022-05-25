import React,{useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import FontAwesomeIcon
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import  '@fortawesome/fontawesome-free-solid'
import { UserContext } from "../App";



export default function Posts(data) {
	// console.log(applications);
	const {state,dispatch} = useContext(UserContext)
	const history=useNavigate('/login')
	const [liked,setliked] = React.useState("icon");

	const isLiked = function(list) {
		// console.log(list);
		const user = localStorage.getItem("jwt");
		// console.log(list,user);
		if(list.includes(user)) return "icon clicked"
		return "icon"
	}

	const opcheck = function(e){

		let jwt=localStorage.getItem("jwt");
		// console.log('hello');
		if(!jwt) history('/login');
		if(e.target.parentNode.classList.contains('clicked')) {
			e.target.parentNode.classList.remove('clicked')
			unlikepost(e.target.id)
			// console.log(123);
			return;
		}
		e.target.parentNode.classList.add('clicked');
		likepost(e.target.id)
		// console.log(456);
		return ;
	}

	const likepost = (id) => {
		// console.log(this);
		console.log(1);
		fetch('/like', {
			method:"put",
			headers: {
				"Content-Type":"application/json",
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			},
			body:JSON.stringify({
				foodId:id,
			})
		}).then(
			res => {console.log(res);}
		)
	
	}
	// const jwt
	const unlikepost = (id) => {
		console.log(2);
		fetch('/unlike', {
			method:"put",
			headers: {
				"Content-Type":"application/json",
				"Authorization": "Bearer " + localStorage.getItem("jwt")
			},
			body: JSON.stringify({
				foodId:id,
			})
		}).then(
			 res => {console.log(res);})
	
		
	}
	const deletePost = (postid)=>{
        fetch(`/delPost/${postid}`,{
            method:"delete",
            headers:{
                Authorization:"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            // const newData = data.filter(item=>{
            //     return item._id !== result._id
            // })
            // setData(newData)
        })
    }

	
	if(!data.applications){
		return (
			<h1>
				Loading
			</h1>
		)
	}
	else {
		let pos = Array.from(data.applications)
		// console.log(pos,pos.length);
		if (pos.length==0) {
			return (
				<div className="home">
					<div className="card home-card">
					<div className="top">
						<h6>Sample Post</h6>
						<span>author</span>
						<div className="top-right">
							
						<FontAwesomeIcon className="icon" icon="fa-heart" />
						</div>
					</div>
					<div className="photo">
						<img
							className="post-img"
							src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Zm9vZHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60"
							alt=""
						/>
					</div>
					<div className="buttom">
						<p>
							<i>Post Description</i> Lorem ipsum dolor, sit amet consectetur adipisicing
							elit. Neque, facere quos vero!
						</p>
					<FontAwesomeIcon className="icon " icon="thumbs-up" />
					<span>10</span>
					<div className="buttom-right">
							<span>location</span>
						</div>
					{/* <FontAwesomeIcon className="icon " icon="comment" /> */}
					</div>
				</div>
				</div>
			)
		}

		let cnt=0;
		return (
			<div className="home">
			{
			pos.map(post => 
			// {console.log(pos);}
			// {console.log(state);}
					<div className="card home-card" key={post._id}>
					<div className="top" style={{ textAlign: "left" }}>
					
					<div className="top-left" style={{float:"left"}}>
						<div><h4>{post.title}</h4></div>
						<div>
							<Link to={state && post.postedBy._id != state._id ? "/profile/"+post.postedBy.name : "/profile"}>
								<span>{post.postedBy.name.length>12 ?  post.postedBy.name.slice(0,12) + "..." : post.postedBy.name }</span>
							</Link>
						</div>
					</div>
					
					<div className="top-right">
						{data.flag && post.postedBy._id == state._id &&
							<FontAwesomeIcon className="icon" icon="trash" onClick={()=>deletePost(post._id)}/>
						
						}
					<FontAwesomeIcon className="icon" icon="fa-heart" />
					</div>
					</div>

					<div className="photo"
					>
						<img
							className="post-img"
							src="./Untitled-1.png"
							alt="image"
						/>
					</div>
					<div className="buttom">
						<p>
							{post.body}
						</p>
						{state && post.likes.includes(state._id)
                            ? 
							<FontAwesomeIcon className="icon clicked" icon="thumbs-up" onClick={(e) =>{
									e.target.parentNode.classList.remove('clicked')					
									unlikepost(post._id)
								}}/>

                            : 
							<FontAwesomeIcon className="icon" icon="thumbs-up" onClick={(e) =>{
									e.target.parentNode.classList.add('clicked')
									likepost(post._id)
							}}/>

                            }
						{/* <FontAwesomeIcon className={isLiked(post.likes)} id={post._id} icon="thumbs-up" onClick={opcheck }/> */}
						<span>{post.likes.length} likes</span>
						<div className="buttom-right">
							<span>location</span>
						</div>
					</div>
				</div>
				)}
			</div> 
			
		)
	}
	
	
};


