/** @format */

import * as React from "react";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  styled,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { useContext } from "react";

import { get } from "../../services/apiMethods";
import { PRIVATE_URLS } from "../../services/urlConstants";
import SettingContext from "../../context/SettingsContext";
import UserContext from "../../context/UserContext";
import LoadingScreen from "../../components/LoaddingScreen";

const Wrapper = styled(Container)(({ theme }) => ({
  display: "flex",
  height: "90vh",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: theme.shape.borderRadius,
  overflow: "hidden",
  width: "100%",
  marginTop: "10px",
}));

const VideoContainer = styled(Box)(() => ({
  display: "flex",
  flex: 1,
  width: "100%",
  height: "100%",
}));

const TYPE = ["OneONoneCall", "GroupCall", "LiveStreaming"];

const CREDENTIAL = {
  OneONoneCall: {
    appId: 914808192,
    serverSecret: "6f4bc5c4a35f3979a591bf2c534f335a",
  },
  GroupCall: {
    appId: 914808192,
    serverSecret: "6f4bc5c4a35f3979a591bf2c534f335a",
  },
  LiveStreaming: {
    appId: 206971782,
    serverSecret: "212d4d9408c30ced21273b86754371f2",
  },
};

export default function Room() {
  const { selectedSetting } = useContext(SettingContext);

  const { roomID } = useParams();

  console.log(roomID, "rooooooommmmmmmmmmmid");
  const navigate = useNavigate();
  const location = useLocation();
  const [isReady, setIsReady] = React.useState(false);
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [zpost, setZpost] = React.useState(null);
  const { state } = location;

  console.log(state, "ssssssssssssssssssssssssssssssssssssssssssssssssss");

  const getRoomDetails = async () => {
    try {
      const { data } = await get(PRIVATE_URLS.meeting.join, {
        params: {
          schoolId: selectedSetting._id,
          roomID: roomID,
        },
      });
    } catch (error) {
      setError("Invalid meeting link!");
      setOpen(true);
    }
    setIsReady(true);
  };

  React.useEffect(() => {
    getRoomDetails();
  }, [selectedSetting, roomID]);

  let myMeeting = async (element) => {
    // generate Kit Token

    let meetingType = state ? state.meetingType : TYPE[0];

    const appID = CREDENTIAL[meetingType]?.appId;
    const serverSecret = CREDENTIAL[meetingType]?.serverSecret;

    console.log(
      appID,
      serverSecret,
      "=============================================="
    );
    let currentUserStringified = window.localStorage.getItem(
      process.env.REACT_APP_CURRENT_USER
    );

    console.log(currentUserStringified);

    let currentUser = JSON.parse(currentUserStringified);
    console.log(currentUser);
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      currentUser._id,
      currentUser.basicInfo.name
    );
    try {
      // Create instance object from Kit Token.
      const zp = ZegoUIKitPrebuilt.create(kitToken);

      // start the call

      zp.joinRoom({
        container: element,
        autoHideFooter: true,
        layout: "Auto",
        enableUserSearch: true,
        showMyMicrophoneToggleButton: true,
        showRoomTimer: true,
        showRemoveUserButton: true,
        scenario: {
          config: {
            role: ZegoUIKitPrebuilt.Host,
          },
          mode: ZegoUIKitPrebuilt[meetingType], // To implement 1-on-1 calls, modify the parameter here to [ZegoUIKitPrebuilt.OneONoneCall].
        },
      });

      setZpost(zp);
    } catch (error) {
      ZegoUIKitPrebuilt.ConsoleError();
      console.log(error, "Error while joining room");
    }
  };

  React.useEffect(() => {
    return () => {
      if (zpost) {
        try {
          zpost.destroy();
        } catch (error) {
          console.log(error, "error while stopping zegocloud");
        }
      }
    };
  }, [zpost]);

  const handleBackPress = () => {
    navigate("/live", { replace: true });
  };

  if (!isReady)
    return <LoadingScreen message="Getting room details..., Please wait!" />;

  return (
    <>
      <Wrapper maxWidth={"xl"}>
        <VideoContainer component={"div"} ref={myMeeting}></VideoContainer>
      </Wrapper>

      <Dialog
        open={open}
        onClose={handleBackPress}
        aria-labelledby="alert-live-session-error"
        aria-describedby="alert-live-session-error-dialog-description">
        <DialogTitle id="alert-live-session-error">{error}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-live-session-error-dialog-description">
            The link you are trying to access either expired || does not exist
            || you are not permitted to see the link
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleBackPress} autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
