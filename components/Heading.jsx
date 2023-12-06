import { Typography } from "@/components/mui";

const Heading = ({children, component = "h1", variant,  ...props}) => {
    return (
        <Typography component={component} variant ={variant || component} {...props}>
            {children}
        </Typography>
    );
};

export default Heading;