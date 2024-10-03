"use client";

import React, { useState } from "react";

import HeadingSection from "./_components/HeadingSection";
import ContentType from "./_components/ContentType";

import { contentTypeData } from '@/data/convertionContentType'


function Page() {
 

  return (
    <section className=" conversion-section">
      
      <HeadingSection/>

      <div className='flex flex-wrap justify-center items-center  gap-4'>
      {
        contentTypeData && contentTypeData.map((item , index)=>{
           return(
             <ContentType contentData = {item} key={index}/>

           )
        })

      }
    </div>


     
    </section>
  );
}

export default Page;
