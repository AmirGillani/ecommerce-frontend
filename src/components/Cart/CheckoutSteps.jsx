import React, { Fragment } from "react";
import { Typography, Stepper, StepLabel, Step } from "@material-ui/core";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import LibraryAddCheckIcon from "@material-ui/icons/LibraryAddCheck";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import "./CheckoutSteps.css";
function CheckoutSteps({ activeStep }) {
  const stepStyles = {
    boxSizing: "border-box",
  };

  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  return (
    <Fragment>
      <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>

        {steps.map((item, index) => (

          <Step

            // ACTIVE ITEM WILL BE ACTIVE REST WILL NOT BE ACTIVE

            active={activeStep === index ? true : false}

            // ACTIVE ITEM OR PREVIOUSLY ACTIVE ITOMS WILL BE TRUE OTHER WILL BE FALSE

            completed={activeStep >= index ? true : false}
          >
            <StepLabel

              // ACTIVE ITEM WILL BE TOMATO OTHER WILL BE DULL

              style={{
                color: activeStep >= index ? "tomato" : "rgba(0, 0, 0, 0.649)",
              }}

              // SHOW ICON OF ITEM
              
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Fragment>
  );
}

export default CheckoutSteps;
