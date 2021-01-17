import React from 'react';
import Back from './arrow-ios-back-outline.svg';
import Add from './plus-outline.svg';
import AddFilled from './add-circle.svg';
import CloseFilled from './close-circle.svg';
import Delete from './trash-outline.svg';
import DeleteFilled from './trash.svg';

type SvgProps = {
  width?: number;
  height?: number;
};

export const Images = {
  back: (props: SvgProps) => <Back fill="#000000" {...props} />,
  add: (props: SvgProps) => <Add fill="#000000" {...props} />,
  closeFilled: (props: SvgProps) => <CloseFilled fill="#000000" {...props} />,
  addFilled: (props: SvgProps) => <AddFilled fill="#000000" {...props} />,
  delete: (props: SvgProps) => (
    <Delete fill="#000000" stroke="#000000" {...props} />
  ),
  deleteFilled: (props: SvgProps) => <DeleteFilled fill="#000000" {...props} />,
};
