import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const button = ({ url, body, ficon, licon, colour }) => {
  return (
    <Link to={url} style={{ textDecoration: "none" }}>
      <Button
        variant="contained"
        endIcon={licon}
        startIcon={ficon}
        color={colour}
      >
        {body}
      </Button>
    </Link>
  );
};

export default button;
