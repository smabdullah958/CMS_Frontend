
import { useState ,useRef,useEffect } from "react"
import {  useNavigate } from "react-router-dom";
import {motion} from 'framer-motion'

import { Link } from "react-router-dom";
function PROFILE({IsLogIn}){

    let [username,setUsername]=useState("");
    let [email,setemail]=useState("");

    useEffect(()=>{
        if(IsLogIn){
        let storeusername=localStorage.getItem("username")
        let storeemail=localStorage.getItem("email")
        console.log(storeemail,storeusername)
        setUsername(storeusername||"guest")
        setemail(storeemail||"not available")}
      },[IsLogIn])
return(

<div className="w-40 h-28 sm:w-44 sm:h-32  fixed top-28   right-10 transition-all duration-1000 rounded-lg shadow-xl bg-[#F4F4F5]   text-wrap overflow-y-hidden overflow-x-auto" >
<ul className="text-wrap">
    <li className="pb-1 pl-4 pt-2  max-h-28 text-wrap overflow-auto"> <span className="font-bold ">Name : </span> {username||"not avaliable"} </li>

    <li  className="pb-5 px-3  max-h-28   text-wrap overflow-x-auto "> <span className="font-bold">Email : </span>{email||"not avaliable"}{IsLogIn? <Link to="/profile" className="text-blue-400 block">...more</Link>:null}
    </li>
</ul>

</div>
    )
}



//for login
function Form({onLogIn }){
let navigate=useNavigate()
//for wrong email or password
let [ERROR,UpdateError]=useState(false);

    let [Email,UpdateEmail]=useState();
    let [Password,UpdatePassword]=useState();


    //for unfill the form
    let [Show,UpdateShow]=useState(false)

    async function Login(){
        let url="http://localhost:5678/login";
         if(!Email||!Password){
            UpdateShow(true)

            return;
        }
        let login= await fetch(url,{
                method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify({email:Email,password:Password})

        })
        let data = await login.json()

        console.log(data.complaints)
        console.log(data)
        if(login.ok){
            alert("login successfully")
            UpdateShow(false)
            //for hide and show the logout button
            //when a user is successfully login than as a result login button is disable and logout is enable
            onLogIn(true)

            UpdateError(false)
//now it will hide the login if currently  we are login
//and also it store the email

//now here full image url
 let   fullImageURL=`http://localhost:5678/upload/${data.image}`  

localStorage.setItem("profile",data.profile);
        
        localStorage.setItem("email",data.email)
        localStorage.setItem("IsLoggedIn","true");
        localStorage.setItem("username",data.username)
        localStorage.setItem("rollno",data.rollno);
        localStorage.setItem("qualification",data.study)
        localStorage.setItem("department",data.dep)
        localStorage.setItem("image",fullImageURL)
        
        console.log(data.profile,data.email,data.username,fullImageURL,data.rollno,data.study,data.dep)
        
        

        let storeprofile=localStorage.getItem("profile")||"";
        console.log(storeprofile)



if(storeprofile==="student")
{
    navigate("/complaint")
}
if(storeprofile==="Principal"){
    navigate("/display");
}
if(storeprofile==="HOD"){
navigate("/HOD")

}
}

        else{
            alert("wrong email or password")
            //for logout hide and show
            onLogIn(false)

            UpdateShow(false)
            UpdateError(true)

        }
        console.log(data)

    }


   return(

<div  >
    {
        ERROR?<p className="text-red-500 mb-2">wrong email or password</p>:null
    }

{
    Show?<p className="text-red-500 mb-2">plz fill the form</p>:null
}


            <input type="email" placeholder="email..." onChange={(item)=>UpdateEmail(item.target.value)} className="p-2 mb-2"/>
        <br />

        <input type="password" placeholder="password..." onChange={(item)=>UpdatePassword(item.target.value)} className="p-2 mb-2"/>
        <br/>   

        <button className="border 2 border-black px-1 rounded-md    hover:bg-slate-300 transition-all duration-150 p-1 " onClick={Login} >Login</button>


<p className="w-44">Don't have an <span className="font-bold">account ? </span><Link to="/SignUp" className="text-blue-600 pl-10">Register</Link> </p>

        </div>
    )
}
//============================


