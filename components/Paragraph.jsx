import { Typography } from './mui';

function Paragraph({ children, ...props }) {
  return (
    <Typography paragraph {...props}>
      {children}
    </Typography>
  );
}

export default Paragraph;
