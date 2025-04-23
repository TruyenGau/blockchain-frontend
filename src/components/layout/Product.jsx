import { useEffect, useState } from "react";
import { ethers } from "ethers";
// import "./Product.css"
// import './index.css';

import Rating from "./Rating";

import close from "./items/close.svg";

const Product = ({ item, provider, account, dappazon, togglePop }) => {
  const [order, setOrder] = useState(null)
  const [hasBought, setHasBought] = useState(false)

  const fetchDetails = async () => {
    const events = await dappazon.queryFilter("Buy")
    const orders = events.filter(
      (event) =>
        event.args.buyer === account &&
        event.args.itemId &&
        item.id &&
        event.args.itemId.toString() === item.id.toString()
    );
    if (orders.length === 0) return

    const order = await dappazon.orders(account, orders[0].args.orderId)
    setOrder(order)
  }

  const buyHandler = async () => {
    const signer = await provider.getSigner();

    const transaction = await dappazon
      .connect(signer)
      .buy(item.id, 1, { value: item.price });
    await transaction.wait();

    alert("Purchase successful!");
  };

  useEffect(() => {
    fetchDetails()
  }, [hasBought])
  return (
    <div className="product">
      <div className="product__details">
        <div className="product__image">
          <img src={`http://localhost:8081/product/a.png`} alt="Product" />
        </div>
        <div className="product__overview">
          <h1>{item.name}</h1>

          <Rating value={item.rating} />

          <hr />

          <p>{item.address}</p>

          <h2>{ethers.utils.formatUnits(item.price.toString(), "ether")} ETH</h2>

          <hr />

          <h2>Overview</h2>

          <h6>

            At Spare Mate Hub, we're your trusted destination for hassle-free automobile purchases. With our user-friendly website, finding your automobile parts is just a click away. Browse our extensive inventory of quality parts, backed by our commitment to transparency and customer satisfaction. Experience seamless transactions and peace of mind knowing that you're dealing with a reputable and reliable automotive partner. Unlock a world of convenience and trust with Spare Mate Hub.
          </h6>
        </div>

        <div className="product__order">
          {/* <h1>{ethers.utils.formatUnits(item.cost.toString(), "ether")} ETH</h1> */}

          <p>
            FREE delivery <br />
            <strong>
              {new Date(Date.now() + 345600000).toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </strong>
          </p>

          {item.stock > 0 ? <p>In Stock. </p> : <p>Out of Stock.</p>}

          <button className="product__buy" onClick={buyHandler}>
            Buy Now
          </button>

          <p>
            <small>Ships from</small> SMH
          </p>
          <p>
            <small>Sold by</small> SMH
          </p>
          {order && (
            <div className='product__bought'>
              Item bought on <br />
              <strong>
                {new Date(Number(order.time.toString() + '000')).toLocaleDateString(
                  undefined,
                  {
                    weekday: 'long',
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric'
                  })}
              </strong>
            </div>
          )}
        </div>
        <buttton onClick={togglePop} className="product__close">
          <img src={close} alt="Close" />
        </buttton>
      </div>
    </div>

  );
};

export default Product;
