
import {useEffect,useState} from "react"
import { useNavigate } from "react-router-dom";

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
        <div className="w-40 h-28 sm:w-44 sm:h-32  fixed top-14   right-7 sm:right-10 transition-all duration-1000 rounded-lg shadow-xl bg-[#F4F4F5]   text-wrap overflow-y-auto overflow-x-hidden" >
<ul className="text-wrap"> 
    <li className="pb-1 pl-4 pt-2  max-h-28 text-wrap"> <span className="font-bold ">Name : </span> {username||"not avaliable"} </li>
    <li className="pb-1 pl-4 pt-2  max-h-28 text-wrap"> <span className="font-bold ">Email : </span> {email||"not avaliable"} </li>
    

</ul>

</div>
    

    );
}

//for update status
function Updatestatus({complaints}){
    let [update,isupdate]=useState({
        ID:'',
        Status:''
    })
    let [EmptyField,IsEmptyField]=useState(false);
    let [ValidID,IsValidID]=useState(false);
    //to check the status is complete or not
    let [StatusValid,StatusInValid]=useState(false)
    function handler(item){
        isupdate({
        ...update,[item.target.name]:item.target.value
    })
}
async function updateState(){

//to check all field are fileed or not    
    if(!update.ID||!update.Status){
        alert("all filled are required")
        IsEmptyField(true)
        return;
    }
 else{
    IsEmptyField(false)
 }   
 //to check the length of a id
let validcomplaints=complaints.find(
    (complaint)=>complaint.ComplaintRef?._id.substring(0,8)===update.ID);
if(!validcomplaints){
    alert("enter valid id");
    IsValidID(true)
    return
}


else if(update.ID.length!==8){
    IsValidID(true)
    return
}
else{
IsValidID(false)
}

if(validcomplaints.ComplaintRef?.Status==="Completed"){
    alert("this complaint is already completed");
    StatusInValid(true);
    return ;
}
else{
StatusInValid(false);
}
try{
    let url="http://localhost:5678/updateStatus";
let result= await fetch(url,{
method:"Put",
headers:{
    "content-type":"application/json"
},
credentials:"include",
body:JSON.stringify({
COMPLAINTID:update.ID,
Status:update.Status
})
})
    
let showstate=await result.json()
if(result.ok){
    console.log("statu is updated")
    alert("status is updated")
}}
catch(err){
    console.log("internal error")
}
}
    return(
        <div className="w-64 h-52 bg-gray-300 fixed top-20 pl-5 pt-5 rounded-xl mr-5">
        
        {
            EmptyField?<p className="text-red-400">All Field must be filled</p>:null
        }

        {
            ValidID?<p className="text-red-400">enter valid ID</p>:null
        }
        {
            StatusValid?<p className="text-red-500">Complaint is already Resolved</p>:null
        }
        
                <input type="text" placeholder="complaint id" className="border-black border-2 mb-3 p-1" onChange={handler} name="ID" value={update.ID}/><br />

        <select className="border-2 border-black mb-3 p-1" value={update.Status} name="Status" onChange={handler}>
            <option value="">Update Status</option>
            <option value="Progress">In Progress</option>
            <option value="Completed">Resolve</option>  
        </select>
        <br />
        <button onClick={updateState} className="border-2 border-white rounded-3xl px-2 pb-1 mr-5 hover:bg-gray-200 transition-all duration-1000  ">
            Submit</button>

        </div>
    )
}

