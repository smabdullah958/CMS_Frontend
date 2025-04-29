


import {  useReducer, useState } from "react"

//for navigation
import { useNavigate } from "react-router-dom"

//here onprofilechange is a function which is pass from a parent
function SignUp({onProfileChange,onLogIn}){

    //for navigation
let navigate=useNavigate();

    //it is used to control the empty fields
let [controlval,updateval]=useState(false)

//for controlling the charcter of a username and password
let [UserPass,UpdateUserPass]=useState(false)

//for controlling the email if exist
let [Email,UpdataEmail]=useState(false)

    //inilie value
    let Obj={
        username:'',
        password:'',     
        email:'',
        profile:'',
        study:'',
        dep:'',
        rollno:'',
        image:''
    }

    
    //function
    let reduce=(data,action)=>{
        return{
            ...data,[action.type]:action.val
        }
    
    }


    //it takes the parameter  and this parameter is hold the value of a profile from dropdown like hod studen etc
    
    //it is used for validation that only student can do complaint
    function handleprofilechange(profile){
        dispatch({val:profile,type:"profile"});
        onProfileChange(profile);
        console.log(profile)
    }

    //for rollno
let [rollnovalid,setrollnovalid]=useState(false)

    //to check unique roll no
    let [uniqueRollno,updateuniqueRollno]=useState(false)

//image size
let [size,updatesize]=useState(false)
//image type
let [ImageType,UpdateImageType]=useState(false)

//in rollno only digit are allowed
let [digitRollno,IsdigitRollno]=useState(false)


    //this is used to handle the default behaviour of a browser and also condition of a filed
    function validation(e){
        e.preventDefault()
    //this if is used for handling the empty field
            if(!state.username||!state.password||!state.email||!state.profile||!state.image)
            {
               console.log("some thing went wrong")
               updateval(true)
            return false
            }
            else{
                updateval(false)
            }
            //and this is used for a username and password
            
            if(state.username.length<=4||state.password.length<=4){
                console.log("error in passord or username")
                UpdateUserPass(true)
                return  false
            }
            else{
                UpdateUserPass(false)
            }
       
       //for rollno validtion for student
       if(state.profile === "student"){     
       
       if(state.rollno.length!==4){
                setrollnovalid(true)
            console.log("roll no must be 4 digit")
            return false
            }
            else{
        setrollnovalid(false)
            }

           
        }
        //now validation for a hod or principal
        else if(state.profile==="HOD"||state.profile==="Principal"){
            if(state.rollno===""){
                setrollnovalid(false)
                updateuniqueRollno(false)
                return true
            }
            else{
                
                setrollnovalid(true)
            }
           
        }   
        


        return true //return if all validation are satisfy
    }
    let POSTING=async(e)=>{
       e.preventDefault();
        if(!validation(e)){
        return; //stop if validation is not apply
       }

       let allowedtypes=["image/jpeg","image/png","image/jpg"];
            let maxsize=1024*200;
            if(!allowedtypes.includes(state.image.type)){
                UpdateImageType(true)
                console.log(state.image.type);
                return
            }
            else{
            UpdateImageType(false)
            }
            if(state.image.size>maxsize){
                updatesize(true)
                console.log(state.image.size)
                return
            }
            else{
            updatesize(false)
            }let hideDep=state.dep===""?null:state.dep

        try{
        let url="http://localhost:5678/SignUps";
          let formdata=new FormData();//here we create new object


          //now here we can append all the field to the object
            formdata.append("username",state.username);
            formdata.append("password",state.password)
            formdata.append("email",state.email);
            formdata.append("profile",state.profile);
            formdata.append("study",state.study);
            formdata.append("dep",state.dep);
            formdata.append("rollno",state.rollno);
            formdata.append("image",state.image);
            

console.log([...formdata])

        let response=await fetch(url,{
            method:"POST",            
            credentials: 'include',
            body:formdata,

        }); 
       let data=await response.json();

//now here full image url
       let      fullImageURL=`http://localhost:5678/upload/${data.image}`


       //for storing in a local storage for accessing in a sign in page
        localStorage.setItem("profile",data.profile);
        localStorage.setItem("email",data.email)
        localStorage.setItem("IsloggedIn","true");
        localStorage.setItem("username",data.username)
        localStorage.setItem("rollno",data.rollno);
        localStorage.setItem("qualification",data.study)
        localStorage.setItem("department",data.dep)
        localStorage.setItem("image",fullImageURL)
        console.log(data.profile,data.email,data.username,fullImageURL,data.rollno,data.study,data.dep)
        
        
if(!response.ok){
    console.log("some thing went wrong")
    if(data.error && data.error=="email is already exist"){
        UpdataEmail(true)
        return false
            }
            else{
                UpdataEmail(false)
            }

            if(data.error && data.error=="ROLL NO is exist"){
                updateuniqueRollno(true)
                console.log('rollno is exist')
            return 
            }
            else{
                updateuniqueRollno(false)
            }
            
return
};      
alert("form is submit");


    

localStorage.setItem("IsLoggedIn","true");

//redirect to the complaint component

if(state.profile==="student"){
    navigate('/complaint')
}

if(state.profile==="Principal"){
    navigate('/display')
}
if(state.profile==="HOD"){
    navigate("/HOD")
}
console.log("data",data)


}


    catch(error){
        
        console.log(error.message)
    }
    return
};
    //usereduce has two parameter one is functionand another is inilie value while it return two thing one is state and another is dispatch function
    let [state,dispatch]=useReducer(reduce,Obj)

    console.log("profile",state.profile)
    

    //for hide and show 
    let isvalid=state.username && state.password && state.email && state.profile &&state.image 
    

        //for hide and show the study if profile is a student

        let STUDY=state.profile==="Principal" ||state.profile==="HOD";
        
        
        
    return(
        
    <div className=" overflow-y-auto   h-[100vh] pt-2 pb-6" style={{backgroundImage:"url(/bg.png)", backgroundSize:"cover",backgroundRepeat:"no-repeat"}}  >
     
        
     <form onSubmit={validation}  className=" sm:w-1/2 sm:mx-28 md:mx-32 lg:ml-72 px-10 pt-2 lg:w-1/3 pb-10 mb-4 "  >
        <img src="/signups.png" className="m-1 size-12 sm:size-32" />
{/* to check unique rollno */}

{/* for filetype*/}

{
    ImageType?<p className="text-red-500">only jpg,png and jpeg file is allowed</p>:null
}

{/* for filesize */}
{
    size?<p className="text-red-500">your filesize is exceeds than the 200kb</p>:null
}


{
    uniqueRollno?<p className="text-red-500">Roll No is already exist</p>:null
}


     {/* for rollno validation */}

     {
        rollnovalid?<p className="text-red-500">roll number must contain 4 digit</p>:null
     }
        {/* for empty field */}
        {
            controlval?<p className="text-red-500">plz fill the form <br /> </p>:null
        }
        {/* for control the character of username and passord */}
        {
            UserPass?<p className="text-red-500"> password and username must be 5 or more character </p>:null
        }
{/* if email is already exist so handle  */}
        {
            Email?<p className="text-red-500">" email is already exist"</p>:null
        }

{/* in rollno only digit are allowed */}
{
    digitRollno?<p className="text-red-500">only digit are allowed</p>:null
}        

        <label htmlFor="username" >Username</label>
        <br />
     <input placeholder="username" className="border-black-1000 border-2 mb-2 sm:mb-5 p-1" type="text" onChange={(any)=>{
        dispatch({
            val:any.target.value,
        type:"username"
    })
     }}  /> 
<br/>

<label htmlFor="Email">Email</label><br />  
<input type="email" className="border-2 p-1 border-zinc-300 mb-2 sm:mb-5" placeholder="email" onChange={(item)=>{
    dispatch({val:item.target.value,type:"email"})
    UpdataEmail(false)
    }} />
    <br />
     
     <label htmlFor="password">Password</label><br />
<input type="password" placeholder="password..." className="border-2 border-gray-400 mb-2 sm:mb-5 p-1" 
onChange={(event)=>dispatch({val:event.target.value,type:"password"})}/>
<br />
{/* handleprofilechange is used to handle the profile changel */}
<label htmlFor="Profile" className="mt-5">Profile</label><br />
<select onChange={(item)=>handleprofilechange(item.target.value)}className="sm:mb-5 mb-2 p-1 w-48" >
<option >select profile</option>
<option value="student">Student</option>
<option value="HOD">HOD</option>
<option value="Principal">Principal</option>

</select>

<br />
{/* imge */}
<label htmlFor="profile picture">Profile Picture</label><br />
<input type="file" accept=".jpg,.jpeg,.png" onChange={(item)=>{
    dispatch({val:item.target.files[0],type:"image"})

}} className="text-wrap mb-2 sm:mb-5 " />


<div className={`transition-all ${STUDY?"opacity-50 ":" opacity-100"}`}>


<label htmlFor="ROllno">RollNo</label><br />
<input type="text"   onChange={(item) => {//+
    const value = item.target.value;//+
    if (/^\d*$/.test(value)) {  // This regex checks if the input contains only digits//+
      dispatch({val: value, type: 'rollno'})
      IsdigitRollno(false)//+
    }
    else{
        IsdigitRollno(true)
    }
  }} 
 placeholder="Roll NO" disabled={STUDY} className="border-2 border-zinc-300 sm:mb-5 mb-2 p-1 w-48"/>
<br />
<label htmlFor="Qualification">Qualification</label><br />
<label htmlFor="FSC"className="mx-2"  >FSC</label>
<input type="radio" onChange={(item)=>dispatch({val:item.target.value,type:'study'})} name="study" value="FSC" id="FSC" disabled={STUDY} />

<label htmlFor="BS" className="mx-2">BS</label>
<input type="radio" onChange={(item)=>dispatch({val:item.target.value,type:"study"})} name="study" value="BS" id="BS" disabled={STUDY} />

</div>
{state.profile!=="Principal" &&(
<select onChange={(item)=>dispatch({val:item.target.value,type:"dep"})} name="dep" className="border-2 p-1 border-black my-5 w-48">
            <option >Departement</option>
            <option value="Maths" >Maths</option>
            <option value="CS">Computer Science</option>
            <option value="Physics">Physics</option>
            <option value="Bio">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Political Science">Political Science</option>
            <option value="Stats">Statistic</option>
            <option value="History">History</option> 

        </select>)}
        <br />

     <button  onClick={POSTING} className={`mb-5 text-lg w-48 rounded-xl border-black border-2 px-1 transition-all ${isvalid?"hover:bg-purple-100 opacity-100 ":"bg-gray-300 opacity-50"}`} disabled={!isvalid}>register</button>

      </form> 



      </div>
    )
}
export default SignUp