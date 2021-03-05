import Link from "next/link";
import { useEffect, useState, Suspense } from 'react';
import DisplayImg from '../components/DisplayImg';
import styles from '../styles/Home.module.css'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import Modal from "react-modal";
import { useRouter } from 'next/router';
import Modalimg from "../components/Modalimg";
import Loader from "../components/Loader";




const customStyles = {
  content : {
    width :"750px",
    height:"600px",
    marginLeft: "18vw",
    top: "20px",
    backgroundColor: "rgba(0,0,0,.0001) !important"
  }
};

const height = [113, 133, 250, 300, 320, 356]
Modal.setAppElement("#__next");
let images = []

export default function Home() {
  const router = useRouter() 
  const [modalIsOpen,setIsOpen] = useState(true)
  const [images, setImages] = useState([])
  function closeModal(){
    setIsOpen(false);
  }
  function openModal(){
    setIsOpen(true);
  }
  function shuffled(){
    height.sort(()=> Math.random()-0.5);
  }
  function fetch1(){
    const apiRoot = "https://api.unsplash.com";
    const accessKey = process.env.REACT_APP_ACCESSKEY;
    fetch(`${apiRoot}/photos/random/?&client_id=${accessKey}&count=30`)
    .then(res => res.json())
    .then((r)=>{
      fetch(`${apiRoot}/photos/random/?&client_id=${accessKey}&count=30`)
        .then(res => res.json())
        .then(r1=> setImages([...images,...r, ...r1]))
        return true;
    } )
    
  }
  
  useEffect(()=>{
    fetch1()
  },[])

    console.log(images.length);


  return (
    <>
      <div className={styles.feed} onChange={shuffled}>
        Photo Feed
      </div>
      <div style={{padding:"20px"}}>
        <ResponsiveMasonry
                  columnsCountBreakPoints={{350:2, 500:2, 600:3, 800: 4, 900: 5}}
              >
                  <Masonry gutter="20px">
                    {images.map((image, index)=>
                      <Link href={`/?ImageId=${image.urls.thumb}&Index=${index}`}
                        key={index}
                        as={`/image/${image.id}`}
                      >
                        <a onClick={openModal}>
                        <Suspense fallback={<Loader/>}>
                          <DisplayImg 
                            urls={image.urls.thumb} 
                            idx={image.id} 
                            alt={image.alt_description}
                            wide={200}
                            length={height[Math.floor(Math.random()*height.length)]}
                            />
                          </Suspense>
                        </a>  
                      </Link>
                    )}
                  </Masonry>
        </ResponsiveMasonry>
        <Modal 
            isOpen={!!router.query.ImageId && modalIsOpen}
            onRequestClose = {()=> router.push("/")}
            style={customStyles}
        >
          <Modalimg imgSrc={router.query.ImageId}
           list1= {images} 
           imgId={router.query.Index}
           modalClose={closeModal}
          />
        </Modal>
      </div>  
    </>
    
  )
}


