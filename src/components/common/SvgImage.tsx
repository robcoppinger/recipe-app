import {useTheme} from 'styled-components';

type SvgImageProps = {
  source: any;
  style?: any;
};

export const SvgImage = ({source, style = {}}: SvgImageProps) => {
  const theme = useTheme();
  if (typeof source !== 'function') return null;
  return source({
    fill: theme.colors.iconColor,
    color: style.fill || theme.colors.iconColor,
    ...style,
  });
};
