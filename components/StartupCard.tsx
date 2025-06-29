import { cn, formatDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "./ui/skeleton";

// export Type StartupCardType chua cac thuoc tinh cua Startup nhung ko lay cac truong trong author 
export type StartupCardType = Omit<Startup,"author"> & {author?: Author};

const StartupCard = ({post}: {post: StartupCardType}) => {
    // Object destructuring
    const {_createdAt, views, author, _id, category, title, description, image} = post;

  
    return (
    <li className="startup-card group">
        <div className="flex-between">
            <p className="startup_card_date">
                {formatDate(_createdAt)}
            </p>
            <div className="flex gap-1.5">
                <EyeIcon className="size-6 text-primary" />
                <span>{views}</span>
            </div>
        </div>

        <div className="flex-between mt-5 gap-5">
            <div className="flex-1">
                <Link href={`/user/${author?._id}`} >
                    {// line-clamp-1: đảm bảo text hiển thị trên một dòng
                    }
                    <p className="text-16-medium line-clamp-1">
                        {author?.name}
                    </p>
                </Link>
                <Link href={`/startup/${_id}`}>
                    <h3 className="text-26-semibold line-clamp-1">
                        {title}
                    </h3>
                </Link>
            </div>
            <Link href={`/user/${author?._id}`} >
                {// rounded-full: border-radius 9999px
                }
                <Image 
                    src={`${author?.image}`}
                    alt="placeholder"
                    width="48"
                    height="48"
                    className="rounded-full"
                />
            </Link>

        </div>
        
        <Link href={`/startup/${_id}`}>
            <p className="startup-card_desc">
                {description}
            </p>

            <img
                src={image}
                alt="startup placeholder"
                className="startup-card_img"
            />
        </Link>

        <div className="flex-between gap-3 mt-5">
            <Link
                href={`/?query=${category?.toLowerCase()}`}
            >
                <p className="text-16-medium">{category}</p>
            </Link>
            <Button className="startup-card_btn" asChild>
                <Link href={`/startup/${_id}`}>
                    Details
                </Link>
            </Button>
        </div>
    </li>
  )
};

export const StartupCardSkeleton = () => {
    return <>
        {[0,1,2,3,4].map((index: number) => {
            <li key={cn("skeleton", index)}>
                <Skeleton className="startup-card_skeleton" />
            </li>
        })}
    </>
}

export default StartupCard