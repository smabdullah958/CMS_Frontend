import { useState,useEffect } from "react";

function PROFILEROUTE(){
let [name,updatename]=useState('');
let [email,updateemail]=useState('');
let [rollno,updaterollno]=useState('');
let [profile,updateprofile]=useState('');
let [qualification,updatequalify]=useState('');
let [image,updateimage]=useState('');
let [department,updatedepartment]=useState('');
    useEffect(()=>{
let storeusername=localStorage.getItem("username")
let storeemail=localStorage.getItem("email")
let storeprofile=localStorage.getItem("profile")
let storerollno=localStorage.getItem("rollno")
let storeimage=localStorage.getItem("image")
let storequalification=localStorage.getItem("qualification")
let storedepartment=localStorage.getItem("department")
console.log(storeusername,storeemail,storeprofile,storerollno,storeimage,storequalification,storedepartment)
 
updatename(storeusername||"N/A")
updateemail(storeemail||"N/A")
updateprofile(storeprofile||"Guest");
updaterollno(storerollno);
updatequalify(storequalification);
updatedepartment(storedepartment);
updateimage(storeimage||'N/A')    

},[])

    return( 
                <div className="bg-slate-100 h-screen w-[100vw] sm:overflow-hidden overflow-auto">
            <ul className="sm:pt-24  sm:pb-14 sm:grid sm:grid-cols-2 text-wrap  ">
                
                <img src={image||"not avaliable"} alt=" image" className=" size-40 sm:size-60 md:size-72   rounded-full border-2 border-white sm:mb-20 sm:ml-16 mr-12 ml-5" />
                <div className="mt-10 sm:mt-14 ml-[10%] text-wrap text-black">
                {rollno && <li className="sm:text-2xl pb-2 text-lg">Roll No:{rollno}</li>}
                <li className="sm:text-2xl pb-2 text-lg">username:{name}</li>    
                <li className="sm:text-2xl pb-2 text-lg pr-2">email:{email}</li>
                <li className="text-lg sm:text-2xl pb-2">profile:{profile}</li>
               {department && department !=="null" &&<li className="text-lg sm:text-2xl pb-2">department:{department}</li>}
                {qualification  && <li className="sm:text-2xl pb-2 text-lg">Qualification:{qualification}</li>}
                
                </div>
            </ul>
        
        </div>
    )

}
export default PROFILEROUTE