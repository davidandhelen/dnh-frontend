// flow
import React from "react";

import { BodyText, Heading1, Heading2 } from "../../kit/typography";
import BackToTop from "../../kit/BackToTop";

import { FAQS } from "./constants";

import image1712 from "./assets/1712.jpg";

import css from "./FAQ.module.scss";

const FAQ = () => (
  <div className={css.container}>
    <Heading1 className={css.heading}>Frequently Asked Questions</Heading1>
    <img className={css.image} src={image1712} />
    {FAQS.map((questionSet, index) => (
      <div className={css.wrapper} key={`faq_${index}`}>
        <Heading2 className={css.question}>{questionSet.question}</Heading2>
        <BodyText>{questionSet.answer}</BodyText>
      </div>
    ))}
    <BackToTop />
  </div>
);

export default FAQ;
