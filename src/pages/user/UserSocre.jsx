import React from "react";

function UserSocre({ name, rank, score, email }) {
  return (
    <div className={email && "userdiv"}>
      <div className="d-flex justify-content-center align-items-center gap-2 userTable">
        <div>{rank}</div>
        <div className="name">{name}</div>
        <div>{score}</div>
      </div>
    </div>
  );
}

export default UserSocre;
