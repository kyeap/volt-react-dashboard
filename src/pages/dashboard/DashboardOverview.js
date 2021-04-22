import React, { useState, useEffect } from "react";
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
  CircleChartWidget,
  BarChartWidget,
  TeamMembersWidget,
  ProgressTrackWidget,
  RankingWidget,
  SalesValueWidget,
  SalesValueWidgetPhone,
  AcquisitionWidget,
} from "../../components/Widgets";
import { OverviewTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";

// import { grants, grant } from "../../data/tables";

import "react-datepicker/dist/react-datepicker.css";

export default () => {
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(true);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalClose, setTotalClose] = useState(0);
  const [totalOpen, setTotalOpen] = useState(0);
  const [casesPaid, setCasesPaid] = useState(0);
  const [casesPendingPayment, setCasesPendingPayment] = useState(0);
  // const [date, setDate] = useState('');
  const [startDate, setStartDate] = useState(new Date(2020, 0, 1)); //always start 1 Jan 2021
  const [birthday, setBirthday] = useState("");
  let initialDate = new Date();
  initialDate.setDate(initialDate.getDate() + 1);
  const [endDate, setEndDate] = useState(initialDate);
  const [grantData, setGrantData] = useState([]);
  const [search, setSearch] = useState("");
  const getTotalPayment = (id) => {
    setTotalPayment(id);
  };
  const [modalShow, setModalShow] = React.useState(false);

  const modelToggle = () => {
    setModalShow(!modalShow);
  };

  useEffect(() => {
    setLoading(() => true);
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
    fetch(
      `http://127.0.0.1:5000/?from_date=${startDateStr}&to_date=${endDateStr}`
    )
      .then((res) => res.json())
      .then((res) => {
        setConnected(true);
        setGrantData(res.data);
        let paymentSUM = 0;
        let openSum = 0;
        let closeSum = 0;
        let paidCaseSum = 0;
        let PendingPayment = 0;

        for (let i = 0; i < res.data.length; i++) {
          paymentSUM = paymentSUM + res.data[i].payments_made;
          openSum = openSum + res.data[i].no_applications_closed;
          closeSum = closeSum + res.data[i].no_applications_open;
          paidCaseSum = paidCaseSum + res.data[i].no_of_cases_paid;
          PendingPayment =
            PendingPayment + res.data[i].no_of_cases_awaiting_payment;
        }
        setTotalPayment(
          paymentSUM
            .toFixed(2)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        setTotalClose(openSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        setTotalOpen(closeSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
        setCasesPaid(
          paidCaseSum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );
        setCasesPendingPayment(
          PendingPayment.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        );

        // setTotalPayment(res.data.reduce((totalpayment,grant) => {
        //   console.log(grant.payments_made);
        //   return (totalpayment+grant.payments_made);
        // },0));
      })
      .catch((error) => setConnected(false))
      .finally(() => setLoading(false));
  }, [startDate, endDate]);

  if (!connected) {
    return (
      <>
        <div>We are having trouble connecting to the API.</div>
      </>
    );
  }
  return (
    <>
      <Modal show={modalShow} onHide={() => setModalShow(false)} />
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          <Dropdown.Toggle
            as={Button}
            variant="primary"
            size="sm"
            className="me-2"
          >
            <FontAwesomeIcon icon={faTasks} className="me-2" />
            Grants
          </Dropdown.Toggle>
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            {grantData.map((grant) => {
              return (
                <Dropdown.Item
                  key={grant.id}
                  className="fw-bold"
                  onClick={() => getTotalPayment(grant.id)}
                >
                  {grant.Grant_Name}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        {/* <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup> */}
      </div>

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
            title={grantData.length}
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

        {/* <Col xs={12} sm={6} xl={4} className="mb-4">
          <CircleChartWidget
            title="Types of buisnesses applied"
            data={trafficShares} />
        </Col> */}
      </Row>
      <Row>
        <Col xs={8} md={6} lg={3} xl={4}>
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
        <Col xs={12} sm={1} xl={2} className="mb-4">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Col>
        <Col xs={12} sm={1} xl={2} className="mb-4">
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Col>
      </Row>
      {/* <Row>
        <Col md={6} className="mb-3">
          <Form.Group id="birthday">
            <Form.Label>Birthday</Form.Label>
            <Datetime
              timeFormat={false}
              onChange={setBirthday}
              renderInput={(props, openCalendar) => (
                <InputGroup>
                  <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                  <Form.Control
                    required
                    type="text"
                    value={birthday ? birthday : ""}
                    placeholder="mm/dd/yyyy"
                    onFocus={openCalendar}
                    onChange={() => { }} />
                </InputGroup>
              )} />
          </Form.Group>
        </Col>
      </Row> */}
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={12} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <OverviewTable
                      modelToggle={modelToggle}
                      search={search}
                      grantData={grantData}
                    />
                  )}
                </Col>

                {/* <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col> */}
              </Row>
            </Col>

            {/* <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </>
  );
};
