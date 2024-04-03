import { Typography } from "@mui/material";

const Header = () => {
  return (
    <Typography
      variant="h6"
      sx={{
        color: "white",
        fontWeight: "bold",
        fontSize: "clamp(1.8rem, calc(1.8rem + 0.4vw), 2.2rem)",
        letterSpacing: "2px",
        textTransform: "uppercase",
        textAlign: "center",
        marginY: "20px",
      }}
    >
      tags browser
    </Typography>
  );
};

export default Header;
