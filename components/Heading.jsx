import { Typography } from '@/components/mui';

function Heading({ children, component = 'h1', variant, ...props }) {
  return (
    <Typography component={component} variant={variant || component} {...props}>
      {children}
    </Typography>
  );
}

export default Heading;
