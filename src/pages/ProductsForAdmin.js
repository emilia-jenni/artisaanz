import React, { useState, useEffect } from "react";
import ProductCard from "../Components/ProductCard";
import SearchBoxDropdown from "../Components/SearchBoxDropdown";
import SearchBox from "../Components/SearchBox";
import ProductSingle from "./ProductSingle";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import "../Components/Products.css";
import Spinner from "react-bootstrap/Spinner";

const ProductsForAdmin = () => {
  const [tuote, setTuote] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);

  const productFilter = tuote.filter((tuote) => {
    return (
      tuote.nimi.toLowerCase().includes(searchInput.toLowerCase()) ||
      tuote.artesaani.toLowerCase().includes(searchInput.toLowerCase()) ||
      tuote.kategoria.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  useEffect(() => {
    axios
      .get("https://artisaanz.herokuapp.com/product/all")
      .then(setLoading(true))
      .then((resp) => setTuote(resp.data));
    setLoading(true);
  }, []);

  const searchValueHandler = (e) => {
    setSearchInput(e.target.value);
    console.log(searchInput);
  };

  const filteredProducts = productFilter.map((tuote) => {
    return (
      <div key={tuote.id}>
        <ProductCard
          id={tuote.id}
          key={tuote.id}
          kuva={tuote.kuva}
          nimi={tuote.nimi}
          artesaani={tuote.artesaani}
          hinta={tuote.hinta}
          kategoria={tuote.kategoria}
        />
      </div>
    );
  });

  return (
    <main id="products">
      <>
        <SearchBoxDropdown search={searchValueHandler} />
      </>
      <Switch>
        <Route path="/tuotteet/:id">
          <ProductSingle />
        </Route>
        <Route path="/tuotteet" exact>
          <SearchBox search={searchValueHandler} />
          <div className="filteredProducts">{filteredProducts}</div>
          {loading === false && (
            <Spinner
              className="productSpinner"
              animation="border"
              variant="secondary"
            />
          )}
        </Route>
      </Switch>
    </main>
  );
};

export default ProductsForAdmin;