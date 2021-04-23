import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCartArrowDown,
  faChartPie,
  faChevronDown,
  faClipboard,
  faCommentDots,
  faFileAlt,
  faPlus,
  faRocket,
  faStore,
} from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Button, Dropdown } from "@themesberg/react-bootstrap";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { GeneralInfoForm } from "../components/Forms";

import { useHistory, useParams } from "react-router-dom";

import { useFetchAll } from "../data/grants";
import { useQuery } from "react-query";

import Profile3 from "../assets/img/team/profile-picture-3.jpg";

export default () => {
  const history = useHistory();
  // const [Obj, setgrantObj] = useState({});
  const [startDate, setStartDate] = useState(new Date(2020, 0, 1)); //always start 1 Jan 2020
  const [endDate, setEndDate] = useState(new Date());
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

  const { id } = useParams();
  const { isLoading, error, grantObj } = useFetchAll(
    startDateStr,
    endDateStr,
    id
  );

  return (
    <>
      <Button className="animate-hover" onClick={() => history.goBack()}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          className="animate-left-3 me-3 ms-2"
        />
        Back
      </Button>
      {isLoading ? (
        <div> Loading</div>
      ) : (
        <Row>
          <Col xs={12} xl={12}>
            <GeneralInfoForm grantObj={grantObj} />
          </Col>
        </Row>
      )}
    </>
  );
};
