import React from "react";
import './ScoresPerClassModal.css'
import Button from "react-bootstrap/es/Button";
import {Modal} from "react-bootstrap";
import Chart from "react-google-charts";

const thisClassData = [
  ["Semester", "Score"],
  ["F17", 4.6],
  ["S18", 2.2],
  ["SU18", 4.1],
  ["F18", 5.0]
];

const overallClassData = [
    ["Semester", "Score"],
    ["F17", 3.4],
    ["S18", 4.3],
    ["SU18", 3.1],
    ["F18", 4.5]
];

const thisClassOptions = {
    title: "Scores for this class",
    hAxis: {title: "Semester", viewWindow: {min: 0, max: 4}},
    vAxis: {title: "Score", viewWindow: {min: 0, max: 5}},
    legend: "none"
};

const overallClassOptions = {
    title: "Overall scores in all classes",
    hAxis: {title: "Semester", viewWindow: {min: 0, max: 4}},
    vAxis: {title: "Score", viewWindow: {min: 0, max: 5}},
    legend: "none"
};

export class ScoresPerClassModal extends React.Component {
    render() {
        return (
            <Modal
                {...this.props}
                animation={false}
                aria-labelledby="contained-modal-title-sm"
                dialogClassName="class-modal"
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-sm">Joshua Fox</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div class="first-column">
                        <Chart
                            chartType="ColumnChart"
                            width="100%"
                            height="100%"
                            data={thisClassData}
                            options={thisClassOptions}
                        />
                    </div>
                    <div className="first-column">
                        <Chart
                            chartType="ColumnChart"
                            width="100%"
                            height="100%"
                            data={overallClassData}
                            options={overallClassOptions}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}