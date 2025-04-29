import { useEffect, useState } from "react"

import {  useNavigate } from "react-router";

function Complaints({userprofile}){
let Navigate=useNavigate()

//only student can submit complaint
let [IsError,UpdateError]=useState(false);
let [profile,UpdateProfile]=useState("")        
     
    let [Complain,UpdateComplain]=useState({
        Subject:'',       
        Complaint:""
    });
 
 

    //for validation
    let [error,updateerror]=useState(false)
//for hide and show the button
let isvalid=Complain.Subject && Complain.Complaint  ;

//to check usr is login in or not
const   [isLoggedIn,setIsLoggedIn]=useState(false)

//for check user is login or not if not than it is not post complaint
//for state
    let Complainthandler = (e)=>{
         UpdateComplain({
            ...Complain,[e.target.name]: e.target.value})
            console.log(Complain.Subject,Complain.Complaint)
    }

//for valid complaint and its length
let [validcomplaint,updatevalidcomplaint]=useState(false)


    //for validation
    let valid=(e)=>{
        e.preventDefault()
        if(!Complain.Subject||!Complain.Complaint){
            updateerror(true)

            return
        }
    else{
            updateerror(false)
                }
                let user=localStorage.getItem("profile");
console.log(user)
                
                if(Complain.Complaint.length<2000){
                    updatevalidcomplaint(false)
                }
        else{
            updatevalidcomplaint(true)
        }
   
            }



useEffect(()=>{
    const login=localStorage.getItem("IsLoggedIn")==="true";
    console.log(login)    
    let user=localStorage.getItem("profile");
    UpdateProfile(user);
    console.log(user)
    
    setIsLoggedIn(login)

},[])


    //for post api
    let handler=async (e)=>{
        e.preventDefault();

        if(!isLoggedIn){
            alert("you must login ")
            return;
        }

        let profile=localStorage.getItem("profile");
console.log(profile)

        if(profile==="HOD" || profile==="Principal"){
            alert ("only student can submit complaint")
            UpdateError(true)

            return;
        }
        else{
            console.log("complaint is register")
            UpdateError(false)
            console.log(userprofile)
        }


        try{
        let url="http://localhost:5678/complaint";
            let response= await fetch(url,{
            method:"POST",
            credentials:"include",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                Subject:Complain.Subject,
                Complaint:Complain.Complaint
                
                
            })            
        })
        if(!response.ok){
            alert("some thing went wrong")
            console.log("sdata is not post")
            return
        }

let data=await response.json()
//for set complaint in a local storage
// let storedcomplaint=JSON.parse(localStorage.getItem("complaint"))||[];
// storedcomplaint.push(data.Complaint);
// localStorage.setItem("complaint",JSON.stringify(storedcomplaint))
localStorage.setItem("complaint",data.Complaint)
console.log(data.Complaint)
console.log("post is working",data)
alert("your complaint has been register")
Navigate('/');
        }
    catch(error){       
        console.log("eror",error)
    }}

    return(
        <div className=" h-screen p-5" style={{backgroundImage:"url(/bg2.png)",backgroundSize:"cover" ,backgroundRepeat:"no-repeat",height:"100vh",padding:"4px"}}>
            
        <form onSubmit={valid} className=" h-[70vh]  p-2   md:w-1/2 lg:p-10 md:m-10 lg:mx-32">
        {/* <img src="/src/assets/complaint.png" className="size-16 mb-5" alt="" /> */}
            
            <p className="text-lg font-bold sm:text-2xl pb-5">Complaint Registration</p>

            {
                IsError?<p className="text-red-600">only student can submit the complaint </p>:null
            }
            
            {
                error?<p className="text-red-600">plz fill the form</p>:null
            }
            {
                isLoggedIn?null:<p className="text-red-600 mb-2">Complaint is not Submit before signup or login</p>
            }

            {
                validcomplaint?<p className="text-red-600 mb-2">Your complaint character is exceeds than 10000</p>:null
            }

       <input type="text" placeholder="Subject..." onChange={Complainthandler} value={Complain.Subject} name="Subject"  className="border-black border-2 p-2 w-52 mb-4 rounded-lg  "/>     
<br/>

        <textarea name="Complaint" value={Complain.Complaint} onChange={Complainthandler} rows="100" cols="100" 
       
        className="border-black border-2 w-52 h-32 mb-4 rounded-lg" placeholder="Your Complaint...  "/>
        <br />

       
<button type="submit"
 disabled={!isvalid}
onClick={handler}
className={`border-2 border-black p-1 rounded-xl transition-all  ${isvalid ?"bg-gray-300 opacity-100 p-1 hover:bg-gray-200 duration-700" : "bg-gray-300 opacity-50"}`}>submit</button>

        </form>
        </div>
    )
}
export default Complaints