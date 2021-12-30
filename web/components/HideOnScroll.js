import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";


const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
