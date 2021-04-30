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
import {Col,Row,Card,Button,Table,Dropdown,ButtonGroup,Container} from "@themesberg/react-bootstrap";

import { useHistory } from "react-router-dom";

import { sort } from "fast-sort";
import { Popover } from "react-tiny-popover";

//styling
const leftAlign = {
  textAlign: "right",
};

const margin = {
  margin: "0 5px",
};

const popUp = {
  background: "white",
  border: "1px solid",
  borderRadius: "10px",
  margin: "12px",
  padding: "0 10px",
};

const hoverStyle = (hover) => {
  if (hover) {
    return ({
      cursor:"pointer",
    })
  }
}

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

// add comma to every thousand 
const commaSeperator = (numb) => numb?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export const OverviewTable = (props) => {
  const history = useHistory(); // in function
  const { grantData, search, modelToggle, startDate, endDate } = props;
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
  const [isAllocatedPopoverOpen, setIsAllocatedPopoverOpen] = useState(false);
  const [isApprovedPopoverOpen, setIsApprovedPopoverOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const sorted = asc
    ? sort(filtered).asc((grantdetail) => grantdetail[sortValue])
    : sort(filtered).desc((grantdetail) => grantdetail[sortValue]);

  const TableRow = (props) => {
    const {id,Grant_Name,Grant_Status,no_applications_closed,no_applications_open,no_applications_received,
      no_of_applications_allocated,no_of_cases_approved,no_of_cases_awaiting_payment,no_of_cases_declined,
      no_of_cases_exceptions,no_of_cases_paid,payments_made,deactivated} = props;

    const propArr = [no_applications_received,no_applications_closed,no_applications_open,no_of_applications_allocated,
      no_of_cases_approved,no_of_cases_declined,no_of_cases_awaiting_payment,no_of_cases_exceptions,deactivated,no_of_cases_paid];
    return (
      <tr style={no_of_cases_awaiting_payment == no_of_cases_exceptions? {color:"grey"}: {color: "black"}}>
        <th 
          scope="row" 
          style= {hoverStyle(hover)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave = {() => setHover(false)}
          onClick={() =>
                  history.push({
                    pathname: `/Details/${Grant_Name}/${startDate}/${endDate}`,
                    state: props,
                  })
        }>
            {Grant_Name}
        </th>
        {propArr.map((ele) => {
          return (
            <td style={leftAlign}>
              {ele == null
                ? 0
                : commaSeperator(ele)}
            </td>
          )
        })}
        <td style={leftAlign}>
          {"£" +
            (payments_made == null
              ? 0
              : commaSeperator(payments_made.toFixed(2)))}
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
                    pathname: `/Details/${Grant_Name}/${startDate}/${endDate}`,
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
              <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Row className="flex-nowrap">
                  <Col>
                    <Popover
                      isOpen={isAllocatedPopoverOpen}
                      positions={["top", "bottom", "left", "right"]} // preferred positions by priority
                      content={<div style={popUp}> approve + decline.</div>}
                    >
                      <div
                        onClick={() =>
                          setIsAllocatedPopoverOpen(!isAllocatedPopoverOpen)
                        }
                      >
                        <FontAwesomeIcon style={margin} icon={faInfoCircle} />
                      </div>
                    </Popover>
                  </Col>
                  <Col>Allocated</Col>
                  <Col>
                    <FontAwesomeIcon
                      style={margin}
                      icon={faSort}
                      onClick={() => {
                        setAsc((x) => !x);
                        setSortValue("no_of_applications_allocated");
                      }}
                    />
                  </Col>
                </Row>
              </Container>
            </th>
            <th style={leftAlign} scope="col">
              <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
                <Row className="flex-nowrap">
                  <Col>
                    <Popover
                      isOpen={isApprovedPopoverOpen}
                      positions={["top", "bottom", "left", "right"]} // preferred positions by priority
                      content={
                        <div style={popUp}>
                          {" "}
                          paid + awaiting payment + deactivated
                        </div>
                      }
                    >
                      <div
                        onClick={() =>
                          setIsApprovedPopoverOpen(!isApprovedPopoverOpen)
                        }
                      >
                        <FontAwesomeIcon style={margin} icon={faInfoCircle} />
                      </div>
                    </Popover>
                  </Col>
                  <Col>Approved</Col>
                  <Col>
                    <FontAwesomeIcon
                      style={margin}
                      icon={faSort}
                      onClick={() => {
                        setAsc((x) => !x);
                        setSortValue("no_of_cases_approved");
                      }}
                    />
                  </Col>
                </Row>
              </Container>
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
