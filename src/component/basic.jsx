import React, { useState,useCallback,useEffect,useRef } from 'react'

const Basic = () => {

    const[length,setlength]=useState(6);
    const[password,setpassword]=useState("");
    const[numAllow,setnumAllow]=useState(false);
    const[charAllow,setcharAllow]=useState(false);
    const passref=useRef(null);

    const passGenerator=useCallback( ()=>{
        let pass="";
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        if(numAllow)str+="0123456789";
        if(charAllow)str+="`~.,/?;:'{}()-_=+*&^%$#@!";

        for (let i = 0; i <=length; i++) {
            let char=Math.floor(Math.random()* str.length+1);
            pass+=str.charAt(char);
            
        }
        setpassword(pass);
        

       
        
       

    },[length,numAllow,charAllow,setpassword] )

    const passrefClip=useCallback(()=>{
        passref.current?.select();
        window.navigator.clipboard.writeText(password)},[password])

    useEffect(()=>{passGenerator();},[length,charAllow,numAllow,passGenerator]  )

 
  



  return ( <div className='h-screen  flex justify-center mt-10 '  >

    <div className='  bg-slate-400 min-w-80 h-28 rounded-xl ' >

    <div >
    <input value={password} ref={passref} readOnly placeholder='Password Generator' className='m-4  bg-slate-200 rounded-md min-w-60  rounded-r-none p-1' ></input>
    <button onClick={passrefClip} className='bg-blue-500 p-1.5 -ml-4 rounded-2xl rounded-l-none text-sm ' >Copy</button>
    </div>

    <div>
    <input type='range' min={6} max={30} value={length} onChange={(e)=>{setlength(e.target.value)}}  className='m-4 cursor-grab  ' ></input>

    <span className='text-sm' >Length({length})</span>
   <label className='m-2 text-sm cursor-pointer' >
    <input type='checkbox' onChange={()=>{setnumAllow((prev)=>!prev)}} / >Number
    </label>

    <label className='m-2 text-sm cursor-pointer' onChange={()=>{setcharAllow((prev)=>!prev)}}  >
    <input type='checkbox'  / >Character
    </label>

    </div>
    </div>

    </div>
  );
}

export default Basic