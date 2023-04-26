import React from "react";
import { useGlobalState } from "../../context/GlobalState";

const Profile = () => {
  const [state, dispatch] = useGlobalState();

  return (
    <div>
      <h1>{state.currentUser.username}</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam, nobis,
        in at officia, facilis non hic unde sequi inventore explicabo alias
        commodi veritatis amet. Voluptatibus corrupti in cumque pariatur
        temporibus.{state.currentUser?.username}
      </p>
    </div>
  );
};

export default Profile;
