import { callDispatch, getSelector } from "@redux/Actions";
import { setMemberProfile } from "@redux/AsyncThunks/AsyncThunksMembers";
import * as React from "react";
import "./UserProfile.scss";
const userIcon =
  "https://firebasestorage.googleapis.com/v0/b/prototype-ae9eb.appspot.com/o/Members%2FMyProfile%2Fuser_icon_150670.png?alt=media&token=c0e68433-ead8-465b-ac37-f6a31feee7f0";

const UserProfile: React.FC = () => {
  const user = getSelector("user");
  const dispatch = callDispatch();

  const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setMemberProfile({
        photoFiles: e.target.files,
        displayName: user.displayName,
        uid: user.uid,
      })
    ).then((resp) => {
      dispatch(
        setMemberProfile(
          resp.payload as {
            displayName: string | null;
            photoURL: string | null;
            uid: string;
          }
        )
      );
    });
  };
  return (
    <div className="user-profile-wrapper">
      <img
        src={user?.photoURL || userIcon}
        alt="profile-image"
        className="user-profile_image"
      />
      <div className="upload-image-container">
        <input
          type="file"
          id="user-image-upload"
          hidden
          onChange={(e) => uploadImage(e)}
        />
        <label htmlFor="user-image-upload">+</label>
      </div>
      <h3 className="user-profile_name">{user?.displayName}</h3>
    </div>
  );
};

export default UserProfile;
