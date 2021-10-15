import { useState, useEffect } from "react";
import axios from "axios";

const ProductsAPI = () => {

  // get products
  const [products, setProducts] = useState([]);
  // Callback
  const [callback, setCallback] = useState(false);
  // Get category value
  const [category, setCategory] = useState("");
  // Get sort value
  const [sort, setSort] = useState('');
  // Get page value
  const [page, setPage] = useState(1);
  // Get search value
  const [search, setSearch] = useState('');
  // Get result value
  const [result, setResult] = useState(0);

  useEffect(() => {
     // get products from mongodb
      const getProducts = async () => {
        const res = await axios.get(`/api/products?limit=${page*9}&${category}&${sort}&title[regex]=${search}`);
        setProducts(res.data.products);
        setResult(res.data.result);
      };

    getProducts();
  }, [callback, category, page, sort, search]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    page: [page, setPage],
    search: [search, setSearch],
    result: [result, setResult],
  };
};

export default ProductsAPI;
