
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';

import { pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";

import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { Routes } from "../routes";

//styling 
const leftAlign = {
  textAlign: 'right'
}

const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

export const PageVisitsTable = (props) => {
  const history = useHistory(); // in function
  const {grantData, search} = props;
  const filtered = grantData.map(grantObj => Object.values(grantObj).some(grant => String(grant).toLowerCase().includes(search.toLowerCase())) ? grantObj : null).filter(nullObj => nullObj != null);

  const TableRow = (props) => {
    const { id, Grant_Name, Grant_Status, no_applications_closed, no_applications_open, no_applications_received, no_of_applications_allocated, 
      no_of_cases_approved, no_of_cases_awaiting_payment, no_of_cases_declined, no_of_cases_exceptions,no_of_cases_paid, payments_made } = props;
    console.log(payments_made,props);
    return (
      <tr>
        <th scope="row">{Grant_Name}</th>
        <td style={leftAlign}>{no_applications_received}</td>
        <td style={leftAlign}>{no_of_applications_allocated}</td>
        <td style={leftAlign}>{no_applications_closed}</td>
        <td style={leftAlign}>{no_applications_open}</td>
        <td style={leftAlign}>{no_of_cases_approved}</td>
        <td style={leftAlign}>{no_of_cases_awaiting_payment}</td>
        <td style={leftAlign}>{no_of_cases_declined}</td>
        <td style={leftAlign}>{no_of_cases_exceptions}</td>
        <td style={leftAlign}>{no_of_cases_paid}</td>
        <td style={leftAlign}>{"£"+payments_made.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
        <td style={leftAlign}>
          <button  onClick={() =>history.push({ pathname: Routes.Settings.path, state: props })}> 
            View 
          </button>
          {/* <Link to={Routes.Settings.path}>View</Link>  */}
          {/* <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={console.log("view")}>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown> */}
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
          {/* <Col className="text-end">
            <Button variant="secondary" size="sm">
              <Link to={Routes.Transactions.path}> See all </Link>
            </Button>
          </Col> */}
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Grant name</th>
            <th style={leftAlign} scope="col">Received</th>
            <th style={leftAlign} scope="col">Allocated</th>
            <th style={leftAlign} scope="col">closed</th>
            <th style={leftAlign} scope="col">Open</th>
            <th style={leftAlign} scope="col">Approved</th>
            <th style={leftAlign} scope="col">Awaiting Payment</th>
            <th style={leftAlign} scope="col">Declined</th>
            <th style={leftAlign} scope="col">Exceptions</th>
            <th style={leftAlign} scope="col">Paid</th>
            <th style={leftAlign} scope="col">Payment Made</th>
            <th style={leftAlign} scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};

export const PageTrafficTable = () => {
  const TableRow = (props) => {
    const { id, source, sourceIcon, sourceIconColor, sourceType, category, rank, trafficShare, change } = props;

    return (
      <tr>
        <td>
          <Card.Link href="#" className="text-primary fw-bold">{id}</Card.Link>
        </td>
        <td className="fw-bold">
          <FontAwesomeIcon icon={sourceIcon} className={`icon icon-xs text-${sourceIconColor} w-30`} />
          {source}
        </td>
        <td>{sourceType}</td>
        <td>{category ? category : "--"}</td>
        <td>{rank ? rank : "--"}</td>
        <td>
          <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="fw-bold">{trafficShare}%</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar variant="primary" className="progress-lg mb-0" now={trafficShare} min={0} max={100} />
            </Col>
          </Row>
        </td>
        <td>
          <ValueChange value={change} suffix="%" />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">#</th>
              <th className="border-0">Traffic Source</th>
              <th className="border-0">Source Type</th>
              <th className="border-0">Category</th>
              <th className="border-0">Global Rank</th>
              <th className="border-0">Traffic Share</th>
              <th className="border-0">Change</th>
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map(pt => <TableRow key={`page-traffic-${pt.id}`} {...pt} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const RankingTable = () => {
  const TableRow = (props) => {
    const { country, countryImage, overallRank, overallRankChange, travelRank, travelRankChange, widgetsRank, widgetsRankChange } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image src={countryImage} className="image-small rounded-circle me-2" />
            <div><span className="h6">{country}</span></div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">
          {overallRank ? overallRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">
          {travelRank ? travelRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">
          {widgetsRank ? widgetsRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Country</th>
              <th className="border-0">All</th>
              <th className="border-0">All Change</th>
              <th className="border-0">Travel & Local</th>
              <th className="border-0">Travel & Local Change</th>
              <th className="border-0">Widgets</th>
              <th className="border-0">Widgets Change</th>
            </tr>
          </thead>
          <tbody>
            {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = (props) => {
  const { search, grantData } = props;
  console.log('in child');
  console.log(grantData);
  const totalTransactions = transactions.length;
  const filtered = grantData.map(grantObj => Object.values(grantObj).some(grant => String(grant).toLowerCase().includes(search.toLowerCase())) ? grantObj : null).filter(nullObj => nullObj != null);
  console.log(filtered.map(grant => console.log(grant.id)));

  const TableRow = (props) => {
    const { id, Grant_Name, Grant_Status, no_applications_closed, no_applications_open, no_applications_received, no_of_applications_allocated, 
      no_of_cases_approved, no_of_cases_awaiting_payment, no_of_cases_declined, no_of_cases_exceptions,no_of_cases_paid, payments_made } = props;
      
    return (
      <tr>
        <td>
          <span className="fw-normal">
            {id}
          </span>
        </td>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {Grant_Name}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {no_applications_received}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {no_of_applications_allocated}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {no_applications_closed}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {no_applications_open}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {no_of_cases_approved}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {no_of_cases_awaiting_payment}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {no_of_cases_declined}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {no_of_cases_exceptions}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {no_of_cases_paid}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {payments_made}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">#</th>
              <th className="border-bottom">Grant name</th>
              <th className="border-bottom">Received</th>
              <th className="border-bottom">Allocated</th>
              <th className="border-bottom">closed</th>
              <th className="border-bottom">Open</th>
              <th className="border-bottom">Approved</th>
              <th className="border-bottom">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              filtered.length > 0 && filtered.map(grant => 
                <TableRow key={`grants-${grant.id}`} {...grant} />)
            }
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};

export const CommandsTable = () => {
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>Name</th>
              <th className="border-0" style={{ width: '5%' }}>Usage</th>
              <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th>
            </tr>
          </thead>
          <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};