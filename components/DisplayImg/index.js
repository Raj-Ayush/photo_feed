import React, { Suspense } from 'react';

import styles from './DisplayImg.module.css';
import Image from 'next/image';
import Loader from '../Loader';





const DisplayImg = (props) => {

 return (
    <div>
        {/* <img className={styles.img} src={props.urls}
         key={props.idx}
        /> */}
            <Image src={props.urls}
                className={styles.img} 
                width={props.wide} 
                height={props.length} 
                key={props.idx}
            />
    </div>
)};
export default DisplayImg;