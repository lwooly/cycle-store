import { Typography } from "./mui";

const Paragraph = ({children, ...props}) => {
    return (
        <Typography paragraph {...props}>
            {children}
        </Typography>
    );
};

export default Paragraph;