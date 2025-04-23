import { ethers } from "ethers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import './index.css';

const Navigation = ({ account, setAccount }) => {

  const connectHandler = async () => {
    const accounts = await window.ethereum.request({
      method: `eth_requestAccounts`,
    });
    const account = ethers.utils.getAddress(accounts[0]);
    setAccount(account);


  };
  const [userData, setUserData] = useState(null);
  const history = useNavigate();
  // const callProductsPage = async () => {
  //   try {
  //     const res = await fetch('/product', {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       credentials: "include"
  //     });

  //     const data = await res.json();
  //     console.log(data);
  //     setUserData(data);

  //     if (!res.status === 200) {
  //       const error = new Error(res.error);
  //       throw error;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //     history('/login');
  //   }
  // }
  // useEffect(() => {
  //   callProductsPage();
  // }, []);


  return (
    <nav>
      <div className="nav__brand">
        {/* <p> <strong>Hey! { userData?.name}</strong></p> */}
        {/* <strong>Hey! {title} </strong> */}
        <h3>Hey! {userData?.name}</h3>
      </div>

      <input type="text" className="nav__search" />

      {account ? (
        <button type="button" className="nav__connect">
          {account.slice(0, 6) + "..." + account.slice(38, 42)}
        </button>
      ) : (
        <button type="button" className="nav__connect" onClick={connectHandler}>
          Connect
        </button>
      )}

      <ul className="nav__links">
        <li>
          <a href="#Cycle">Cycle</a>
        </li>
        <li>
          <a href="#Bike">Bike</a>
        </li>
        <li>
          <a href="#Car">Car</a>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
