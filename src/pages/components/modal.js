import React, {useState} from 'react';
import { Modal, Button, Table  } from '@themesberg/react-bootstrap';


export default (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Reasons of rejection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table responsive className="align-items-center table-flush">
            <thead className="thead-light">
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Reason</th>
            </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="col">1</th>
                    <th scope="col">Application not complete</th>
                </tr>
                <tr>
                    <th scope="col">1</th>
                    <th scope="col">Some other reasons... </th>
                </tr>
            </tbody>
            <tbody>
            {/* {filtered.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)} */}
            </tbody>
        </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }