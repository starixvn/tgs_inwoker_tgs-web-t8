import React, { useEffect, useState } from "react";

import styled from "styled-components";
import i18n from "../../../utils/i18n";
import MarqueueIcon from "../../../assets/images/home/section/marque-icon.png";
import {UiService} from "../../../api-services/services/UiService";
const AnnounceContainer = styled.div`
  margin-top: 50px;
  width: 1225px;
  height: 38px;
  border-radius: 50px;
  margin: 0 auto;
  background: white;
  border: solid 1px #d0d8ff;
`;
const AnnounceText = styled.div`
  float: left;

  color: #5a6b90;
  font-size: 14px;

  margin-left: 18px;
`;
const MarqueeContainer = styled.div`
  width: 1160px;
  white-space: nowrap;
  font-size: 14px;
  color: #5a6b90;
  float: right;
  line-hight: 26px;
`;

function Marquee(props) {
  const [loaded, setLoaded] = useState(false);

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setLoaded(true);
  });

  useEffect(() => {
    if (loaded) {
      UiService.GetMarquee(i18n.language).then((result) => {
        setAnnouncement(result.data);
      });
    }
  }, [loaded]);

  useEffect(() => {});

  return (
    <AnnounceContainer>
      <AnnounceText>
        <img src={MarqueueIcon} alt="marqueuicon" />
      </AnnounceText>
      <MarqueeContainer>
        <marquee style={{ marginTop: "10px" }}>
          {props.text
            ? props.text.map((row, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "inline",
                      whiteSpace: "nowrap",
                      wordBreak: "keep-all",
                      overflow: "visible",
                    }}
                  >
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{"* "}
                    {row.localization !== null && row.localization.content
                      ? row.localization.content
                      : row.content}
                  </div>
                );
              })
            : ""}
        </marquee>
      </MarqueeContainer>
    </AnnounceContainer>
  );
}
export default Marquee;
