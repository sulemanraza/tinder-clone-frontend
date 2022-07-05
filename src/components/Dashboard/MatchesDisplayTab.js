import axios from "axios";
import { useEffect, useState } from "react";
import "./css/MatchesDisplayTab.css";

const MatchesDisplayTab = ({ matchedProfiles }) => {
  return (
    matchedProfiles && (
      <div className="matches_display">
        {matchedProfiles.map((user, key) => (
          <div
            className="card"
            key={key}
            style={{ backgroundImage: "url(" + user.photos?.[0] + ")" }}
          ></div>
        ))}
      </div>
    )
  );
};

export default MatchesDisplayTab;
