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
    legend: "none"
};

const formatInstructorData = (response_data) => {
    var output = [];
    for (var i=0; i<response_data.length; i++) {
        var row = new Array(["Instructor", "Score"]);
        for (var j=0; j<response_data[i].length; j++) {
            row.push(new Array(response_data[i][j].Name, response_data[i][j].Rating));
        }
        output.push(row)
    }

    return output;
};

export class InstructorsForCourseModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            instructor_data: data,
        };
    }

    componentDidMount() {
        //After setting default values, hit teacher evals endpoint to fill graph data
        //Happens in ComponentDidMount() because it is  an asychronous call
        axios.get(api_endpoint + '/course_evals?course=' + this.props.course.replace(/\s/g,','))
            .then(function (response) {
                this.setState((state) => ({
                    instructor_data: formatInstructorData(response.data),
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
                            <ListGroupItem bsStyle="info"><Link to ={"/dash/" + this.state.instructor_data[1][0]}>1. {this.state.instructor_data[1][0]}</Link></ListGroupItem>
                            <ListGroupItem bsStyle="info"><Link to ={"/dash/" + this.state.instructor_data[2][0]}>2. {this.state.instructor_data[2][0]}</Link></ListGroupItem>
                            <ListGroupItem bsStyle="info"><Link to ={"/dash/" + this.state.instructor_data[3][0]}>3. {this.state.instructor_data[3][0]}</Link></ListGroupItem>
                            <ListGroupItem bsStyle="info"><Link to ={"/dash/" + this.state.instructor_data[4][0]}>4. {this.state.instructor_data[4][0]}</Link></ListGroupItem>
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