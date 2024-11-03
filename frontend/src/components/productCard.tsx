import React from 'react';
import { Grid, Paper, Typography, Box } from "@mui/material";
import { ProductInfoInterface } from "../common/interface";

const ProductCard: React.FC<{ data: ProductInfoInterface[] }> = ({ data }) => {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 2,
        padding: 2 
      }}
    >
      <Grid container spacing={1} justifyContent="center">
        {data?.map((el: ProductInfoInterface) => (
        <Grid item xs={12} sm={10} md={10} lg={10} key={el.id}>
            <Paper style={{ padding: "10px" }}>
              <Typography variant="h6">{el.name}</Typography>
              <div style={{ fontSize: "7px", color: "gray" }}>
                Categories: {el.categories.map((cat) => cat.name).join(", ")}
              </div>
              <div style={{ fontSize: "7px", color: "gray" }}>
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
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ProductCard;
