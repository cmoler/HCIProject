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

const CourseOptions = [
    "All Courses",
    "COP3502",
    "CEN3031",
    "EEL4390",
    "CNT4007C",
    "MAC2301",
    "CIS4739"
];

const CourseOptions_big = [
    "All Courses",
    "COP3502",
    "CEN3031",
    "COP3503",
    "EEL4390",
    "CNT4007C",
    "MAC2301",
    "COP3530",
    "CIS4730"
];

export class DashboardPage extends Component {

    constructor(props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            key: 0,
            radio: 0
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
            title: RadioOptions[this.state.radio] + " -- " + CourseOptions[this.state.key],
            hAxis: { title: "Semester", viewWindow: { min: 0, max: 4 } },
            vAxis: { title: "Score", viewWindow: { min: 0, max: 5 } },
            legend: "none"
        };

        var overallClassData = [
            ["Semester", "Score"],
            ["F17", 3.4],
            ["S18", 4.3],
            ["SU18", 3.1],
            ["F18", 4.5]
        ];

        var page = (
            <div>
                <div className="back-button">
                    <Button><Link to ="/">Back to Registration</Link></Button>
                </div>

                <div className="dash-title">
                <h3>In Dashboard for { this.teacherName }</h3>
                </div>

                <div className="chart-group">
                    <div className="chart-tabs">
                        <Tabs
                            onSelect={this.handleSelect}
                            activeKey={this.state.key}
                            id="course-tab-control"
                            >
                            {
                                CourseOptions.map(function(value, i) {
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
                                data={overallClassData}
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

                        <p>Hes a teacher who teaches stuff</p>
                    </Well>
                </div>

                <div className="feedback">
                    <Well>
                        <div>Notable Feedback:</div>

                        <div>"He's a good teacher" -COP3502 F17</div>
                        <div>"He made me like programming" -CEN3031 S18</div>
                        <div>"Best class ever" -COP3503 F18</div>
                    </Well>
                </div>
            </div>
        );


        return(page);
    }
}
