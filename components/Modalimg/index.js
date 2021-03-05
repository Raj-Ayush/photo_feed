import React, { useState } from 'react';
import style from "./modalimg.module.css";
import { useRouter } from 'next/router';


const Modalimg = (props) => {
    const [img, setImg] = useState(props.imgSrc)
    const [id, setImgId] = useState(props.imgId)
    const [left, setLeft] = useState(true)
    const [right, setRight] = useState(true);
    const list = [...props.list1]
    const router = useRouter();
    console.log(list[id].urls.thumb);
    const modalCloseWithOriginalPage = ()=>{
        props.modalClose();
        router.push("/");
    }
    const increase=(ev)=>{
        let imgId = id;
        imgId++;
        if(imgId <= list.length-1)
        {
            setLeft(true);
            setImgId(imgId);
        } 
        else{
            setRight(false)
        }   
    }
    const decrease=(ev)=>{
        let imgId = id;
        imgId--;
        if(imgId >= 0){
            setImgId(imgId);
            setRight(true)
        }
        else{
            setLeft(false)
        }
    } 
    return(
    <div>
        <div style={{display: "flex", justifyContent:"space-between"}}>
            <p style={{color: "green"}}>Touch anywhere in the faded part to exit!.</p>
            <button className={style.btn} onClick={modalCloseWithOriginalPage}>close</button>
        </div>
        <div className={style.control}>
            <h1 className={style.left} onClick={decrease}>{left?<span>&lt;</span>:null}</h1>
            
            {right?<h1 className={style.right} onClick={increase}>&gt;</h1>: null}
        </div>
        <div className={style.animate} style={{textAlign:"center"}}>
            <img src={list[id].urls.thumb} style={{width:"700px", height:"475px"}}/>
        </div>
    </div>
    )
}
    
export default Modalimg;