import {useTheme} from 'styled-components';
import {Images, SvgIcons} from '../../../assets/images';

type SvgImageProps = {
  icon: SvgIcons;
  size?: number | string;
  fill?: string;
};

export const SvgImage = ({icon, size = 25, fill}: SvgImageProps) => {
  const theme = useTheme();
  if (!icon) return null;
  const source = Images[icon];
  if (!source) return null;
  return source({
    width: size,
    height: size,
    fill: fill || theme.colors.iconColor,
    color: fill || theme.colors.iconColor,
  });
};
