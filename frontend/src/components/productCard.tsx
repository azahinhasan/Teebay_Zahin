/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { ProductInfoInterface } from "../common/interface";
import { useNavigate } from "react-router-dom";

const ProductCard: React.FC<{
  data: ProductInfoInterface[];
  canNavigate?: boolean;
  canModify?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}> = ({ data, canNavigate, canModify, onDelete }) => {
  const navigate = useNavigate();

  const navigateHandler = (product: ProductInfoInterface) => {
    console.log(canModify);
    if (canModify) {
      navigate(`/product/edit/${product.id}`);
    } else if (canNavigate) {
      navigate(`/product/${product.id}`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 2,
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
                position: "relative",
                width: "100%",
              }}
              onClick={() => navigateHandler(el)}
            >
              {canModify && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => {
                      onDelete && onDelete(el.id);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              )}
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
