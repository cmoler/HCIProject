import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./DashboardPage.css";

import React, { Component } from 'react';
import {Button, Tab, Tabs, ToggleButton, ToggleButtonGroup, Well} from "react-bootstrap";
import Chart from "react-google-charts";
import {Link} from "react-router-dom";
import axios from 'axios'

const api_endpoint = "http://localhost:8080/api";

const RadioOptions = [
    "Overall Assessment",
    "Description of Course Objectives",
    "Communication of Ideas and Information",
    "Expression of Expectations",
    "Availability to Students",
    "Respect for Students",
    "Simulation of Interest in Course",
    "Facilitation of Learning"
];

const DefaultCourseOptions = [
    "All Courses",
    "COP3503",
    "CEN3031",
    "EEL4390",
    "CNT4007C",
    "MAC2301",
    "CIS4739"
];

const DefaultNotableFeedback = [
    "He's a good teacher -COP3502 F17",
    "He made me like programming -CEN3031 S18",
    "Best class ever -COP3503 F18",
    "This is some gosh darn feedback -MAC2301 F11",
    "This is feedback as well -COP3502 F17",
];

const DefaultBio = "He is a teacher who likes stuff";

const DefaultInstructorData = [
    [["Semester", "Score"], ["F17", 2],["S18", 3],["SU18", 4], ["F18", 5]],
    [["Semester", "Score"], ["F17", 1.2],["S18", 1.4],["SU18", .8], ["F18", 4]],
    [["Semester", "Score"], ["F17", 2.4],["S18", 2.4],["SU18", 2.4], ["F18", 1]],
    [["Semester", "Score"], ["F17", 4.2],["S18", 1],["SU18", 2], ["F18", 1]],
    [["Semester", "Score"], ["F17", 4.4],["S18", 3.3],["SU18", 2.2], ["F18", 1.1]],
    [["Semester", "Score"], ["F17", 2],["S18", 3],["SU18", 3], ["F18", 2]],
    [["Semester", "Score"], ["F17", 1.7],["S18", 1.7],["SU18", 2.4], ["F18", 3.2]],
    [["Semester", "Score"], ["F17", 5],["S18", 4],["SU18", 4], ["F18", 5]]
]

var DefaultInstructorData = [
    [["Semester", "Score"], ["F17", 2],["S18", 3],["SU18", 4], ["F18", 5]],
    [["Semester", "Score"], ["F17", 1.2],["S18", 1.4],["SU18", .8], ["F18", 4]],
    [["Semester", "Score"], ["F17", 2.4],["S18", 2.4],["SU18", 2.4], ["F18", 1]],
    [["Semester", "Score"], ["F17", 4.2],["S18", 1],["SU18", 2], ["F18", 1]],
    [["Semester", "Score"], ["F17", 4.4],["S18", 3.3],["SU18", 2.2], ["F18", 1.1]],
    [["Semester", "Score"], ["F17", 2],["S18", 3],["SU18", 3], ["F18", 2]],
    [["Semester", "Score"], ["F17", 1.7],["S18", 1.7],["SU18", 2.4], ["F18", 3.2]],
    [["Semester", "Score"], ["F17", 5],["S18", 4],["SU18", 4], ["F18", 5]]
];

const formatInstructorData = (response_data) => {
    var output = [];
    console.log(response_data)
    for (var i=0; i<response_data.length; i++) {
        var row = new Array(["Semester", "Score"]);
        for (var j=0; j<response_data[i].length; j++) {
            row.push(new Array(response_data[i][j].Term, response_data[i][j].Rating));
        }
        output.push(row)
    }

    console.log(output);
    return output;
}

const formatCourseOptions = (response) => {
    var output = new Array(["All Courses"]);

    for (var i=0; i<6; i++) {
        output.push(response[i]);
    }
    return output;

}

