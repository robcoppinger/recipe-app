import { SVGIcon } from './SVGIcon';

export const LockIcon = (props: any) => {
  return (
    <SVGIcon {...props}>
      <path
        d="M336 208v-95a80 80 0 00-160 0v95"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
      <rect
        x="96"
        y="208"
        width="320"
        height="272"
        rx="48"
        ry="48"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </SVGIcon>
  );
};
