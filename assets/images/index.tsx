import React from 'react';
import Back from './arrow-ios-back-outline.svg';
import Add from './plus-outline.svg';
import AddFilled from './add-circle.svg';
import CloseFilled from './close-circle.svg';
import Delete from './trash-outline.svg';
import DeleteFilled from './trash.svg';
import Unchecked from './ellipse-outline.svg';
import CheckedFilled from './checkmark-circle.svg';
import Checked from './checkmark-circle-outline.svg';
import Reorder from './reorder-two.svg';
import Cart from './cart-outline.svg';
import List from './list-outline.svg';
import Menu from './menu-outline.svg';

type SvgProps = {
  width?: number | string;
  height?: number | string;
  fill?: string;
  color?: string;
};

export const Images = {
  back: (props: SvgProps) => <Back fill="#000000" color="#000000" {...props} />,
  add: (props: SvgProps) => <Add fill="#000000" color="#000000" {...props} />,
  closeFilled: (props: SvgProps) => (
    <CloseFilled fill="#000000" color="#000000" {...props} />
  ),
  addFilled: (props: SvgProps) => (
    <AddFilled fill="#000000" color="#000000" {...props} />
  ),
  delete: (props: SvgProps) => (
    <Delete fill="#000000" color="#000000" stroke="#000000" {...props} />
  ),
  deleteFilled: (props: SvgProps) => (
    <DeleteFilled fill="#000000" color="#000000" {...props} />
  ),
  unchecked: (props: SvgProps) => (
    <Unchecked fill="#000000" color="#000000" {...props} />
  ),
  checkedFilled: (props: SvgProps) => (
    <CheckedFilled fill="#000000" color="#000000" {...props} />
  ),
  checked: (props: SvgProps) => (
    <Checked fill="#000000" color="#000000" {...props} />
  ),
  reorder: (props: SvgProps) => (
    <Reorder fill="#000000" color="#000000" {...props} />
  ),
  cart: (props: SvgProps) => <Cart fill="#000000" color="#000000" {...props} />,
  list: (props: SvgProps) => <List fill="#000000" color="#000000" {...props} />,
  menu: (props: SvgProps) => <Menu fill="#000000" color="#000000" {...props} />,
};

export type SvgIcons = keyof typeof Images;
