import { useState } from "react";




function Track(){
let [Show,IsShow]=useState(false);
    let [search,IsSearch]=useState('');
let [Result,SetResult]=useState(null)
let [error,Iserror]=useState('')    
async function handleSearch(event){
        try{

            if(event&&event.preventDefault){
                event.preventDefault();
            }

            //clear previeou result
            SetResult(null);
            IsShow(false)
            Iserror('')

            if(!search.trim()){
                Iserror(" Enter Valid Complaint ID ")
                return
            }


            let  url=`http://localhost:5678/SEARCHING/${search}`;
            let response=await fetch(url,{
                method:"GET",
                credentials:"include",
            });
        
            if(!response.ok){
                console.log("erro");
                Iserror("No Result Found")
                return
            }
       
            let data=await response.json();
        console.log(data);
        SetResult(data);
        IsShow(true)
        console.log("success");
        }
        catch(error){
            console.log("error",error);
        }
    }
    return(
        <div className=" h-screen w-full " style={{backgroundImage:"url(/bg.png)", backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
            <input type="text" className="w-1/2 ml-14 sm:w-96 mt-20 sm:ml-32  rounded-xl border-white transition-all duration-1000  hover:border-black border-2" placeholder="search here" onChange={(item)=> IsSearch(item.target.value)}
            onKeyDown={(event)=>{if(event.key==='Enter'){
                handleSearch(event)
            }}}
            />
            
            {
                error&&<p className="text-red-600 sm:m-32 text-4xl m-16 ">{error}</p>
            }
            {Show&&Result&&
            (
                <div className="mt-12 pl-20 w-96 sm:w-[80vw]  p-6 ">
             
                    <p><b>RollNo</b> : {Result.ComplaintRef?.userId?.rollno||"N/A"}</p>
                    <p><b> Name</b> : {Result.ComplaintRef?.userId?.username||"N/A"}</p>
                    <p><b> Assign</b> : {Result.AssignTO||'N/A'}</p>
                    <p><b> Status </b>: {Result.ComplaintRef?.Status||'N/A'}</p>
                    <p><b> Subject</b> : {Result.ComplaintRef?.Subject||'N/A'}</p>
                    <p className="h-32 sm:w[70vw] w-[60vw] pr-6 overflow-x-hidden"> <b>Complaint</b> : {Result.ComplaintRef?.Complaint||'N/A'}</p>
                    
                </div>
            ) 
              }
              
                    </div>
    )
}
export default Track