function HODPRO(){
    let [show,hide]=useState(false)
    let [IsLogIn,setIsloggedIn]=useState(true)
        
        let [SEARCH,UpdateSearch]=useState("");
        
        let [IsData,setData]=useState([]);
    let [filterdata,setfilterdata]=useState([]);
        let [IsLoading,SetLoading]=useState(true);
        let [IsStatus,SetStatus]=useState(false)


        
        useEffect(()=>{
            async function display(){
    
    try{      
              let data="http://localhost:5678/VIEWHOD";
            let result=await fetch(data,{
                method:"GET",   
                credentials:"include"
            });
            
           let  jsonresult=await result.json()
        
            console.log(result);
            let validdData=Array.isArray(jsonresult)?jsonresult.filter(item=>item&&item.ComplaintRef):[];
            setData(validdData);
            setfilterdata(validdData)
            SetLoading(false)
            
    }
    catch(error){
        console.log("not fetch"),
        SetLoading(false)
        setData([]);
        setfilterdata([])
    }
        }
        display()
    },[])
    
     useEffect(()=>{
         if(SEARCH.trim()===""){
            setfilterdata(IsData);
         }
         else{
            const filtered = IsData.filter((item) => {
            const id = item.ComplaintRef?._id?.toLowerCase() || "";
            const searchTerm = SEARCH.toLowerCase();
            return  id.includes(searchTerm);
          });
          setfilterdata(filtered)
        }
      }, [SEARCH, IsData]);
    


    let totalcomplaint=filterdata.length
    
    
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
    
     
    return(
    <>  
    <div className="bg-blue-100  w-full h-16 flex items-center justify-end  ">
    
    <button onClick={LogOut} className="border-2 border-white rounded-3xl px-2 pb-1 mr-5 hover:bg-blue-200 transition-all duration-150  ">LogOut</button>
    
    
    <button onClick={()=>hide(!show)} className="border-2 border-white rounded-3xl px-2 pb-1 mr-5 hover:bg-blue-200 transition-all duration-150  ">profile</button>
    {IsLogIn && show &&<Profile IsLogIn={true}/>}
    
    <button onClick={()=>SetStatus(!IsStatus)} className="border-2 border-white rounded-3xl px-2 pb-1 mr-5 hover:bg-blue-200 transition-all duration-150  "> status</button>
    {IsStatus?<Updatestatus complaints={IsData}/>:null}

    </div>
    
     <div className="h-[100vh] bg-[#f2f2f2] p-4">

        <div className="flex flex-nowrap">     
         <input type="text" onChange={(e)=>UpdateSearch(e.target.value)}  
            placeholder="search here"
            value={SEARCH}
          className="w-2/3 rounded-xl ml-2 h-4 pr-5 py-5     hover:border-black hover:border-2"  /> 

           <span className=" text-xl pl-6 pt-2 font-bold">total complaint:{totalcomplaint}</span> 
           </div>
            {
    IsLoading?<h1 className="text-4xl text-black ">Loading...</h1>:null
      }
      <div className=" max-h-[70vh] overflow-auto pt-6">
    <table border="1" className=" bg-slate-100 h-[98vh] w-full border-collapse ">
    
        <thead >
            
            <tr className=" font-black text-wrap   flex flex-col-4 sm:gap-28 gap-10 " >
                <th className=" px-6 py-3 border-b" >Complaint ID</th>
                <th className=" px-6 py-3 border-b">Status</th>
                <th className=" px-6 py-3 border-b" >Subject</th>
                <th className="px-6 py-3 border-b" >Complaint</th>
                
            </tr>
        </thead>
    
        <tbody className="  text-sm lg:text-lg w-full text-wrap   ">
            {filterdata.map((Comp)=>(
            <tr key={Comp._id} className=" py-4 flex flex-col-4 sm:gap-28 gap-16 border mt-3 ">
            
                <td className=" py-3 px-6     pt-10"
>                               
                    {Comp.ComplaintRef?._id.substring(0,8)}
                    </td>
                    <td className=" px-6 py-3 pt-10  ">{Comp.ComplaintRef?.Status}</td>
                
                <td className="  py-3 px-6 w-20 text-wrap ">{Comp.ComplaintRef?.Subject}</td>
                <div className=" px-6 py-3 h-20 overflow-x-hidden overflow-y-auto w-[300px] ">
                
                <td className=" py-3 max-h-24 overflow-y-auto overflow-x-hidden  whitespace-normal " style={{ scrollbarWidth: "thin", scrollbarColor: "#888 transparent" }}>{Comp.ComplaintRef?.Complaint}</td> 
                </div>
                        </tr>
                        
            ))}
        </tbody>
    
    </table>
    </div>
    </div>
    </>
        )
    }
    
export default HODPRO