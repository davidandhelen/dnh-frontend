// @flow
import classNames from "classnames";
import React, { useRef } from "react";

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

type LazyImageType = ImageType & {
  /**
   * When set to `true`, will delay transition on the image to create
   * a staggered fade-in effect.
   */
  delayTransition?: boolean
};

const LazyImage = ({
  alt,
  delayTransition,
  isFullWidth,
  src
}: LazyImageType) => {
  const ref = useRef(null);

  const [isInView] = useIntersectionObserver(ref, {
    threshold: 0.4,
    rootMargin: "10%"
  });

  const classes = classNames({
    [css.fullWidth]: isFullWidth,
    [css.halfWidth]: !isFullWidth,
    [css.fadeSection]: true,
    [css.fadeSection_delayTransition]: delayTransition,
    [css.fadeSection_isVisible]: isInView
  });

  return (
    <div className={classes}>
      <img alt={alt} data-src={src} ref={ref} src={isInView ? src : null} />
    </div>
  );
};

const Image = ({ alt, isFullWidth, src }: ImageType) => {
  const classes = isFullWidth ? css.fullWidth : css.halfWidth;

  return (
    <div className={classes}>
      <img alt={alt} src={src} />
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
      <LazyImage
        alt="Helen is laughing at something funnny David said."
        src={image1956}
      />
      <LazyImage
        alt="Leaning in for a kiss."
        delayTransition={true}
        src={image2082}
      />
      <LazyImage
        alt="Staring off into the distance in front of the Washington Square Arch."
        isFullWidth={true}
        src={image1531}
      />
      <LazyImage alt="Eskimo kisses." src={image1838} />
      <LazyImage
        alt="Looking straight into the camera."
        delayTransition={true}
        src={image1996}
      />
      <LazyImage
        alt="David wrapping his arms around Helen's waist, in black and white."
        isFullWidth={true}
        src={image1974}
      />
      <LazyImage
        alt="Nonchalantly looking away from each other."
        src={image2001}
      />
      <LazyImage
        alt="Staring off into the distance and laughing at other people."
        delayTransition={true}
        src={image1525}
      />
      <BackToTop />
    </div>
  );
};

export default Photos;
