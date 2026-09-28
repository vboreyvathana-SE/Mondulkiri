import Products from "../components/product_componets/Products";
import Subscription from "../components/product_componets/Subscription";
import Ribbon from "../components/product_componets/Ribbon";
import Estate from "../components/product_componets/Estate";

function Product() {
  return (
    <>
      <Estate />
      <Products />
      <Subscription />
      <Ribbon />
    </>
  );
}

export default Product;