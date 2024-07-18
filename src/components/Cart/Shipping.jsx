import React,{Fragment, useState} from 'react';
import MetaData from '../layout/MetaData';
import {useNavigate} from "react-router-dom";
import PinDropIcon from "@material-ui/icons/PinDrop";
import HomeIcon from "@material-ui/icons/Home";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import PublicIcon from "@material-ui/icons/Public";
import PhoneIcon from "@material-ui/icons/Phone";
import TransferWithinAStationIcon from "@material-ui/icons/TransferWithinAStation";
import CheckoutSteps from './CheckoutSteps';
import { Country, State } from "country-state-city";
import { useDispatch , useSelector} from 'react-redux';
import {saveShippingInfo} from "../../actions/cart-actions";
import "./Shipping.css";

function Shipping() {

  const {shippingInfo} = useSelector((state)=>state.cart);

    const [address,setAddress]=useState("");
    const [city,setCity]=useState("");
    const [phone,setPhone]=useState("");
    const [pinCode,setPin]=useState("");
    const [country,setCountry]=useState("");
    const [state,setState]=useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    function shippingSubmitHandler(e)
    {
      e.preventDefault();
      dispatch(saveShippingInfo({address,city,phone,pinCode,country,state}));
      navigate("/order/confirm");
    }

  return (
    <Fragment>
    <MetaData title="Shipping Details" />
    <CheckoutSteps activeStep={0}/>
    <div className="shippingContainer">
      <div className="shippingBox">
        <h2 className="shippingHeading">Shipping Details</h2>

        <form
          className="shippingForm"
          encType="multipart/form-data"
          onSubmit={shippingSubmitHandler}
        >
          <div>
            <HomeIcon />
            <input
              type="text"
              placeholder="Address"
              required
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
            />
          </div>

          <div>
            <LocationCityIcon />
            <input
              type="text"
              placeholder="City"
              required
              value={city}
              onChange={(e)=>setCity(e.target.value)}
            />
          </div>

          <div>
            <PinDropIcon />
            <input
              type="number"
              placeholder="Pin Code"
              required
              value={pinCode}
              onChange={(e)=>setPin(e.target.value)}
            />
          </div>

          <div>
            <PhoneIcon />
            <input
              type="number"
              placeholder="Phone Number"
              required
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              size="10"
            />
          </div>

          <div>
            <PublicIcon />

            <select
              required
              value={country}
              onChange={(e)=>setCountry(e.target.value)}
            >
              <option value="">Country</option>
              
              {Country.getAllCountries().map((item)=>
                <option key={item.isoCode} value={item.isoCode}  >
                   {item.name}
                </option>
              )}
                  
             
            </select>
          </div>

          {
            country &&  <div>
              <TransferWithinAStationIcon />

              <select
                required
                value={state}
                onChange={(e)=>setState(e.target.value)}
              >
                <option value="">State</option>
                
                {State.getStatesOfCountry(country).map((item)=> <option value={item.isoCode} key={item.isoCode} >
                      {item.name}
                      </option>)}
                   
            
              </select>
            </div>
          }
           
          <input
            type="submit"
            value="Continue"
            className="shippingBtn"
            disabled={state ? false : true}
          />
        </form>
      </div>
    </div>
  </Fragment>
  )
}

export default Shipping