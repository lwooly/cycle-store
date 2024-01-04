/* eslint-disable react/jsx-props-no-spreading */
import { Typography } from './mui';

function Paragraph({ children, ...props }) {
  return (
    <Typography paragraph {...props}>
      {children}
    </Typography>
  );
}

export default Paragraph;
