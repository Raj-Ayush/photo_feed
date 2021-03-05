import next from "next"
import { useRouter } from "next/router";

export default function ImageIdPage(){
    const router = useRouter();
    const { ImageId } = router.query;
    console.log(ImageId);
    return <div>
                hello
                
            </div>
}