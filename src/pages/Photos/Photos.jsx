// @flow
import React from "react";

import BackToTop from "../../kit/BackToTop";

import image1525 from "./assets/1525.jpg";
import image1531 from "./assets/1531.jpg";
import image1838 from "./assets/1838.jpg";
import image1956 from "./assets/1956.jpg";
import image1974 from "./assets/1974.jpg";
import image1996 from "./assets/1996.jpg";
import image2001 from "./assets/2001.jpg";
import image2082 from "./assets/2082.jpg";
import image2119 from "./assets/2119.jpg";

import css from "./Photos.module.scss";

type ImageType = {
  alt: string,
  imgSrc: string,
  isFullWidth?: Boolean
};

const Image = ({ alt, imgSrc, isFullWidth }: ImageType) => {
  const classes = isFullWidth ? css.fullWidth : css.halfWidth;

  return (
    <div className={classes}>
      <img alt={alt} src={imgSrc} />
    </div>
  );
};

const Photos = () => {
  return (
    <div className={css.container}>
      <Image
        alt="Staring off into the distance while sitting on the curb."
        imgSrc={image2119}
        isFullWidth={true}
      />
      <Image
        alt="Helen is laughing at something funnny David said."
        imgSrc={image1956}
      />
      <Image alt="Leaning in for a kiss." imgSrc={image2082} />
      <Image
        alt="Staring off into the distance in front of the Washington Square Arch."
        imgSrc={image1531}
        isFullWidth={true}
      />
      <Image alt="Eskimo kisses." imgSrc={image1838} />
      <Image alt="Looking straight into the camera." imgSrc={image1996} />
      <Image
        alt="David wrapping his arms around Helen's waist, in black and white."
        imgSrc={image1974}
        isFullWidth={true}
      />
      <Image
        alt="Nonchalantly looking away from each other."
        imgSrc={image2001}
      />
      <Image
        alt="Staring off into the distance and laughing at other people."
        imgSrc={image1525}
      />
      <BackToTop />
    </div>
  );
};

export default Photos;
