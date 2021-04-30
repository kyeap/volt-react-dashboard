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
import { Col, Row, Button } from "@themesberg/react-bootstrap";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { GeneralInfoForm } from "../components/Forms";

import { useHistory, useParams } from "react-router-dom";

import { useFetchAll } from "../data/grants";
import { useQuery } from "react-query";

export default () => {
  const history = useHistory();

  const { id, startDate, endDate } = useParams();
  console.log(startDate, endDate);
  const { isLoading, error, grantObj } = useFetchAll(startDate, endDate, id);

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
