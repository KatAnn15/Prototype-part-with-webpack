import React, { useCallback, useEffect, useState } from "react";
import firebase from "../../Firebase/firebase_setup";
import { Link } from "react-router-dom";
import SearchBar from "../../SearchBar/SearchBar";
import LoginModal from "../LoginModal/LoginModal";
import { isMobile } from "react-device-detect";
import { HeaderGlobalProps, MembersMoreToggle } from "./HeaderGlobalTypes";
import { getSelector } from "@redux/Actions";
import { useDispatch } from "react-redux";
import "./HeaderGlobal.scss";
import { setMemberStatus } from "@redux/UserReducers";
import { initUser } from "@constants/Functions";
import { setModalVisibility } from "@redux/StateReducers";

const HeaderGlobal: React.FC = () => {
  const [logo, updateLogo] = useState<HeaderGlobalProps["logo"]>("");
  const [areaExpanded, setAreaExpanded] =
    useState<MembersMoreToggle["areaExpanded"]>(false);
  const loggedIn = getSelector("membersStatus");
  const subscribed = getSelector("subscribedStatus");
  const dispatch = useDispatch();
  const user = getSelector("user");
  const modalVisible = getSelector("login");

  const fetchLogo = useCallback(async () => {
    const ref = firebase.storage().ref();
    const fileData = await ref.child("ATFImages/netflix.png");
    const file = await fileData.getDownloadURL();
    updateLogo(file);
  }, []);

  const setLoggedInStatus = () => {
    if (loggedIn) {
      dispatch(setMemberStatus(false));
      window.localStorage.removeItem("appAuth-email");
    } else {
      dispatch(setModalVisibility(true));
    }
  };

  const toggleMembersAreaMobile: () => void = () => {
    areaExpanded ? setAreaExpanded(false) : setAreaExpanded(true);
  };

  useEffect(() => {
    fetchLogo();
    initUser();
  }, [fetchLogo]);

  return (
    <div className="header-global_wrapper" data-testid="test_globalHeader">
      <Link to={"/"}>
        <img className="site-logo-img" src={logo} alt="Netflix logo" />
      </Link>
      <SearchBar />
      <div
        className="header-global_members-area"
        style={{ display: isMobile && !areaExpanded ? "none" : "flex" }}
      >
        <span>
          {loggedIn
            ? `Welcome, ${user?.displayName}!`
            : "UNLIMITED TV SHOWS & MOVIES"}
        </span>
        {!subscribed && loggedIn ? (
          <Link to={"/pricing-plans"}>
            <button
              className="subscription-bar"
              data-testid="test_subscribeButton"
            >
              Join Now
            </button>
          </Link>
        ) : null}
        <button
          className="login-bar"
          onClick={setLoggedInStatus}
          data-testid="test_loginButton"
        >
          {loggedIn ? "Sign Out" : "Sign Up"}
        </button>
      </div>
      {isMobile ? (
        <button
          className="members-bar_mobile-more-btn"
          onClick={toggleMembersAreaMobile}
          data-testid="test_members-mobileBtn"
        >
          More
        </button>
      ) : null}
      {modalVisible ? <LoginModal /> : null}
    </div>
  );
};

export default HeaderGlobal;
