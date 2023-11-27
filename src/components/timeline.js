import React from "react";
import Skeleton from "react-loading-skeleton";
import UsePhotos from "../hooks/usePhotos";
import Post from "./post";


export default function Timeline() {
    const {photos} = UsePhotos()

    return (
        <div className="container col-span-2">
            {!photos ? (
                <>
                    <Skeleton count={4} width={540} height={400}/>
                </>
            ): photos?.length > 0 ? (
                photos.map((content) => <Post key={content.docId} content={content}/>)
            ) : (
                <p className="text-center text-2xl">Follow people to see photos!</p>
            )}
        </div>
    )
}