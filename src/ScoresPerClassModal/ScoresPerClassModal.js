import React from "react";
import './ScoresPerClassModal.css'
import Button from "react-bootstrap/es/Button";
import {Modal} from "react-bootstrap";
import Chart from "react-google-charts";
import axios from "axios";
import Redirect from "react-router/es/Redirect";

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
            overallCourseData: overallClassData,
            courseData: thisClassData
        };
    }
    
    getInfo() {
        var request1 = new XMLHttpRequest(),
            method = "GET",
            url = api_endpoint + '/teacher_evals?name=' + this.props.instructor.replace(/\s/g,',');

        let setCourseData = (output) => {
            this.setState({ courseData: output });
        };

        request1.open(method, url, true);
        request1.onreadystatechange = function () {
            if(request1.readyState === 4 && request1.status === 200) {
                var myArr = JSON.parse(this.responseText);
                if(myArr[0] != undefined) {
                    var output = [
                        ["Semester", "Score"],
                        [myArr[0].Term, myArr[0].Rating],
                        [myArr[1].Term, myArr[1].Rating],
                        [myArr[2].Term, myArr[2].Rating],
                        [myArr[3].Term, myArr[3].Rating],
                    ];
                    setCourseData(output);
                }
            }
        };
        request1.send();


        var request2 = new XMLHttpRequest(),
            method = "GET",
            url = api_endpoint + '/teacher_evals?name=' + this.props.instructor.replace(/\s/g,',') + '&course=' + this.props.course;

        let setOverallData = (output) => {
            this.setState({ overallClassData: output });
        };

        request2.open(method, url, true);
        request2.onreadystatechange = function () {
            if(request2.readyState === 4 && request2.status === 200) {
                var myArr = JSON.parse(this.responseText);
                if(myArr[0] != undefined) {
                    var output = [
                        ["Semester", "Score"],
                        [myArr[0].Term, myArr[0].Rating],
                        [myArr[1].Term, myArr[1].Rating],
                        [myArr[2].Term, myArr[2].Rating],
                        [myArr[3].Term, myArr[3].Rating],
                    ];
                    setOverallData(output);
                }
            }
        };
        request2.send();


    }

    componentWillReceiveProps(props) {
      const { show, onHide, course, refresh } = this.props;
      if (props.refresh !== refresh) {
        this.getInfo()
      }
    }

    render() {
        if(this.props.show) {
            return <Redirect to={"/dash/" + this.props.instructor.replace(/\s/g,',')}/>
        }

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