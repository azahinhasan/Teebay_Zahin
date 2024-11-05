import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER_TRANSACTIONS } from "../../graphql/queries/transactions.queries";
import ProductCard from "../../components/productCard";
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { TransactionInterface } from "../../common/interface";

const MyTransactions = () => {
  const [value, setValue] = useState(0);
  const { data, loading, error } = useQuery(GET_USER_TRANSACTIONS, {
    fetchPolicy: "cache-first",
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="fixed" sx={{ top: 60 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="transaction tabs"
          sx={{
            backgroundColor: "white",
          }}
        >
          <Tab label="Borrowed" sx={{ width: "25%" }} />
          <Tab label="Lent" sx={{ width: "25%" }} />
          <Tab label="Sold" sx={{ width: "25%" }} />
          <Tab label="Bought" sx={{ width: "25%" }} />
        </Tabs>
      </AppBar>
      <br/>
      <Box p={2} sx={{ marginTop: "10px" }}>
        {value === 0 && (
          <>
            {data.getUserTransactions.borrowed.length > 0 ? (
              <ProductCard
                data={data.getUserTransactions.borrowed.map(
                  (el: TransactionInterface) => el.product
                )}
              />
            ) : (
              <Typography>No borrowed transactions found.</Typography>
            )}
          </>
        )}
        {value === 1 && (
          <>
            {data.getUserTransactions.lent.length > 0 ? (
              <ProductCard
                data={data.getUserTransactions.lent.map(
                  (el: TransactionInterface) => el.product
                )}
              />
            ) : (
              <Typography>No lent transactions found.</Typography>
            )}
          </>
        )}
        {value === 2 && (
          <>
            {data.getUserTransactions.sold.length > 0 ? (
              <ProductCard
                data={data.getUserTransactions.sold.map(
                  (el: TransactionInterface) => el.product
                )}
              />
            ) : (
              <Typography>No sold transactions found.</Typography>
            )}
          </>
        )}
        {value === 3 && (
          <>
            {data.getUserTransactions.bought.length > 0 ? (
              <ProductCard
                data={data.getUserTransactions.bought.map(
                  (el: TransactionInterface) => el.product
                )}
              />
            ) : (
              <Typography>No bought transactions found.</Typography>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyTransactions;
