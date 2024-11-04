import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { ProductInfoInterface } from "../common/interface";
import { useNavigate } from "react-router-dom";

const ProductCard: React.FC<{
  data: ProductInfoInterface[];
  canNavigate?: boolean;
}> = ({ data, canNavigate }) => {
  const navigate = useNavigate();

  const navigateHandler = (id: number) => {
    if (canNavigate) {
      navigate(`/product/${id}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 2,
        padding: 2,
      }}
    >
      <Grid container spacing={1} justifyContent="center">
        {data?.map((el: ProductInfoInterface) => (
          <Grid item xs={12} sm={10} md={10} lg={10} key={el.id}>
            <Box
              sx={{
                padding: "2%",
                textAlign: "left",
                border: "1px solid lightgray",
                borderRadius: "5px",
                cursor: canNavigate ? "pointer" : "default",
              }}
              onClick={() => navigateHandler(el.id)}
            >
              <Typography variant="h6">{el.name}</Typography>
              <div style={{ fontSize: "13px", color: "gray" }}>
                Categories: {el.categories.map((cat) => cat.name).join(", ")}
              </div>
              <div style={{ fontSize: "13px", color: "gray" }}>
                Price: ${el.price}
              </div>
              <div
                style={{
                  display: "-webkit-box" as const,
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const,
                  overflow: "hidden" as const,
                  textOverflow: "ellipsis" as const,
                }}
              >
                {el.description}
              </div>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductCard;