function Home(){

    
//to check the user is login or not
//if isLogin is false than login is enable while logout is a disable while if isLogin is true than login is disable while logout is a enable
let [IsLogIn,IsUpdateLogIn]=useState(false)

    //for  disable and enable logout
    let [logout,updatelogout]=useState(false)

//usestate for a  login   
let [hide,show]=useState(false)

    let loginpopup=useRef(null);
    
    //for popup login
    useEffect(()=>{
        function handleLoginpopup(event){

        if(loginpopup.current&& !loginpopup.current.contains(event.target)){
                show(false)
            }
        }
        if(hide){
            document.addEventListener("mousedown",handleLoginpopup);
        }
            return()=>{
                document.removeEventListener("mousedown",handleLoginpopup)
            }

    },[hide]);

    let profilepopup=useRef(null);

    //usestate for a profile
    let [isprofile,showprofile]=useState(false)

//for popup profile
useEffect(()=>{
function handleProfilepopup(event){
    if(profilepopup.current && !profilepopup.current.contains(event.target)){
        showprofile(false)
    }
}
    if(isprofile){
        document.addEventListener("mousedown",handleProfilepopup)
    }
        return()=>{
    document.removeEventListener("mousedown",handleProfilepopup)
        
    
}
},[isprofile])

    useEffect(()=>{

        //it will check storage for a login
        const loggedIn=localStorage.getItem("IsLoggedIn")==="true"
        IsUpdateLogIn(loggedIn);

    },[])

    async function LogOut(){
        try
        {let url="http://localhost:5678/logout"
        let response=await fetch(url,
            {
                method:"GET",
                credentials:'include'
            }
        )
        let data=await response.json()
    localStorage.clear()
        console.log(data)
    if(response.ok){

        alert("logout successfully ")
       //to check for a logout enabel and disable
        updatelogout(true)

        //to check for a logout
        //if logout successfully than the login is enable while logout is a disable

        IsUpdateLogIn(false)

        localStorage.setItem("IsLoggedIn","false");

    }

    }
    catch(err){
        console.log("error",err)
    }}

//===============================


    return(
        <div style={{backgroundImage:"url('/p1.png')",backgroundSize:"cover" ,backgroundRepeat:"no-repeat",height:"100vh",padding:"4px"  }}>
        
        <div className=" min-h-screen  transition-all">

        <div className="flex justify-end     gap-3 sm:gap-8  ">

<button onClick={()=>showprofile(!isprofile)} className="border-2 border-gray-200 px-1 rounded-xl  transition-all duration-1000 bg-[#F8F8F8] hover:shadow-lg hover:bg-[#E4E4E7]">profile</button>
{isprofile?<PROFILE/>:null}

{
    isprofile &&(
        <div 
        ref={profilepopup}

        >
            <PROFILE IsLogIn={IsLogIn}/>
        </div>
    )
}

        <button className={`border-2 border-gray-200 px-1 rounded-xl transition-all duration-150  ${IsLogIn?" opacity-100 bg-[#F8F8F8] hover:shadow-lg hover:bg-[#E4E4E7] ":" opacity-30"}`} onClick={LogOut}
        disabled={!IsLogIn}
        >Logout</button>

        <button onClick={()=>show(!hide)}
 className={`rounded-xl border-2 border-gray-200 px-2 pb-1  transition-all duration-1000 ${IsLogIn?"opacity-30":"opacity-100 bg-[#F8F8F8] hover:shadow-lg hover:bg-[#E4E4E7]" } `} disabled={IsLogIn}>login</button>

        {
            hide&&(
                <div
                 ref={loginpopup}
                 className="fixed  sm:right-10  bg-[#F4F4F5] p-5 rounded-lg right-0 top-28  ">   
                <Form onLogIn={IsUpdateLogIn}/>
                </div>
            )
        }


        </div>
                    <h1 className="text-black  p-4">

           <p className="sm:p-5 sm:pl-10  text-3xl lg:my-14 ml-2 text-black font-bold md:text-4xl">
            Complain System
    </p>
       <p className="lg:w-3/4 sm:w-[80vw] pt-5 text-black ">
            We have developed a Complaint System where students can easily submit their complaints regarding any issues they face. This system allows students to report problems related to academics, facilities, or any other concerns. The complaints are recorded in a structured database and can be reviewed by the relevant authorities for quick resolution.  With this platform, students can express their concerns conveniently, and the management can address them effectively.
            </p>
          </h1>
        </div>
        </div>
    )
}
export default Home

