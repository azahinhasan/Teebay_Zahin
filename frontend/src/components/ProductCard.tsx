/* eslint-disable @typescript-eslint/no-unused-expressions */
import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { ProductInfoInterface } from "../common/interface";
import { useNavigate } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";

const ProductCard: React.FC<{
  data: ProductInfoInterface[];
  canNavigate?: boolean;
  canModify?: boolean;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}> = ({ data, canNavigate, canModify, onDelete }) => {
  const navigate = useNavigate();

  const navigateHandler = (product: ProductInfoInterface) => {
    if (canNavigate) {
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
                  }}
                >
                  {el.status==="available"&&<EditNoteIcon
                    style={{ color: "#1976D2",cursor: "pointer" }}
                    onClick={() => navigate(`/product/edit/${el.id}`)}
                  />}

                  {el.transactions.length<=0&&<DeleteForeverIcon
                    style={{ color: "red",cursor: "pointer" }}
                    onClick={() => {
                      onDelete && onDelete(el.id);
                    }}
                  />}
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
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
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
