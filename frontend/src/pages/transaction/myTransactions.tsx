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
  Alert,
} from "@mui/material";
import { TransactionInterface } from "../../common/interface";
import { useProductContext } from "../../context/product.context";

const MyTransactions = () => {
  const { refetchTransaction, setRefetchTransaction } = useProductContext();
  const [value, setValue] = useState(0);
  const { data, loading, error } = useQuery(GET_USER_TRANSACTIONS, {
    fetchPolicy: refetchTransaction ? "network-only" : "cache-first",
    onCompleted: () => {
      setRefetchTransaction(false);
    },
  });

  const handleChange = (event: React.SyntheticEvent) => {
    const target = event.currentTarget as HTMLElement;
    const newValue = Number(target.getAttribute("data-index"));
    setValue(newValue);
  };

  const noDataAlart = (text: string) => (
    <Alert
      variant="outlined"
      severity="info"
      style={{ width: "250px", margin: "10px auto" }}
    >
      {text}
    </Alert>
  );

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

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
          <Tab label="Borrowed" sx={{ width: "25%" }} data-index={0} />
          <Tab label="Lent" sx={{ width: "25%" }} data-index={1} />
          <Tab label="Sold" sx={{ width: "25%" }} data-index={2} />
          <Tab label="Bought" sx={{ width: "25%" }} data-index={3} />
        </Tabs>
      </AppBar>
      <br />
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
              noDataAlart("No borrowed transactions found.")
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
              noDataAlart("No lent transactions found.")
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
              noDataAlart("No sold transactions found.")
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
              noDataAlart("No bought transactions found.")
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default MyTransactions;
