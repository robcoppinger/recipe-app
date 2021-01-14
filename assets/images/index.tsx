import React from 'react';
import Back from './arrow-ios-back-outline.svg';
import Add from './plus-outline.svg';
import AddFilled from './add-circle.svg';
import CloseFilled from './close-circle.svg';

type SvgProps = {
  width?: number;
  height?: number;
};

export const Images = {
  back: (props: SvgProps) => <Back fill="#000000" {...props} />,
  add: (props: SvgProps) => <Add fill="#000000" {...props} />,
  closeFilled: (props: SvgProps) => <CloseFilled fill="#000000" {...props} />,
  addFilled: (props: SvgProps) => <AddFilled fill="#000000" {...props} />,
};
