import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faChartLine,
  faTasks,
  faSearch,
  faCalendarAlt,
  faListOl,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Button,
  Dropdown,
  ButtonGrou,
  InputGroup,
  Form,
} from "@themesberg/react-bootstrap";
import DatePicker from "react-datepicker";

import Modal from "../components/modal.js";

import {
  CounterWidget,
  BarChartWidget,
  ProgressTrackWidget,
} from "../../components/Widgets";
import { OverviewTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";

// import { grants, grant } from "../../data/tables";

import "react-datepicker/dist/react-datepicker.css";
import "../../css/styles.css";

import { useFetchAll } from "../../data/grants";

export default () => {
  const [startDate, setStartDate] = useState(new Date(2020, 0, 1)); //always start 1 Jan 2021
  let initialDate = new Date();
  initialDate.setDate(initialDate.getDate() + 1);
  const [endDate, setEndDate] = useState(initialDate);
  const [search, setSearch] = useState("");
  const [modalShow, setModalShow] = React.useState(false);
  const startDateStr =
    startDate.getDate() +
    "-" +
    String(Number(startDate.getMonth()) + 1) +
    "-" +
    startDate.getFullYear();
  const endDateStr =
    endDate.getDate() +
    "-" +
    String(Number(endDate.getMonth()) + 1) +
    "-" +
    endDate.getFullYear();

  const modelToggle = () => {
    setModalShow(!modalShow);
  };

  const { isLoading, error, grantAllArr } = useFetchAll(
    startDateStr,
    endDateStr
  );
  console.log(grantAllArr);
  let paymentSUM = 0;
  let openSum = 0;
  let closeSum = 0;
  let paidCaseSum = 0;
  let PendingPayment = 0;

  for (let i = 0; i < grantAllArr?.length; i++) {
    paymentSUM = paymentSUM + grantAllArr[i].payments_made;
    openSum = openSum + grantAllArr[i].no_applications_closed;
    closeSum = closeSum + grantAllArr[i].no_applications_open;
    paidCaseSum = paidCaseSum + grantAllArr[i].no_of_cases_paid;
    PendingPayment =
      PendingPayment + grantAllArr[i].no_of_cases_awaiting_payment;
  }
  const totalPayment = paymentSUM
    .toFixed(2)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const totalClose = openSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const totalOpen = closeSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const casesPaid = paidCaseSum
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const casesPendingPayment = PendingPayment.toString().replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ","
  );

  if (error) {
    return (
      <>
        <div>We are having trouble connecting to the API.</div>
      </>
    );
  }
  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)} />

      <Row className="justify-content-md-center">
        {/* graph */}
        {/* <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Totsl Payments Made"
            value="2875826"
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Totsl Payments Made"
            value="2875826"
            percentage={10.57}
          />
        </Col> */}
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Number of grants"
            title={grantAllArr?.length}
            period="Feb 1 2020- Apr 1 2022"
            percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Grant Closed"
            title={totalClose}
            period="Feb 1 2022- Apr 1 2022"
            percentage={28.4}
            icon={faClipboardCheck}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Grants Open"
            title={totalOpen}
            period="Feb 1 2022- Apr 1 2022"
            percentage={28.4}
            icon={faListOl}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Cases Paid"
            title={casesPaid}
            period="Feb 1 2022- Apr 1 2022"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="No. of Payments Pending"
            title={casesPendingPayment}
            period="Feb 1 2022- Apr 1 2022"
            percentage={28.4}
            icon={faListOl}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Total Payments Made"
            title={"£" + totalPayment}
            period="Feb 1 2022- Apr 1 2022"
            percentage={28.4}
            icon={faCashRegister}
            iconColor="shape-tertiary"
          />
        </Col>
      </Row>
      <Row>
        <Col xs={8} md={6} lg={3} xl={2}>
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col xs={12} sm={2} md={6} lg={6} xl={2} className="mb-4">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Col>
        <Col xs={12} sm={2} md={1} lg={1} xl={2} className="mb-4">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={12} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : (
                    <OverviewTable
                      modelToggle={modelToggle}
                      search={search}
                      grantData={grantAllArr}
                      startDate={startDateStr}
                      endDate={endDateStr}
                    />
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
