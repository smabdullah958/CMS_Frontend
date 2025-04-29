import {useEffect,useState} from "react"
import { Link, useNavigate } from "react-router";


function Profile({IsLogIn}){
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
        <div className="w-40 h-28 sm:w-44 sm:h-32  fixed top-14   right-7 sm:right-10 transition-all duration-1000 rounded-lg shadow-xl bg-[#F4F4F5]   text-wrap overflow-y-scroll overflow-x-hidden" >
<ul className="text-wrap"> 
    <li className="pb-1 pl-4 pt-2  max-h-28 text-wrap"> <span className="font-bold ">Name : </span> {username||"not avaliable"} </li>
    <li className="pb-1 pl-4 pt-2  max-h-28 text-wrap"> <span className="font-bold ">Email : </span> {email||"not avaliable"} </li>
    

</ul>

</div>
    

    );
}

function Display(){

    let [show,hide]=useState(false)
let [IsLogIn,setIsloggedIn]=useState(true)
    
    let [SEARCH,UpdateSearch]=useState();
    
    let [IsData,setData]=useState([]);
    let [IsLoading,SetLoading]=useState(true);
  
   
        async function display(){

try{      
          let data="http://localhost:5678/display";
        let result=await fetch(data,{
            method:"GET",   
            credentials:"include"
        });
        result=await result.json()

        
        console.log(result);
        SetLoading(false)
        setData(result)
        if(!data){
            console.log("internal eror")
        }
}
catch(error){
    console.log("not fetch"),
    SetLoading(false)
}
    }
    useEffect(()=>{
            display()
},[])

async function SEARCHING(searchTerm){
    try{
        if(!searchTerm.trim()){
            console.log("plz enter search")
            //if the search bar is clear than the data is  all the data is  display which it is displaying 
        await     display()
            return;
        }
let url=`http://localhost:5678/search/${searchTerm}`;
let result=await fetch (url,{
    method:"GET",
    credentials:"include"
})
let displayData= await result.json()
console.log(displayData)

setData(displayData)

    }
    catch(error){
        console.log("error",error);
    }
}

function find(e){
    let searchTerm=e.target.value;
    UpdateSearch(searchTerm);
    SEARCHING(searchTerm)
}
let totalcomplaint=IsData.reduce((count,user)=>{
    return count + (user.complaints?user.complaints.length:0);
},0)


//for logout
let navigate=useNavigate()
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
    navigate("/")
   
}

}
catch(err){
    console.log("error",err)
}
}

//for assign complaint to a hod 
let [IsAssiyn,UpdateIsAssiyn]=useState(false)


//here  form is write for a assign to hod
function Assync(){
    let [AssyinField,IsAssiynField]=useState({
        complaintId:"",
        HOD:""
    })
    let Fieldhandler=(item)=>{
        IsAssiynField({
            ...AssyinField,[item.target.name]:item.target.value
        })
        }
        //for valid complaint id
        let [IsValidComplaintId,UpdateValidComplaintId]=useState(false)
        
        let [emptyAssign,IsemptyAssign]=useState(false)

    //for checking the complaint is assign 
    let [alreadyAssign,setAlreadyAssign]=useState(false)
       
        async function AssignTO(){
         if(!AssyinField.complaintId||!AssyinField.HOD){
            alert("plz fill the form")
            IsemptyAssign(true)
            return ;
         }
         IsemptyAssign(false)

         //for valid complaint id
         let allcomplaint=IsData.flatMap(user=>
            user.complaints||[]);
        let selectedcomplaint = allcomplaint.find(complaint=>complaint._id?.substring(0,8)===AssyinField.complaintId);
            
            //check the enter complaint is vlaid or not
         
         if(!selectedcomplaint){
            UpdateValidComplaintId(true)
            alert("plz enter valid complaint id")
            return ;
         }
         UpdateValidComplaintId(false)
         //for validation for reassign
         
         if(selectedcomplaint?.ASSIGNS){
            setAlreadyAssign(true);
            alert("Complaint is Already Assign");
            return
         }
         setAlreadyAssign(false);

            let url="http://localhost:5678/Assign";
            

            let result=await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                credentials:'include',
                body:JSON.stringify({
                    ComplaintID:selectedcomplaint._id,
                AssignTO:AssyinField.HOD
            })
            })

        
        let data=await result.json();
            if(result.ok){
                alert("complaint is Assign")
                //refetch  for displaying the assign hod departement
                let display="http://localhost:5678/display";
                let displayresult=await fetch(display,{
                    method:"GET",
                    credentials:'include'
                });
                let   updatedata= await displayresult.json();
                setData(updatedata);
                console.log("updatedata",updatedata)
      
            }

    }
