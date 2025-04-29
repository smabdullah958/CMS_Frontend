import { Routes,Route, useNavigate } from "react-router-dom"
import Home from "./home"
import SignUp from "./SignUp.jsx"
import Complaints from "./Complaints.jsx"
import LINK from "./Link.jsx"
import PageNotFound from "./PageNotFound.jsx"
import Display from "./display.jsx"
import PROFILEROUTE from "./profileroute.jsx"
import { useEffect } from "react"
import HODPRO from "./HODPro.jsx"
import Track from "./track.jsx"
function App(){
const navigate=useNavigate()
useEffect(()=>{
  const IsloggedIn =localStorage.getItem("IsLoggedIn");
  console.log(IsloggedIn)

  if(IsloggedIn==="true"){
    const userprofile=localStorage.getItem("profile")

    if("Principal".includes(userprofile)){
      navigate("/display",{replace:true})
    }
    if("HOD".includes(userprofile)){
      navigate("/HOD",{replace:true})
    }
  }
},[navigate])

return(
<div>

<Routes>

<Route element={<LINK/>}>

<Route index element={<Home/>} />


<Route path="/SignUp" element={<SignUp/>}/>


<Route path="/Complaint" element={<Complaints/>}/>
<Route path="/TRACKING" element={<Track/>} />


</Route>


<Route path="/profile" element={<PROFILEROUTE/>}/>
<Route path="/display" element={<Display/>}/>

<Route path="/HOD" element={<HODPRO/>}/>

<Route path="/*" element={<PageNotFound/>}></Route>


  </Routes>
  </div>
)
}
export default App