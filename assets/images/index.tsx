import React from 'react';
import Back from './arrow-ios-back-outline.svg';
import Add from './plus-outline.svg';

type SvgProps = {
  width?: number;
  height?: number;
};

export const Images = {
  back: (props: SvgProps) => <Back fill="#000000" {...props} />,
  add: (props: SvgProps) => <Add fill="#000000" {...props} />,
};
