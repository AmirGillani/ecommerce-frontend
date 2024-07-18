import React, { Fragment, useEffect } from "react";

// ADDITIONAL PACKAGE FOR GRID TABLES
import { DataGrid } from "@material-ui/data-grid";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import LaunchIcon from "@material-ui/icons/Launch";
import Typography from "@material-ui/core/Typography";

import Loader from "../loader/Loader";
import MetaData from "../layout/MetaData";

import { myOrders } from "../../actions/order-actions";

import "./myOrders.css";

const MyOrders = () => {

  const dispatch = useDispatch();

  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  
  const { currentUser } = useSelector((state) => state.users);

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {

        // FETCH STATUS COLUMN VALUE AND GIVE IT CLASS

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
      flex: 0.3,
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

          // FETCH ID COLUMN VALUE AND GIVE IT TO LINK

          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];
  const rows = [];

  orders && orders.map((item) => {

      // PUT VALUES IN COLUMS USING THEIR FIELD NAME
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

    useEffect(() => {

      if (error) {
        alert.error(error);
        }
      dispatch(myOrders());
    }, [dispatch, alert, error]);

  return (
    <Fragment>
      <MetaData title={`${currentUser.name} - Orders`} />

      {loading ? (
        <Loader />
      ) : (
        <div className="myOrdersPage">
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="myOrdersTable"
            autoHeight
          />

          <Typography id="myOrdersHeading">{currentUser.name}'s Orders</Typography>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
