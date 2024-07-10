'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
const Page = () => {

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        console.log(urlToken || "");
    }, []);


    return (
        <div>
            no user name
        </div>
    )
}

export default Page
