import React from "react";
import './InstructorsForCourse.css'
import Button from "react-bootstrap/es/Button";
import {ListGroup, ListGroupItem, Modal} from "react-bootstrap";
import Chart from "react-google-charts";
import {Link} from "react-router-dom";
import axios from "axios";

const api_endpoint = "http://localhost:8080/api";

const data = [
    ["Instructor", "Score"],
    ["Dave Small", 4.5],
    ["Joshua Fox", 3.8],
    ["Rong Zhang", 3.1],
    ["John Liu", 1.5]
];

const options = {
    title: "Overall Course Evals",
    hAxis: {title: "Professor", viewWindow: {min: 0, max: 4}},
    vAxis: {title: "Score", viewWindow: {min: 0, max: 5}},
    legend: "none",
    animation: {
                duration: 500,
                easing: 'out',
                startup: true,
              }
};

export class InstructorsForCourseModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            instructor_data: data,
            request: true
        };
    }

    getInfo() {
        var xhr = new XMLHttpRequest(),
            method = "GET",
            url = api_endpoint + '/course_evals?course=' + this.props.course.replace(/\s/g,',');

        let setInstructor = (output) => {
            this.setState({ instructor_data: output });
        };

        xhr.open(method, url, true);
        xhr.onreadystatechange = function () {
            if(xhr.readyState === 4 && xhr.status === 200) {
                var myArr = JSON.parse(this.responseText);
                if(myArr[0] != undefined) {
                    var output = [
                        ["Instructor", "Score"],
                        [myArr[0].Name, myArr[0].Rating],
                        [myArr[1].Name, myArr[1].Rating],
                        [myArr[2].Name, myArr[2].Rating],
                        [myArr[3].Name, myArr[3].Rating],
                    ];
                    setInstructor(output);
                }
            }
        };
        xhr.send();
    }

    componentWillReceiveProps(props) {
      const { show, onHide, course, refresh } = this.props;
      if (props.refresh !== refresh) {
        this.getInfo()
      }
    }

    render() {
        // if (this.props.show && this.state.request) {
        //     this.getInfo();   
        //     this.state.request = false;     
        // }
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
                            data={this.state.instructor_data}
                            options={options}
                        />
                    </div>
                    <div class="second-column">
                        <h5>Top Instructors for this Course</h5>
                        <ListGroup>
                            <ListGroupItem bsStyle="info"><Link
                                to={"/dash/" + this.state.instructor_data[1][0]}>1. {this.state.instructor_data[1][0]}</Link></ListGroupItem>
                            <ListGroupItem bsStyle="info"><Link
                                to={"/dash/" + this.state.instructor_data[2][0]}>2. {this.state.instructor_data[2][0]}</Link></ListGroupItem>
                            <ListGroupItem bsStyle="info"><Link
                                to={"/dash/" + this.state.instructor_data[3][0]}>3. {this.state.instructor_data[3][0]}</Link></ListGroupItem>
                            <ListGroupItem bsStyle="info"><Link
                                to={"/dash/" + this.state.instructor_data[4][0]}>3. {this.state.instructor_data[4][0]}</Link></ListGroupItem>
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