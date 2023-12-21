import React from "react";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Videos from "./Videos";
import ChannelCard from "./ChannelCard";
import { fetchFromAPI } from "../utils/fetchFromAPI";
const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null);
  const [videos, setVideos] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setChannelDetail(data?.items[0]);
    });
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then(
      (data) => {
        setVideos(data?.items);
      }
    );
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(180,26,208,0.9093655589123867) 64%, rgba(0,212,255,1) 100%)",
            height: "300px",
            zIndex: 10,
          }}
        />
        <ChannelCard
          channelDetail={channelDetail}
          marginTop="-111px"
        ></ChannelCard>
      </Box>
      <Box display="flex" p="2">
          <Box sx={{ mr: { sm: "100px" } }}/>
          <Videos videos={videos}/>
      </Box>
    </Box>
  );
};

export default ChannelDetail;
