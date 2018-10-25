import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./DashboardPage.css";

import React, { Component } from 'react';
import {Button, Tab, Tabs, ToggleButton, ToggleButtonGroup, Well} from "react-bootstrap";
import Chart from "react-google-charts";
import {Link} from "react-router-dom";

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
    "COP3502",
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
    "This is some gosh darn feedback -MAC2301 F11"
]

const DefaultBio = "He is a teacher who likes stuff"

var DefaultInstructorData = [
    [["Semester", "Score"], ["F17", 2],["S18", 3],["SU18", 4], ["F18", 5]],
    [["Semester", "Score"], ["F17", 1.2],["S18", 1.4],["SU18", .8], ["F18", 4]],
    [["Semester", "Score"], ["F17", 2.4],["S18", 2.4],["SU18", 2.4], ["F18", 1]],
    [["Semester", "Score"], ["F17", 4.2],["S18", 1],["SU18", 2], ["F18", 1]],
    [["Semester", "Score"], ["F17", 4.4],["S18", 3.3],["SU18", 2.2], ["F18", 1.1]],
    [["Semester", "Score"], ["F17", 2],["S18", 3],["SU18", 3], ["F18", 2]],
    [["Semester", "Score"], ["F17", 1.7],["S18", 1.7],["SU18", 2.4], ["F18", 3.2]],
    [["Semester", "Score"], ["F17", 5],["S18", 4],["SU18", 4], ["F18", 5]]
]

export class DashboardPage extends Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            key: 0,
            radio: 0,
            courseOptions: DefaultCourseOptions,
            notableFeedback: DefaultNotableFeedback,
            bio: DefaultBio,
            instructor_data: DefaultInstructorData
        };
        this.teacherName = props.match.params.teacher;
    }

    handleSelect(key) {
        this.setState({key:key, radio:this.state.radio});
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
            <div className="master-page">
                <div className="header-group">
                    <div className="header-top">
                        <div className="back-button">
                            <Button><Link to ="/">Back to Registration</Link></Button>
                        </div>
                        <div className="header-title">
                            <h1 className="header">ONE.UF | RATINGS: ({this.teacherName.toUpperCase()}).</h1>
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
                                    return <Tab eventKey={i} title={value}/>
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
                            <ToggleButton value={0}>Overall Assessment</ToggleButton>
                            <ToggleButton value={1}>Communication of Ideas and Information</ToggleButton>
                            <ToggleButton value={2}>Expression of Expectations</ToggleButton>
                            <ToggleButton value={3}>Availability to Students</ToggleButton>
                            <ToggleButton value={4}>Respect for Students</ToggleButton>
                            <ToggleButton value={5}>Simulation of Interest in Course</ToggleButton>
                            <ToggleButton value={6}>Facilitation of Learning</ToggleButton>
                            <ToggleButton value={7}>Description of Course Objectives</ToggleButton>
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
