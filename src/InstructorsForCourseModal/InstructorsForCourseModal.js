import React from "react";
import './InstructorsForCourse.css'
import Button from "react-bootstrap/es/Button";
import {ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import Chart from "react-google-charts";
import {Link} from "react-router-dom";

const data = [
    ["Instructor", "Score"],
    ["John Liu", 1.5],
    ["Joshua Fox", 3.8],
    ["Dave Small", 4.5],
    ["Rong Zhang", 3.1]
];

const options = {
    title: "Overall Course Evals",
    hAxis: {title: "Professor", viewWindow: {min: 0, max: 4}},
    vAxis: {title: "Score", viewWindow: {min: 0, max: 5}},
    legend: "none"
};

export class InstructorsForCourseModal extends React.Component {

    render() {
        return (
            <Modal
                {...this.props}
                animation={false}
                aria-labelledby="contained-modal-title-sm"
                dialogClassName="course-modal"
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-sm">{this.props.course}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="first-column">
                        <Chart
                            chartType="ColumnChart"
                            width="100%"
                            height="100%"
                            data={data}
                            options={options}
                        />
                    </div>
                    <div class="second-column">
                        <h5>Top Instructors for this Course</h5>
                        <ListGroup>
                            <ListGroupItem bsStyle="info"><Link to ="/dash/Dave Small">1. Dave Small</Link></ListGroupItem>
                            <ListGroupItem bsStyle="info"><Link to ="/dash/Rong Zhang">2. Rong Zhang</Link></ListGroupItem>
                            <ListGroupItem bsStyle="info"><Link to ="/dash/Joshua Fox">3. Joshua Fox</Link></ListGroupItem>
                            <ListGroupItem bsStyle="info"><Link to ="/dash/John Liu">4. John Liu</Link></ListGroupItem>
                        </ListGroup>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}