export class DashboardPage extends Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.teacherName = props.match.params.teacher;
        this.state = {
            key: 0,
            radio: 0,
            courseOptions: DefaultCourseOptions,
            notableFeedback: DefaultNotableFeedback,
            bio: DefaultBio,
            instructor_data: DefaultInstructorData,
            overall_instructor_data: DefaultInstructorData
        };

    }

    componentDidMount() {
        //After setting default values, hit teacher evals endpoint to fill graph data
        axios.get(api_endpoint + '/teacher_evals?name=' + this.teacherName.replace(/\s/g,','))
            .then(function (response) {
                console.log(response.data);
                this.setState((state) => ({
                    bio: response.data.Bio,
                    notableFeedback: response.data.Feedback,
                    courseOptions: formatCourseOptions(response.data.Courses),
                    instructor_data: formatInstructorData(response.data.OverallEvals),
                    overall_instructor_data: formatInstructorData(response.data.OverallEvals)
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

    handleSelect(key) {
        this.setState({key:key, radio:this.state.radio});
        // If key is 0(Course selection is "All Courses"), used cached overall data
        if (!key) {
            this.setState({instructor_data: this.state.overall_instructor_data});
        //Otherwise hit evals endpoint with teacher name and course
        } else {
            axios.get(api_endpoint + '/teacher_evals?name=' + this.teacherName.replace(/\s/g,',') + '&course=' + this.state.courseOptions[key])
            .then(function (response) {
                console.log(response.data)
                this.setState({instructor_data: formatInstructorData(response.data)})
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
        }
    }

    handleChange(key) {
        this.setState({key:this.state.key, radio: key});
    }

    render() {
        var graphOptions = {
            title: RadioOptions[this.state.radio] + " -- " + this.state.courseOptions[this.state.key],
            hAxis: { title: "Semester", viewWindow: { min: 0, max: 4 } },
            vAxis: { title: "Score", viewWindow: { min: 0, max: 5 } },
            legend: "none",
            animation: {
                duration: 500,
                easing: 'out',
                startup: true,
              }
        };
        var page = (
            <div>
                <div className="header-group">
                    <div className="header-top">
                        <div className="header-title">
                            <Link to="/"><img className="uf-logo" src="/logo-uf.svg" alt="UF Logo" /></Link>
                            <h1 className="header">ONE.UF | RATINGS: {this.teacherName}</h1>
                        </div>
                    </div> 
                    <div className="header-bottom"></div>
                </div>

                <div className="chart-group">
                    <div className="chart-tabs">
                        <Tabs
                            onSelect={this.handleSelect}
                            activeKey={this.state.key}
                            id="course-tab-control"
                            >
                            {
                                this.state.courseOptions.map(function(value, i) {
                                    return <Tab Key={value.id} eventKey={i} title={value}/>
                                })
                            }
                        </Tabs>
                    </div>

                    <div className="chart">
                        <Chart
                                chartType="ColumnChart"
                                width="100%"
                                height="100%"
                                data={this.state.instructor_data[this.state.radio]}
                                options={graphOptions}
                            />
                    </div>

                    <div className="chart-radio">
                        <ToggleButtonGroup
                            vertical
                            type="radio"
                            bsSize="small"
                            name="evaluationCriteria"
                            defaultValue={0}
                            onChange={this.handleChange}
                        >
                            {
                                RadioOptions.map(function(option, i) {
                                    return <ToggleButton value={i}>{option}</ToggleButton>
                                })
                            }
                        </ToggleButtonGroup>
                    </div>
                </div>

                <div className="bio">
                    <Well>
                        <div>{this.teacherName + "'s bio: "}</div>
                        <p>{this.state.bio}</p>
                    </Well>
                </div>

                <div className="feedback">
                    <Well>
                        <div>Notable Feedback:</div>
                        {
                            this.state.notableFeedback.map(function(feedback, i) {
                                return <div>{feedback}</div>
                            })
                        }
                    </Well>
                </div>
            </div>
        );


        return(page);
    }
}
