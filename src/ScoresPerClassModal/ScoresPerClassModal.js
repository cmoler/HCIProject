import React from "react";
import './ScoresPerClassModal.css'
import Button from "react-bootstrap/es/Button";
import {Modal} from "react-bootstrap";
import Chart from "react-google-charts";
import axios from "axios";

const api_endpoint = "http://localhost:8080/api";

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

const formatOverallCourseData = (response_data) => {
    var output = [];
    for (var i=1; i<2; i++) {
        var row = new Array(["Semester", "Score"]);
        for (var j=0; j<response_data[i].length; j++) {
            row.push(new Array(response_data[i][j].Term, response_data[i][j].Rating));
        }
        output.push(row)
    }

    return output;
};

const formatCourseData = (response_data) => {
    var output = [];
    for (var i=2; i<3; i++) {
        var row = new Array(["Semester", "Score"]);
        for (var j=0; j<response_data[i].length; j++) {
            row.push(new Array(response_data[i][j].Term, response_data[i][j].Rating));
        }
        output.push(row)
    }

    return output;
};

export class ScoresPerClassModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            coverallCourseData: overallClassData,
            courseData: thisClassData
        };
    }

    componentDidMount() {
        //After setting default values, hit teacher evals endpoint to fill graph data
        //Happens in ComponentDidMount() because it is  an asychronous call
        axios.get(api_endpoint + '/teacher_evals?name=' + this.props.instructor.replace(/\s/g,','))
            .then(function (response) {
                this.setState((state) => ({
                    coverallCourseData: formatOverallCourseData(response.data.OverallEvals),
                    courseData: formatCourseData(response.data.OverallEvals),

                }))


            }.bind(this))
            .catch(function (error) {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                }
            });

    }

    render() {
        return (
            <Modal
                {...this.props}
                animation={false}
                aria-labelledby="contained-modal-title-sm"
                dialogClassName="class-modal"
            >
                <Modal.Header>
                    <Modal.Title id="contained-modal-title-sm">{this.props.instructor}</Modal.Title>
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