return(
    <div className="w-60 h-96 border-2 border-red-50 fixed top-20 right-10 pt-5 pl-5 bg-gray-400">
        
    {IsValidComplaintId?<p className="text-red-500">enter valid complaint ID</p>:null}

        {emptyAssign?<p className="text-red-800 mb-1">Plz fill the form</p>:""}

        {alreadyAssign && <p className="text-red-500">Complaint is already assign</p>}

        <label htmlFor="complaint id">Complaint Id</label>
        <input type="text" className="p-2" placeholder="complaint Id" onChange={Fieldhandler} value={AssyinField.complaintId} name="complaintId" />

<br />
<label htmlFor="Assign to ">to</label><br />
<select onChange={Fieldhandler} value={AssyinField.HOD} name="HOD"  className="p-2">
<option value="">Departement</option>
            <option value="Maths" >Maths HOD</option>
            <option value="CS">Computer Science HOD</option>
            <option value="Physics">Physics HOD</option>
            <option value="Bio">Biology HOD</option>
            <option value="Chemistry">Chemistry HOD</option>
            <option value="Political Science">Political Science HOD</option>
            <option value="Stats">Statistic HOD</option>
            <option value="History">History HOD</option> 

</select><br />
<br />

<button className="transition-all duration-200 hover:bg-slate-200 border-2 border-white p-1 rounded-xl" onClick={AssignTO}>submit</button>

    </div>
)
}


return(
<>  
<div className="bg-blue-100  w-full h-16 flex items-center justify-end  ">

<button onClick={LogOut} className="border-2 border-white rounded-3xl px-2 pb-1 mr-5 hover:bg-blue-200 transition-all duration-150  ">LogOut</button>


<button onClick={()=>hide(!show)} className="border-2 border-white rounded-3xl px-2 pb-1 mr-5 hover:bg-blue-200 transition-all duration-150  ">profile</button>
{IsLogIn && show &&<Profile IsLogIn={true}/>}

<button onClick={()=>UpdateIsAssiyn(!IsAssiyn)} className="border-2 border-white rounded-3xl px-2 pb-1 mr-5 hover:bg-blue-200 transition-all duration-150  ">Assign</button>

{IsAssiyn?<Assync/>:null}

</div>

 <div className="h-[100vh] bg-[#f2f2f2] p-4">
         <div className="flex overflow-hidden flex-nowrap">
        <input type="text" placeholder="Search by Rollno Email " onChange={find}  value={SEARCH} className="border-2 border-whit rounded-2xl  sm:ml-26 pl-3  w-2/3 m-2 p-1    hover:border-black hover:border-2 text-sm"  />

       <span className="pl-5 font-bold pt-2 text-xl">total complaint:{totalcomplaint}</span>
       </div> 
        {
IsLoading?<h1 className="text-4xl text-black ">Loading...</h1>:null
  }
  <div className=" max-h-[70vh] overflow-auto pt-6">
 <table border="1" className=" bg-slate-100 h-[95vh] w-full border-collapse  ">

    <thead >
        
        <tr className=" font-black text-wrap" >
        <th className="text-sm  lg:text-xl px-6 py-3 text-left border" >RollNO</th>
            <th className="text-sm  lg:text-xl px-6 py-3 text-left border">Email</th>
            <th className=" text-sm lg:text-xl px-6 py-3 text-left border" >Complaint ID</th>
        
            <th className=" text-sm lg:text-xl pl-6 py-3 text-left border" >Complaint</th>
           <th className="text-sm  lg:text-xl  py-3 pr-6 text-left border">Assign To</th>
        <th className="text-sm  lg:text-xl px-6 py-3 text-left border">Status</th>
        </tr>
    </thead>

    <tbody className="  text-sm lg:text-lg w-full text-wrap  "> 

         {IsData.map((Comp)=>(
        <tr key={Comp._id}  className="  text-wrap border-b ">
            <td className="px-6 py-3  text-wrap my-3 border" >{Comp.rollno ||"Not Mention"}</td>    
            <td className="px-6 py-3 text-center text-wrap my-3 border">{Comp.email||"N/A"}</td>
            
            <td className="px-6 py-3  text-wrap  border" >
                
                
                {
                Comp.complaints.length>0?(

                
                    Comp.complaints.map((record,index)=>(
                        <div key={index} className="h-[67px] mt-9  " >
                            {record._id.substring(0,8)}
                        </div>
                    ))
            ):(
                    "No Complaint ID is found"
                )}    
                                </td>

            <td className="  pl-2 py-3  text-wrap border " >
                {
                Comp.complaints.length > 0 ?( 
                    Comp.complaints.map((record,index)=>(
                        <div key={index} className="m-3 mt-5 w-60 h-16 overflow-x-hidden   overflow-y-auto">
                              {record.Complaint||"No Complaints"}
                        </div>
                    ))
                    
            ):(
                    "No Complaint is Register"
                )}                    </td>
 
<td className=" border text-wrap pr-6 py-3" >
    {
    Comp.complaints.length > 0 ? (                
                    Comp.complaints.map((record,index)=>(
                        <div key={index} className="h-[67px]  mt-7     " >
                            {record.ASSIGNS?.AssignTO||"Not Assign"}
                            </div>
                    ))
                    
                
            ):(
                    "No Complaint is Register"
                )}                    </td>

<td className="  pl-4 border  text-wrap " >{Comp.complaints.length>0?(
                
                Comp.complaints.map((record,index)=>(
                        <div key={index} className="h-[67px]  mt-10">
                         {record.Status||"Pending"}
                        
                        </div>
                    ))

            ):(
                    "No Complaint is Register"
                )}   
                                 </td>

                
                    </tr>
                        
        ))}
    </tbody>

</table> 
</div>
</div>
</>
    )
}
export default Display
