// ABOUT

import { useLocation, Link } from "react-router-dom";
import React from "react";

export default function About() {
  return (
    <div id="notFound" className="d-flex justify-content-center">
      <div class="about">
        <img
          src="https://media.licdn.com/dms/image/C5612AQEv740lAGjGbg/article-inline_image-shrink_1000_1488/0/1640508067113?e=1684972800&v=beta&t=lbWRkm4MBbvP5WotxMzEWw2d8TFnpgijWT3TyuSzQOo"
          alt="Titans!"></img>
      </div>
      <div class="centered" style={{ fontFamily: "Courier New" }}>
        <h1>
          <b>
            <i>HUMBLE ORIGINS</i>
          </b>
        </h1>
        <h4>
          <p>
            In early March 2023, four washed-up athletes asked themselves: how
            best to apply our new software skills to target a niche market?
            Missing the irreplaceable high of middle school soccer matches,
            these four created <b>Sports Buddies.</b>
          </p>
          <p>
            {" "}
            The goal is twofold. First: to connect reminiscent athletes with
            like-minded individuals nearby. Second: to display prowess in the
            realms of CRUD, REST, SPA, API and a smattering of other acronyms.
          </p>
          <p>
            The team at SB is committed to connecting athletes of all ages,
            disciplines and skill levels. Healthy competition is a great way to
            bring neighbors together, and no one should have to let their sports
            backgrounds exist as mere memories.
          </p>
          <p>
            There's that saying: "We don't stop playing because we get old. We
            get old because we stop playing." What youthful athleticism will{" "}
            <i>you</i> rediscover today?
          </p>
          <p>
            (Note: none of the SB creators are in this photo. Absolutely zero of
            them.)
          </p>
        </h4>
      </div>
    </div>
  );
}
