import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { DataGrid } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import MetaData from "../layout/MetaData";
import SideBar from "./Sidebar";
import { allOrders,deleteOrder } from "../../actions/admin-actions";

import "./productList.css";

const ProductList = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const navigate = useNavigate();

  const { orders, loading, error } = useSelector((state) => {
    return state.orders;
  });

  useEffect(() => {
    dispatch(allOrders());
  }, [dispatch]);


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.4,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/admin/editorder/${params.getValue(params.id,"id")}`}>
              <EditIcon />
            </Link>

            <Button onClick={()=>{
              
              dispatch(deleteOrder(params.getValue(params.id,"id")))
              alert.success("Successfully deleted!!");
              navigate("/admin/dashboard");
              }}>
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  orders.map((order) => {
    rows.push({
      id: order._id,
      status: order.orderStatus,
      itemsQty: order.orderItems.length,
      amount: order.totalPrice,
    });
  });

  return (
    <Fragment>
      <MetaData title={`ALL ORDERS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL ORDERS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
    </Fragment>
  );
};

export default ProductList;
