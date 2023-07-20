import React from "react";
import ContentLoader from "react-content-loader";

const AvatarLoader = () => (
  <ContentLoader
    speed={5}
    width={350}
    height={350}
    viewBox="0 0 350 350"
    backgroundColor="#4d4a61"
    foregroundColor="#423f52"
  >
    <rect x="108" y="277" rx="0" ry="0" width="0" height="1" />
    <circle cx="175" cy="175" r="175" />
    <circle cx="247" cy="223" r="2" />
  </ContentLoader>
);

export default AvatarLoader;
