// @flow
import React from "react";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  SubText,
  BodyText
} from "../../kit/typography";

const Gallery = () => {
  return (
    <div>
      <Heading1>This is a heading level 1</Heading1>
      <Heading2>This is a heading level 2</Heading2>
      <Heading3>This is a heading level 3</Heading3>
      <Heading4>This is a heading level 4</Heading4>
      <Heading5>This is a heading level 5</Heading5>
      <Heading6>This is a heading level 6</Heading6>
      <BodyText>This is a body text</BodyText>
      <SubText>This is a sub text</SubText>
    </div>
  );
};

export default Gallery;
