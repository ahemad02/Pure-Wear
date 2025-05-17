import React, { useContext, useEffect, useState } from "react";
import Layout from "./common/Layout";
import { Link, useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, FreeMode, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { toast } from "react-toastify";

// Import images directly (preferred over relative paths in src)
import img1 from "../assets/images/Mens/five.jpg";
import img2 from "../assets/images/Mens/six.jpg";
import img3 from "../assets/images/Mens/seven.jpg";
import { apiUrl } from "./common/http";
import { CartContext } from "./context/Cart";

const Product = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [productSizes, setProductSizes] = useState([]);
  const [sizeSelected, setSizeSelected] = useState(null);
  const [rating, setRating] = useState(4);
  const [product, setProduct] = useState([]);
  const params = useParams();
  const id = params.id;
  const { addToCart } = useContext(CartContext);

  const fetchProduct = async () => {
    const res = await fetch(`${apiUrl}/get-product/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result.status == 200) {
          setProduct(result.data);
          setProductImages(result.data.product_images);
          setProductSizes(result.data.product_sizes);
        } else {
          toast.error(result.message);
        }
      });
  };

  const handleAddToCart = () => {
    if (productSizes.length > 0) {
      if (sizeSelected == null) {
        toast.error("Please select a size");
      } else {
        addToCart(product, sizeSelected);
        toast.success("Product added to cart");
      }
    } else {
      addToCart(product, null);
      toast.success("Product added to cart");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const images = [img1, img2, img3];

  return (
    <Layout>
      <div className="container product-detail">
        <div className="row">
          <div className="col-md-12">
            <nav aria-label="breadcrumb" className="py-4">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <Link to="/">Home</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to="/shop">Shop</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Dummy Product
                </li>
              </ol>
            </nav>
          </div>
        </div>

        <div className="row mb-5">
          {/* Swiper Gallery */}
          <div className="col-md-5">
            <div className="row">
              {/* Thumbnails */}
              <div className="col-2">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  direction="vertical"
                  spaceBetween={10}
                  slidesPerView={3}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-2"
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                >
                  {productImages &&
                    productImages.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="content">
                          <img
                            src={img.image_url}
                            alt={`thumbnail-${index}`}
                            className="w-100"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>

              {/* Main Image */}
              <div className="col-10">
                <Swiper
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                  style={{
                    "--swiper-navigation-color": "#000",
                    "--swiper-pagination-color": "#000",
                  }}
                >
                  {productImages &&
                    productImages.map((img, index) => (
                      <SwiperSlide key={index}>
                        <div className="content">
                          <img
                            src={img.image_url}
                            alt={`main-${index}`}
                            className="w-100"
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="col-md-7">
            <h2>{product.title}</h2>
            <div className="d-flex">
              <Rating size={20} readonly initialValue={rating} />
              <span className="pt-1 ps-2">10 reviews</span>
            </div>
            <div className="price h3 py-3">
              ${product.price}{" "}
              {product.compare_price && (
                <span className="text-decoration-line-through">
                  ${product.compare_price}
                </span>
              )}
            </div>
            <div>{product.short_description}</div>
            <div className="pt-3">
              <strong>Select Size</strong>
              <div className="sizes pt-2">
                {productSizes &&
                  productSizes.map((size, index) => (
                    <button
                      onClick={() => setSizeSelected(size.size.name)}
                      className={`btn btn-size me-2 ${
                        sizeSelected == size.size.name ? "active" : ""
                      }`}
                      key={index}
                    >
                      {size.size.name}
                    </button>
                  ))}
              </div>
            </div>
            <div className="add-to-cart my-4">
              <button
                onClick={() => handleAddToCart()}
                className="btn btn-primary text-uppercase"
              >
                Add To Cart
              </button>
            </div>

            <hr />

            <div>
              <strong>SKU:</strong>
              {product.sku}
            </div>
          </div>
        </div>
        <div className="row pb-5">
          <div className="col-md-12">
            <Tabs
              defaultActiveKey="description"
              id="uncontrolled-tab-example"
              className="mb-3"
            >
              <Tab eventKey="description" title="Description">
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                ></div>
              </Tab>
              <Tab eventKey="reviews" title="Reviews (10)">
                Reviews Area
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
