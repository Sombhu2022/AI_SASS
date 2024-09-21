"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { contentTypeData } from "@/data/convertionContentType";
import FormSection from "./_components/FormSection";

import axios from "axios";
import MyEditor from "@/components/MyEditor";
import MarkDownTextFormater from "@/components/MarkDownTextFormater";

function Page() {
  const [content, setContent] = useState({});
  const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const { type } = useParams();

  useEffect(() => {
    const data = contentTypeData?.find((ele) => ele?.link === type);
    if (data) {
      setContent(data);
    }
  }, [contentTypeData]);

  const handleContineu = (isContineu) => {
    if (!isContineu) {
      setResponse("");
    }
  };

  const handleSubmit = async (prompt) => {
    console.log(prompt);
    const updatePrompt = [...content?.aiPrompt, prompt];
    console.log(updatePrompt);
    // const formdata = new FormData();
    // formdata.set(updatePrompt)

    try {
      if (updatePrompt) {
        setLoading(true);
        const { data } = await axios.post("/api/ai/convertion", {
          prompt: updatePrompt,
        });

        // Update messages directly
        const res = data?.data;
        if (res) {
          setResponse(response + res);
        }

        // Clear prompt after submission
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <section className="flex flex-wrap justify-center  gap-5">
      {/* form section */}
      <div className="max-w-full md:max-w-[30vw] max-h-min  border border-gray-700 rounded-md">
        <div className=" shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div className="flex items-center space-x-4">
            <i
              className={`text-3xl p-2 rounded-md ${content?.iconBg} ${content?.iconColor}`}
            >
              {content?.icon}
            </i>
            <h3 className="text-xl font-semibold text-gray-300">
              {content?.type}
            </h3>
          </div>
          <div className="mt-4">
            <p className="text-gray-600">{content?.description}</p>
          </div>
        </div>

        <FormSection
          allFields={content?.formData}
          onPrompt={handleSubmit}
          isContineu={handleContineu}
          res={response}
          isLoading = {loading}
        />
      </div>

      {/*  output section */}
      <div className="rounded-md bg-white md:max-w-[50vw] max-w-full">
        <MyEditor content={response} />
      </div>
    </section>
  );
}

export default Page;
