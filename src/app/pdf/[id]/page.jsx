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

    window.location.reload()
  };

  return (
    <div className="flex justify-center items-center">
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
