import React, { Component } from 'react';
import {Button, ButtonGroup, ButtonToolbar, DropdownButton, MenuItem, Tab, Tabs} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import "./RegistrationPage.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import {ScoresPerClassModal} from "../ScoresPerClassModal/ScoresPerClassModal";
import {InstructorsForCourseModal} from "../InstructorsForCourseModal/InstructorsForCourseModal";

export class RegistrationPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            scoresPerClassModalShow: false,
            instructorsForCourseShow: false
        };

        this.interdisciplinary = [{
                name: "Human Computer Interaction",
                credits: 3,
                rating: 10,
                professor: "J. Ruiz"
            },
            {
                name: "Penetration Testing",
                credits: 3,
                rating: 8.3,
                professor: "Wilson"
            }];
    }

    render() {
        let scoresPerClassClose = () => this.setState({ scoresPerClassModalShow: false });
        let instructorsForCourseClose = () => this.setState ({ instructorsForCourseShow: false});

        return (
            <div>
                <div className="filters">
                    <Tabs defaultActiveKey={0} id="filter-tabs" className = "tabClass">
                        <Tab eventKey={0} title="Filters">
                            <div className="filter-options">
                                <div class = "dropdown">
                                    <button class="dropbtn">Program</button>
                                    <div class="dropdown-content">
                                        <a href="#">Campus</a>
                                        <a href="#">Online</a>
                                        <a href="#">Innovation Academy</a>
                                    </div>
                                </div>
                                <div class = "dropdown">
                                    <button class="dropbtn">Program Level</button>
                                    <div class="dropdown-content">
                                        <a href="#">Undergraduate</a>
                                        <a href="#">Graduate</a>
                                    </div>
                                </div>
                                Course Number: <input name="Course Number" type="text" placeholder = "ex:ACG 2021" id="courseNumber"/>
                                Class Number: <input name="Class Number" type="text" placeholder = "ex: 15110" id="classNumber"/>
                                Course Title: <input name="Course Title" type="text" placeholder = "Course Title or Keyword" id="courseTitle"/>
                            </div>
                        </Tab>
                        <Tab eventKey={1} title="Course Filter">
                            Course Number: <input name="Course Number" type="text" placeholder = "ex:ACG 2021" id="courseNumber"/>
                            Class Number: <input name="Class Number" type="text" placeholder = "ex: 15110" id="classNumber"/>
                            Course Title: <input name="Course Title" type="text" placeholder = "Course Title or Keyword" id="courseTitle"/>
                            <div class = "dropdown">
                                    <button class="dropbtn">Level Minimum</button>
                                    <div class="dropdown-content">
                                        <a href="#">1000</a>
                                        <a href="#">2000</a>
                                        <a href="#">3000</a>
                                        <a href="#">4000</a>
                                        <a href="#">5000</a>
                                        <a href="#">6000</a>
                                        <a href="#">7000</a>
                                        <a href="#">8000</a>
                                    </div>
                            </div>
                            <div class = "dropdown">
                                    <button class="dropbtn">Level Maximum</button>
                                    <div class="dropdown-content">
                                        <a href="#">1999</a>
                                        <a href="#">2999</a>
                                        <a href="#">3999</a>
                                        <a href="#">4999</a>
                                        <a href="#">5999</a>
                                        <a href="#">6999</a>
                                        <a href="#">7999</a>
                                        <a href="#">8999</a>
                                    </div>
                            </div>
                            Instructor: <input name="Instructor" type="text" placeholder = "Instructor Last Name" id="instructor"/>
                            Credits: <input name="Credits" type="text" placeholder = "# of Credits" id="credits"/>
                        </Tab>
                        <Tab eventKey={2} title="Class Meeting">
                            
                        </Tab>
                        <Tab eventKey={3} title="Course Properties">
                        </Tab>
                    </Tabs>
                </div>

                <div className="unmet-requirements">
                    <h3>Unmet Requirements</h3>
                    <ButtonToolbar>
                        <ButtonGroup vertical className = "courseDescriptors">
                            <DropdownButton
                                title="Interdisciplinary Electives"
                                id="dropdown-1"
                            >
                                <BootstrapTable ref='interdisciplinary' data={ this.interdisciplinary }>
                                    <TableHeaderColumn dataField='name' isKey={true} dataSort={true} width='15vw'>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='credits' dataSort={true} width='5vw'>Credits</TableHeaderColumn>
                                    <TableHeaderColumn dataField='rating' dataSort={true} width='5vw'>Rating</TableHeaderColumn>
                                    <TableHeaderColumn dataField='professor' dataSort={true} width='10vw'>Professor</TableHeaderColumn>
                                </BootstrapTable>
                            </DropdownButton>
                            <DropdownButton title="Technical Electives" id="dropdown-2">
                                <BootstrapTable ref='technical' data={ this.interdisciplinary }>
                                    <TableHeaderColumn dataField='name' isKey={true} dataSort={true} width='15vw'>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='credits' dataSort={true} width='5vw'>Credits</TableHeaderColumn>
                                    <TableHeaderColumn dataField='rating' dataSort={true} width='5vw'>Rating</TableHeaderColumn>
                                    <TableHeaderColumn dataField='professor' dataSort={true} width='10vw'>Professor</TableHeaderColumn>
                                </BootstrapTable>                            </DropdownButton>
                            <DropdownButton title="General Education" id="dropdown-2">
                                <BootstrapTable ref='general' data={ this.interdisciplinary }>
                                    <TableHeaderColumn dataField='name' isKey={true} dataSort={true} width='15vw'>Name</TableHeaderColumn>
                                    <TableHeaderColumn dataField='credits' dataSort={true} width='5vw'>Credits</TableHeaderColumn>
                                    <TableHeaderColumn dataField='rating' dataSort={true} width='5vw'>Rating</TableHeaderColumn>
                                    <TableHeaderColumn dataField='professor' dataSort={true} width='10vw'>Professor</TableHeaderColumn>
                                </BootstrapTable>
                            </DropdownButton>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>

                <div className="schedule">
                </div>

                <ButtonToolbar>
                    <Button
                        bsStyle="default"
                        onClick={() => this.setState({ scoresPerClassModalShow: true })}
                    >
                        Scores Per Class Modal
                    </Button>
                    <Button
                        bsStyle="default"
                        onClick={() => this.setState({ instructorsForCourseShow: true })}
                    >
                        Instructors For Class Modal
                    </Button>
                    <ScoresPerClassModal show={this.state.scoresPerClassModalShow} onHide={scoresPerClassClose} />
                    <InstructorsForCourseModal show={this.state.instructorsForCourseShow} onHide={instructorsForCourseClose} />
                </ButtonToolbar>
            </div>
        );
    }
}