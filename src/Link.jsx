import { Link,Outlet} from "react-router-dom";
function LINK(){    
    
    
    
    return(
<div className="min-h-screen flex flex-col" >
<div className="top-0  z-50 w-full bg-[#F8F9FF]   flex justify-between  text-md sm:text-xl h-16  ">


<img src="/logo1.jpg" className="h-14 sm:h-16 rounded-full"/>

<nav className="flex gap-6 items-center ">
<Link to="/" className=" transition-all duration-500 hover:font-bold " >Home</Link>


<Link to="/complaint" className=" transition-all duration-500 hover:font-bold" >complaint</Link>

<Link to="/TRACKING"  className="mr-2 transition-all duration-500 hover:font-bold"  >Track</Link>


</nav>
</div>

<div>

    <Outlet></Outlet>
</div>

</div>
)}  
export default LINK

