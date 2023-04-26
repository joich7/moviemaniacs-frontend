import React from "react";
import NavbarComp from "../components/NavbarComp";

export default function Homepage() {
  const backdrop =
    "https://image.tmdb.org/t/p/w500/7lmBufEG7P7Y1HClYK3gCxYrkgS.jpg";
  return (
    <div
      className="bg-image h-auto min-vh-100"
      style={{
        backgroundImage: `url(${backdrop})`,
        backgroundRepeat: "no-repeat", height: "300px"
      }}
    >
      <h1>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum
        laboriosam accusamus esse quam, ullam, maxime atque, eligendi ea rerum
        eum adipisci ad voluptate! Unde, alias repellendus. Neque aut delectus
        eos.
      </h1>
    </div>
  );
}
