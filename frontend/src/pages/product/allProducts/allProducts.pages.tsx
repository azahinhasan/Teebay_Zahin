
import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../../../graphql/queries/product.queries';
import { CircularProgress, Typography } from '@mui/material';
import { ProductInfoInterface } from '../../../common/interface';
import ProductCard from '../../../components/productCard';

const AllProductsPage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS, {
    fetchPolicy: "cache-first", // This is the default behavior
  });

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const products: ProductInfoInterface[] = data.getAllProducts.list;

  return (
    <div>
      {products.length > 0 ? (
        <ProductCard data={products} canNavigate={true} />
      ) : (
        <Typography>No products available</Typography>
      )}
    </div>
  );
};

export default AllProductsPage;