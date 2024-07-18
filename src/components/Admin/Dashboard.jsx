import React, { useEffect,useState } from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import {useAlert} from "react-alert";

// IMPORT TWO HEADER FILES FOR CHART
import Chart from 'chart.js/auto';
import { Doughnut, Line } from "react-chartjs-2";

import { useSelector, useDispatch } from "react-redux";
import Sidebar from "./Sidebar.js";
import MetaData from "../layout/MetaData";

import {getProducts,allOrders,getAllUsers} from "../../actions/admin-actions";
import "./dashboard.css";

function Dashboard() {

  const dispatch = useDispatch();

  const alert=useAlert();

  const {products} = useSelector((state)=>{return state.adminProducts});

  const {orders} = useSelector((state)=>{return state.orders});

  const {users} = useSelector((state)=>{return state.adminUsers});

  const [productsArray, setProducts]=useState([]);
  const [ordersArray, setOrders]=useState([]);
  const [usersArray, setUsers]=useState([]);

  let outOfStock = 0;

  useEffect(()=>{
    if(products)
    {
      setProducts(products);

    }
    if(orders)
    {
      setOrders(orders);
    };

    if(users)
    {
      setUsers(users);
    };

  },[products,orders,users])

  useEffect(()=>{
    dispatch(getProducts());
    dispatch(allOrders());
    dispatch(getAllUsers());
  },[dispatch]);

  productsArray && productsArray.map((item)=>{
    if(item.stock == 0)
    {
      outOfStock++;
    }
  });

  let totalAmount=0;

  orders && orders.map((order)=>{totalAmount = totalAmount + order.totalPrice})

  const lineState={
    labels:["Initial Amount","Amount Earned"],

    datasets:[{
        label:"Total Amount",
        backgroundColor:["tomato"],
        hoverBackgroundColor:["rgb(197,72,48)"],
        data:[0,totalAmount]
    }]
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock,productsArray.length - outOfStock],
      },
    ],
  };

  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />

      <div className="dashboardContainer">
        <Typography component="h1">Dashboard</Typography>

        <div className="dashboardSummary">
          <div>
            <p>
              Total Amount {totalAmount}<br />
            </p>
          </div>
          <div className="dashboardSummaryBox2">
            <Link to="/admin/products">
              <p>Product</p>
              <p>{productsArray&& productsArray.length}</p>
            </Link>
            <Link to="/admin/orders">
              <p>Orders</p>
              <p>{ordersArray && ordersArray.length}</p>
            </Link>
            <Link to="/admin/users">
              <p>Users</p>
              <p>{usersArray && usersArray.length}</p>
            </Link>
          </div>
        </div>

        <div className="lineChart">
         <Line data={lineState} />
        </div>

        <div className="doughnutChart">
          <Doughnut data={doughnutState} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
