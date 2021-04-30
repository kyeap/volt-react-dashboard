import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  InputGroup,
} from "@themesberg/react-bootstrap";

export const GeneralInfoForm = (props) => {
  const { grantObj } = props;

  const percentage_complete = (
    (grantObj["no_applications_closed"] /
      grantObj["no_applications_received"]) *
    100
  ).toFixed(2);
  const percentage_approval = (
    (grantObj["no_of_cases_approved"] /
      grantObj["no_of_applications_allocated"]) *
    100
  ).toFixed(2);
  const percentage_payment = (
    (grantObj["no_of_cases_paid"] / grantObj["no_of_cases_approved"]) *
    100
  ).toFixed(2);

  const commaSeperator = (numb) => numb?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">General information</h5>
        <Row>
          <Col md={6} className="mb-3">
            <div>Grant Name: {grantObj["Grant_Name"]} </div>
            <div>Grant Status: {grantObj["Grant_Status"]} </div>
            <div>
              Total payment made: £
              {commaSeperator(grantObj["payments_made"])}{" "}
            </div>
            <div>
              No of exceptions:{" "}
              {commaSeperator(grantObj["no_of_cases_exceptions"])}{" "}
            </div>
          </Col>
        </Row>
        <h5 className="mb-4">Progress information</h5>
        <Row>
          <Col md={6} className="mb-3">
            <div style={{ color: percentage_complete >= 50 ? "green" : "red" }}>
              Completed: {percentage_complete}%
            </div>
            <div>
              No applications received:{" "}
              {commaSeperator(grantObj["no_applications_received"])}{" "}
            </div>
            <div>
              No of application closed:{" "}
              {commaSeperator(grantObj["no_applications_closed"])}{" "}
            </div>
            <div>
              No applications open:{" "}
              {commaSeperator(grantObj["no_applications_open"])}{" "}
            </div>
          </Col>
        </Row>
        <h5 className="mb-4">Approval information</h5>
        <Row>
          <Col md={6} className="mb-3">
            <div style={{ color: percentage_complete >= 50 ? "green" : "red" }}>
              Rate of Approval: {percentage_approval}%
            </div>
            <div>
              No of applications allocated:{" "}
              {commaSeperator(grantObj["no_of_applications_allocated"])}{" "}
            </div>
            <div>
              No of cases approved:{" "}
              {commaSeperator(grantObj["no_of_cases_approved"])}{" "}
            </div>
            <div>
              No of cases declined:{" "}
              {commaSeperator(grantObj["no_of_cases_approved"])}{" "}
            </div>
          </Col>
        </Row>
        <h5 className="mb-4">Payment information</h5>
        <Row>
          <Col md={6} className="mb-3">
            <div style={{ color: percentage_complete >= 50 ? "green" : "red" }}>
              Payment completion: {percentage_payment}%
            </div>
            <div>
              No of cases awaiting payment:{" "}
              {commaSeperator(grantObj["no_of_applications_allocated"])}{" "}
            </div>
            <div>
              Total payment made: £
              {commaSeperator(grantObj["payments_made"])}{" "}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
