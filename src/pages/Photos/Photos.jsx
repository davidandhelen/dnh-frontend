// @flow
import React, { useEffect, useRef } from "react";

import BackToTop from "../../kit/BackToTop";
import { useIntersectionObserver } from "../../kit/useIntersectionObserver";

import css from "./Photos.module.scss";

import image1525 from "./assets/1525.jpg";
import image1531 from "./assets/1531.jpg";
import image1838 from "./assets/1838.jpg";
import image1956 from "./assets/1956.jpg";
import image1974 from "./assets/1974.jpg";
import image1996 from "./assets/1996.jpg";
import image2001 from "./assets/2001.jpg";
import image2082 from "./assets/2082.jpg";
import image2119 from "./assets/2119.jpg";

type ImageType = {
  alt: string,
  src: string,
  isFullWidth?: Boolean
};

const Image = ({ alt, isFullWidth, src }: ImageType) => {
  const ref = useRef(null);

  const [isInView] = useIntersectionObserver(ref, {
    threshold: 0.5,
    rootMargin: "20%"
  });

  let width = "";

  useEffect(() => {
    if (ref.current) {
      width = window.getComputedStyle(ref.current).getPropertyValue("width");
    }

    // if (isInView) {
    //   console.log(alt, isInView);
    // }
  }, [isInView, ref]);

  if (ref.current) {
    width = window.getComputedStyle(ref.current).getPropertyValue("width");
  }

  const widthNumber = Number(width.replace("px", ""));
  let height = widthNumber * 1.49833;
  if (isFullWidth) {
    height = widthNumber * 0.66749662;
  }

  // console.log("width", width);
  // console.log("computing height...", height);

  const classes = isFullWidth ? css.fullWidth : css.halfWidth;

  return (
    <div className={classes} style={{ height: height }}>
      <img alt={alt} ref={ref} src={isInView ? src : null} />
    </div>
  );
};

const Photos = () => {
  return (
    <div className={css.container}>
      <Image
        alt="Staring off into the distance while sitting on the curb."
        isFullWidth={true}
        src={image2119}
      />
      <Image
        alt="Helen is laughing at something funnny David said."
        src={image1956}
      />
      <Image alt="Leaning in for a kiss." src={image2082} />
      <Image
        alt="Staring off into the distance in front of the Washington Square Arch."
        isFullWidth={true}
        src={image1531}
      />
      <Image alt="Eskimo kisses." src={image1838} />
      <Image alt="Looking straight into the camera." src={image1996} />
      <Image
        alt="David wrapping his arms around Helen's waist, in black and white."
        isFullWidth={true}
        src={image1974}
      />
      <Image alt="Nonchalantly looking away from each other." src={image2001} />
      <Image
        alt="Staring off into the distance and laughing at other people."
        src={image1525}
      />
      <BackToTop />
    </div>
  );
};

export default Photos;
