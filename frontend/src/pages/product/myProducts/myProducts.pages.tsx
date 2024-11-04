
import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_OWN_PRODUCTS } from '../../../graphql/queries/product.queries';
import { CircularProgress, Typography } from '@mui/material';
import { ProductInfoInterface } from '../../../common/interface';
import ProductCard from '../../../components/productCard';
import { useProductContext } from "../../../context/product.context";

const MyProductsPage: React.FC = () => {
  const { refetchMyAllProduct,setRefetchMyAllProduct} = useProductContext()
  const { loading, error, data } = useQuery(GET_ALL_OWN_PRODUCTS, {
    fetchPolicy: refetchMyAllProduct?"network-only":"cache-first",
    onCompleted: () => {
      setRefetchMyAllProduct(false);
    },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const products: ProductInfoInterface[] = data.getAllOwnProducts.list;

  return (
    <div>
      {products.length > 0 ? (
        <ProductCard data={products} canNavigate={true} canModify={true}/>
      ) : (
        <Typography>No products available</Typography>
      )}
    </div>
  );
};

export default MyProductsPage;