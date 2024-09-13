import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const useProductNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const products = useSelector((state) => state.products.products);
  const [productIds, setProductIds] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    const ids = products.data?.map((product) => product.id);
    setProductIds(ids);

    const currentId = location.pathname.split("/").pop();
    setCurrentProductId(currentId);
  }, [products, location.pathname]);

  const goToNextProduct = () => {
    const currentIndex = productIds.indexOf(currentProductId);
    if (currentIndex < productIds.length - 1) {
      const nextId = productIds[currentIndex + 1];
      setCurrentProductId(nextId);
      navigate(`/app/products/${nextId}`);
    }
  };

  const goToPreviousProduct = () => {
    const currentIndex = productIds.indexOf(currentProductId);
    if (currentIndex > 0) {
      const prevId = productIds[currentIndex - 1];
      setCurrentProductId(prevId);
      navigate(`/app/products/${prevId}`);
    }
  };

  return { goToNextProduct, goToPreviousProduct, isAtFirstProduct: productIds.indexOf(currentProductId) === 0, isAtLastProduct: productIds.indexOf(currentProductId) === productIds.length - 1 };
};

export default useProductNavigation;
