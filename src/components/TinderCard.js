import React, { useEffect, useState } from "react";
import "./tinderCard.css";
import { BsInfoLg } from "react-icons/bs";
import TinderCard from "react-tinder-card";
import axios from "axios";
import TinderCardBtn from "./tinderCardBtn";

const TinderCards = ({ user }) => {
  const [genderUser, setGenderUser] = useState(null);
  const [opacity, setOpacity] = useState(null);
  // const genderUser = db;
  const [lastDirection, setLastDirection] = useState();

  function getAge(dateString) {
    var ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/users${
          user.interest === "everyone" ? "" : "?gender=" + user.interest
        }`
      );

      setGenderUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    user && getUser();
  }, [getUser, user]);

  const UserMatch = async (matchedUserId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/users/add-match`,
        { userId: user._id, matchedUserId: matchedUserId._id }
      );
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, matchedUserId) => {
    if (direction === "right") {
      UserMatch(matchedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    // console.log(name + " left the screen!");
  };

  const matchedUserIds = user?.matches
    .map(({ user_id }) => user_id)
    .concat(user._id);

  const filterGenderUser = genderUser?.filter(
    (genderedUser) => !matchedUserIds.includes(genderedUser._id)
  );

  return (
    genderUser && (
      <div className="swipe_container">
        <div className="card_Container">
          {filterGenderUser?.map(
            (character, index) =>
              character._id !== user._id && (
                <TinderCard
                  className="swipe"
                  key={index}
                  onSwipe={(dir) => swiped(dir, character)}
                  onCardLeftScreen={() => outOfFrame(character)}
                >
                  <div
                    style={{
                      backgroundImage: "url(" + character.photos?.[0] + ")",
                    }}
                    className="card"
                  ></div>

                  {/* <div
                    className={
                      lastDirection === "left" && opacity
                        ? "status_text_Nope opacity"
                        : "status_text_Nope"
                    }
                  >
                    <span>NOPE</span>
                  </div>
                  <div className="status_text_Like">
                    <span>LIKE</span>
                  </div>
                  <div className="status_text_superLike">
                    <span>SUPER LIKE</span>
                  </div> */}

                  <div className="text__overlay"></div>
                  <div className="CardTextArea">
                    <div className="name_age">
                      <h3>{character.firstName}</h3>
                      <span>
                        {getAge(
                          `${character.dob_year}-${character.dob_month}-${character.dob_day}`
                        )}
                      </span>
                    </div>
                    <div className="active">
                      <div>
                        <span></span>
                      </div>
                      <span>Recently Active</span>
                    </div>
                    <div className="about">
                      {character.about.length > 90
                        ? character.about.slice(0, 90) + "..."
                        : character.about}
                    </div>

                    <span className="cardDetailsBtn">
                      <BsInfoLg size={24} />
                    </span>
                  </div>
                  <div className="image-box__overlay"></div>
                </TinderCard>
              )
          )}
          <TinderCardBtn />
        </div>
      </div>
    )
  );
};

export default TinderCards;

const db = [
  {
    name: "Richard Hendricks",
    url: "https://i.imgur.com/oPj4A8u.jpeg",
  },
  {
    name: "Erlich Bachman",
    url: "https://i.imgur.com/Q9WPlWA.jpeg",
  },
  {
    name: "Monica Hall",
    url: "https://i.imgur.com/MWAcQRM.jpeg",
  },
  {
    name: "Jared Dunn",
    url: "https://i.imgur.com/wDmRJPc.jpeg",
  },
  {
    name: "Dinesh Chugtai",
    url: "https://i.imgur.com/OckVkRo.jpeg",
  },
];
