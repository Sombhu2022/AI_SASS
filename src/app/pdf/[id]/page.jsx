"use client";
import CustomTextEditor from "@/components/CustomTextEditor";
import Loader from "@/components/Loader";
import Notify from "@/utils/NotificationManager";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

function PdfContainer() {
  // const [response, setResponse] = useState();
  const [loading, setLoading] = useState(false);
  const [fileContent, setFileContent] = useState();
  const [topicName, setTopicName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [isLoading , setIsLoading] = useState(false)
  const { id } = useParams();

  const router = useRouter();

  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`/api/storage/${id}`);
      console.info(res.data.data);
      setTopicName(res.data.data.file.name);

      const fileUrl = res.data.data.file.url;
      const content = await axios.get(fileUrl);
      // console.log(markdownData.data);
      setFileContent(content.data);
    } catch (error) {
      console.error(error);
      Notify.error(
        error.response.data.message ||
          "somthing error , please referesh this page again!"
      );
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [id]);

  const handleChangeAiRes = (editContent) => {
    setFileContent(editContent);
  };

  const handleRefresh = () => {
    console.log("ok this refresh function is run");

    window.location.reload();
  };

  const submitHandle = async(e)=>{
      e.preventDefault();
      let updatePrompt = [fileContent]
      updatePrompt = [...updatePrompt , `${prompt} add this functionality in this existing project ,,, but if indivisual qustion , then give proper indivisual answar with keypoints and refarance link`]
      try {
        if (updatePrompt && prompt) {
          setLoading(true);
          const { data } = await axios.post("/api/ai/convertion", {
            prompt: prompt,
          });
          const res = data?.data.data;
          if (res) {
            setFileContent(fileContent + res);
          }
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
        Notify.error(error.status == 500?'Network Error ! , Check Your Internet Connection... ':error?.response?.data?.message);  
       
      } finally{
        setLoading(false)
      }
  }

  return (
    <div className="flex justify-center flex-wrap  gap-3">
      <div className=" min-w-full m-3 p-5 md:min-w-[400px] h-[210px] border border-gray-700 rounded-md">
        <h1 className="text-gray-700 font-semibold"> Add somthing  in your existing file </h1>
        <form className=" rounded-md">
          <textarea
            rows={3}
            type="text"
            className="w-full p-3 text-white rounded-lg outline-none   bg-gray-800/10 border border-gray-800 placeholder:text-gray-600"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <div className="w-full flex justify-start gap-5 flex-row-reverse">
            <button
              className={`${
                isLoading
                  ? "bg-blue-600/5 text-blue-600 hover:bg-blue-600/10 hover:text-blue-600 "
                  : " bg-blue-600 hover:bg-blue-700 text-white"
              } px-5 font-semibold py-3 rounded-lg transition-colors duration-300`}
              onClick={submitHandle}
            >
              {!isLoading ? (
              
                  "Continue"
                
              ) : (
                <div className="flex justify-center items-center gap-3">
                  Loading...
                  <SpinnerLoader />
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
      <CustomTextEditor
        content={fileContent}
        fileId={id}
        handleContextChange={handleChangeAiRes}
        isEdit={true}
        documentName={topicName}
        onRefresh={handleRefresh}
      />
    </div>
  );
}

export default PdfContainer;
