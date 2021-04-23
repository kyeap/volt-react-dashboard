import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faEllipsisH,
  faEye,
  faSort,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Card,
  Button,
  Table,
  Dropdown,
  ButtonGroup,
} from "@themesberg/react-bootstrap";

import { useHistory } from "react-router-dom";

import { sort } from "fast-sort";

//styling
const leftAlign = {
  textAlign: "right",
};

const margin = {
  margin: "0 5px",
};

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return value ? (
    <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}
        {suffix}
      </span>
    </span>
  ) : (
    "--"
  );
};

export const OverviewTable = (props) => {
  const history = useHistory(); // in function
  const { grantData, search, modelToggle } = props;
  const filtered = grantData
    ?.map((grantObj) =>
      Object.values(grantObj).some((grant) =>
        String(grant).toLowerCase().includes(search.toLowerCase())
      )
        ? grantObj
        : null
    )
    .filter((nullObj) => nullObj != null);
  const [sortValue, setSortValue] = useState("");
  const [asc, setAsc] = useState(true);
  const sorted = asc
    ? sort(filtered).asc((grantdetail) => grantdetail[sortValue])
    : sort(filtered).desc((grantdetail) => grantdetail[sortValue]);

  const TableRow = (props) => {
    const {
      id,
      Grant_Name,
      Grant_Status,
      no_applications_closed,
      no_applications_open,
      no_applications_received,
      no_of_applications_allocated,
      no_of_cases_approved,
      no_of_cases_awaiting_payment,
      no_of_cases_declined,
      no_of_cases_exceptions,
      no_of_cases_paid,
      payments_made,
      deactivated,
    } = props;
    return (
      <tr>
        <th scope="row">{Grant_Name}</th>
        <td style={leftAlign}>
          {no_applications_received == null
            ? 0
            : no_applications_received
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td style={leftAlign}>
          {no_applications_closed == null
            ? 0
            : no_applications_closed
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td style={leftAlign}>
          {no_applications_open == null
            ? 0
            : no_applications_open
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td style={leftAlign}>
          {no_of_applications_allocated == null
            ? 0
            : no_of_applications_allocated
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td style={leftAlign}>
          {no_of_cases_approved == null
            ? 0
            : no_of_cases_approved
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td style={leftAlign}>
          {no_of_cases_declined == null
            ? 0
            : no_of_cases_declined
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td style={leftAlign}>
          {no_of_cases_awaiting_payment == null
            ? 0
            : no_of_cases_awaiting_payment
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td style={leftAlign}>
          {no_of_cases_exceptions == null
            ? 0
            : no_of_cases_exceptions
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td style={leftAlign}>
          {deactivated == null
            ? 0
            : deactivated?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td style={leftAlign}>
          {no_of_cases_paid == null
            ? 0
            : no_of_cases_paid
                ?.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </td>
        <td style={leftAlign}>
          {"£" +
            (payments_made == null
              ? 0
              : payments_made
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ","))}
        </td>
        <td style={leftAlign}>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle
              as={Button}
              split
              variant="link"
              className="text-dark m-0 p-0"
            >
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() =>
                  history.push({
                    pathname: `/settings/${Grant_Name}`,
                    state: props,
                  })
                }
              >
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Grant
                Details
              </Dropdown.Item>
              <Dropdown.Item onClick={() => modelToggle()}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Rejection
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  console.log("clicked");
                }}
              >
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Others..
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Grants</h5>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">
              Grant name
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  // console.log('clicked');
                  setAsc((x) => !x);
                  setSortValue("Grant_Name");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              Received
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  // console.log('clicked');
                  setAsc((x) => !x);
                  setSortValue("no_applications_received");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              closed
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  // console.log('clicked');
                  setAsc((x) => !x);
                  setSortValue("no_applications_closed");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              Open
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  setAsc((x) => !x);
                  setSortValue("no_applications_open");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              <FontAwesomeIcon
                style={margin}
                icon={faInfoCircle}
                onClick={() => {}}
              />
              Allocated
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  setAsc((x) => !x);
                  setSortValue("no_of_applications_allocated");
                }}
              />
            </th>

            <th style={leftAlign} scope="col">
              <FontAwesomeIcon
                style={margin}
                icon={faInfoCircle}
                onClick={() => {}}
              />
              Approved
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  setAsc((x) => !x);
                  setSortValue("no_of_cases_approved");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              Decline
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  setAsc((x) => !x);
                  setSortValue("no_of_cases_approved");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              Awaiting Payment
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  setAsc((x) => !x);
                  setSortValue("no_of_cases_awaiting_payment");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              Exceptions
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  // console.log('clicked');
                  setAsc((x) => !x);
                  setSortValue("no_of_cases_exceptions");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              Deactivated
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  // console.log('clicked');
                  setAsc((x) => !x);
                  setSortValue("no_of_cases_exceptions");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              Paid
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  // console.log('clicked');
                  setAsc((x) => !x);
                  setSortValue("no_of_cases_paid");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              Payment Made
              <FontAwesomeIcon
                style={margin}
                icon={faSort}
                onClick={() => {
                  // console.log('clicked');
                  setAsc((x) => !x);
                  setSortValue("payments_made");
                }}
              />
            </th>
            <th style={leftAlign} scope="col">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted?.map((pv) => (
            <TableRow key={`page-visit-${pv.id}`} {...pv} />
          ))}
        </tbody>
      </Table>
    </Card>
  );
};
