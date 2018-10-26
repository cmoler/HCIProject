import React, { Component } from 'react';
import {Button, ButtonGroup, ButtonToolbar, DropdownButton, MenuItem, Tab, Tabs, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import "./RegistrationPage.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css'
import {ScoresPerClassModal} from "../ScoresPerClassModal/ScoresPerClassModal";
import {InstructorsForCourseModal} from "../InstructorsForCourseModal/InstructorsForCourseModal";


// function setNewInstructor(newInstructor) {
//     this.setState({ instructorSelected: newInstructor })
// }

export class RegistrationPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            scoresPerClassModalShow: false,
            instructorsForCourseShow: false,
            instructorSelected: "Jake Mellinger",
            courseSelected: "Being Awesome 101"
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

        this.handleInstructorModal.bind(this);
    }

    handleInstructorModal(text) {
        this.setState({instructorSelected: text});
        //alert("Jake!")
        //setNewInstructor(text)
    }

    handleSelectRow(row, isSelected, e) {
        /*onClick: (name, credits, rating, professor) => {
            this.setState({ instructorsForCourseShow: true })
            this.setState({ scoresPerClassModalShow: true })
            alert("Jake!")
        }*/

        alert("Jake!");
    }

    render() {
        let scoresPerClassClose = () => this.setState({ scoresPerClassModalShow: false });
        let instructorsForCourseClose = () => this.setState ({ instructorsForCourseShow: false});
        const selectRow ={
            mode: 'radio',
            onSelect: this.handleSelectRow
        };

        return (
            <div>
                <div className="header-group">
                    <div className="header-top">
                        <div className="header-title">
                            <img className="uf-logo" src="/logo-uf.svg" alt="UF Logo" />
                            <h1 className="header">ONE.UF | Schedule of Courses</h1>
                        </div>
                    </div> 
                    <div className="header-bottom"></div>
                </div>
                <div className="filters">
                    <Tabs defaultActiveKey={0} id="filter-tabs" className = "tabClass" justified>
                        <Tab eventKey={0} title="Filters">
                            <div className="filter-options">
                                <ButtonToolbar>
                                    <DropdownButton title="Program level" id="program-level-dropdown">
                                        <MenuItem eventKey="1">Undergraduate</MenuItem>
                                        <MenuItem eventKey="2">Graduate</MenuItem>
                                    </DropdownButton>
                                    <DropdownButton title="Program" id="program-dropdown">
                                        <MenuItem eventKey="1">Campus</MenuItem>
                                        <MenuItem eventKey="2">Online</MenuItem>
                                        <MenuItem eventKey="3">Innovation Academy</MenuItem>

                                    </DropdownButton>
                                    <DropdownButton title="Department" id="department-dropdown">
                                        <MenuItem eventKey="1">Computer & Information Science & Engineering</MenuItem>
                                        <MenuItem eventKey="2">Electrical Engineering</MenuItem>
                                    </DropdownButton>
                                    Course Number: <input name="Course Number" type="text" placeholder = "ex:ACG 2021" id="courseNumber"/>
                                    Class Number: <input name="Class Number" type="text" placeholder = "ex: 15110" id="classNumber"/>
                                </ButtonToolbar>
                                <ButtonToolbar>
                                    Course Title: <input name="Course Title" type="text" placeholder = "Course Title or Keyword" id="courseTitle"/>
                                </ButtonToolbar>
                            </div>
                        </Tab>
                        <Tab eventKey={1} title="Course Filter">
                            <ButtonToolbar>
                                Course Number: <input name="Course Number" type="text" placeholder = "ex:ACG 2021" id="courseNumber"/>
                                Class Number: <input name="Class Number" type="text" placeholder = "ex: 15110" id="classNumber"/>
                                Course Title: <input name="Course Title" type="text" placeholder = "Course Title or Keyword" id="courseTitle"/>
                            </ButtonToolbar>
                            <ButtonToolbar>
                                <DropdownButton title="Level Minimum" id="level-min-dropdown">
                                    <MenuItem eventKey="1">1000</MenuItem>
                                    <MenuItem eventKey="2">2000</MenuItem>
                                    <MenuItem eventKey="3">3000</MenuItem>
                                    <MenuItem eventKey="4">4000</MenuItem>
                                    <MenuItem eventKey="5">5000</MenuItem>
                                    <MenuItem eventKey="6">6000</MenuItem>
                                    <MenuItem eventKey="7">7000</MenuItem>
                                    <MenuItem eventKey="8">8000</MenuItem>
                                </DropdownButton>
                                <DropdownButton title="Level Maximum" id="level-max-dropdown">
                                    <MenuItem eventKey="1">1999</MenuItem>
                                    <MenuItem eventKey="2">2999</MenuItem>
                                    <MenuItem eventKey="3">3999</MenuItem>
                                    <MenuItem eventKey="4">4999</MenuItem>
                                    <MenuItem eventKey="5">5999</MenuItem>
                                    <MenuItem eventKey="6">6999</MenuItem>
                                    <MenuItem eventKey="7">7999</MenuItem>
                                    <MenuItem eventKey="8">8999</MenuItem>
                                </DropdownButton>
                                Instructor: <input name="Instructor" type="text" placeholder = "Instructor Last Name" id="instructor"/>
                                Credits: <input name="Credits" type="text" placeholder = "# of Credits" id="credits"/>
                            </ButtonToolbar>
                            <ButtonToolbar>
                            </ButtonToolbar>
                        </Tab>
                        <Tab eventKey={2} title="Class Meeting">
                            <h4>Days</h4>
                            <ToggleButtonGroup name="classMeetingTimes" type="checkbox">
                                <ToggleButton value={0}>Monday</ToggleButton>
                                <ToggleButton value={1}>Tuesday</ToggleButton>
                                <ToggleButton value={2}>Wednesday</ToggleButton>
                                <ToggleButton value={3}>Thursday</ToggleButton>
                                <ToggleButton value={4}>Friday</ToggleButton>
                                <ToggleButton value={5}>Saturday</ToggleButton>
                                <ToggleButton value={6}>Sunday</ToggleButton>
                            </ToggleButtonGroup>
                            <h4>Periods</h4>
                            <DropdownButton title="Period Start">
                                <MenuItem eventKey="1">1</MenuItem>
                                <MenuItem eventKey="2">2</MenuItem>
                                <MenuItem eventKey="3">3</MenuItem>
                                <MenuItem eventKey="4">4</MenuItem>
                                <MenuItem eventKey="5">5</MenuItem>
                                <MenuItem eventKey="6">6</MenuItem>
                                <MenuItem eventKey="7">7</MenuItem>
                                <MenuItem eventKey="8">8</MenuItem>
                                <MenuItem eventKey="9">9</MenuItem>
                                <MenuItem eventKey="10">10</MenuItem>
                                <MenuItem eventKey="11">11</MenuItem>
                                <MenuItem eventKey="12">E1</MenuItem>
                                <MenuItem eventKey="12">E2</MenuItem>
                                <MenuItem eventKey="13">E3</MenuItem>
                            </DropdownButton>
                            <DropdownButton title="Period End">
                                <MenuItem eventKey="1">1</MenuItem>
                                <MenuItem eventKey="2">2</MenuItem>
                                <MenuItem eventKey="3">3</MenuItem>
                                <MenuItem eventKey="4">4</MenuItem>
                                <MenuItem eventKey="5">5</MenuItem>
                                <MenuItem eventKey="6">6</MenuItem>
                                <MenuItem eventKey="7">7</MenuItem>
                                <MenuItem eventKey="8">8</MenuItem>
                                <MenuItem eventKey="9">9</MenuItem>
                                <MenuItem eventKey="10">10</MenuItem>
                                <MenuItem eventKey="11">11</MenuItem>
                                <MenuItem eventKey="12">E1</MenuItem>
                                <MenuItem eventKey="12">E2</MenuItem>
                                <MenuItem eventKey="13">E3</MenuItem>
                            </DropdownButton>
                        </Tab>
                    </Tabs>
                    <Button>Search</Button>
                </div>

                <div className="unmet-requirements">
                    <h3>Unmet Requirements</h3>
                    <ButtonToolbar>
                        <ButtonGroup vertical className = "courseDescriptors">
                            <DropdownButton
                                title="Interdisciplinary Electives"
                                id="dropdown-1"
                            >
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Course</th>
                                            <th scope="col">Credits</th>
                                            <th scope="col">Rating</th>
                                            <th scope="col">Professor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            
                                            <td>
                                                <Button bsStyle="default" onClick={() => this.setState({ instructorsForCourseShow: true })}>
                                                    Human Computer Interaction
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>10</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => 
                                                        this.setState({ scoresPerClassModalShow: true })
                                                        //setNewInstructor("J. Ruiz")
                                                        //this.handleInstructorModal("J.Ruiz")
                                                }>
                                                    J. Ruiz
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button bsStyle="default" onClick={() => this.setState({ instructorsForCourseShow: true })}>
                                                    Penetration Testing
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>8.3</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => this.setState({ scoresPerClassModalShow: true })}>
                                                    Wilson
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                
                            </DropdownButton>
                            <DropdownButton title="Technical Electives" id="dropdown-2">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Course</th>
                                            <th scope="col">Credits</th>
                                            <th scope="col">Rating</th>
                                            <th scope="col">Professor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            
                                            <td>
                                                <Button bsStyle="default" onClick={() => this.setState({ instructorsForCourseShow: true })}>
                                                    Human Computer Interaction
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>10</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => 
                                                        this.setState({ scoresPerClassModalShow: true })//,
                                                        //this.handleInstructorModal("J.Ruiz")
                                                }>
                                                    J. Ruiz
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button bsStyle="default" onClick={() => this.setState({ instructorsForCourseShow: true })}>
                                                    Penetration Testing
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>8.3</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => this.setState({ scoresPerClassModalShow: true })}>
                                                    Wilson
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>                            
                            </DropdownButton>
                            <DropdownButton title="General Education" id="dropdown-2">
                                <table class="table table-striped table-bordered table-hover">
                                    <thead>
                                        <tr>
                                            <th scope="col">Course</th>
                                            <th scope="col">Credits</th>
                                            <th scope="col">Rating</th>
                                            <th scope="col">Professor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            
                                            <td>
                                                <Button bsStyle="default" onClick={() => this.setState({ instructorsForCourseShow: true })}>
                                                    Human Computer Interaction
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>10</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => 
                                                        this.setState({ scoresPerClassModalShow: true })//,
                                                        //this.handleInstructorModal("J.Ruiz")
                                                }>
                                                    J. Ruiz
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button bsStyle="default" onClick={() => this.setState({ instructorsForCourseShow: true })}>
                                                    Penetration Testing
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>8.3</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => this.setState({ scoresPerClassModalShow: true })}>
                                                    Wilson
                                                </Button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </DropdownButton>
                        </ButtonGroup>
                    </ButtonToolbar>
                </div>

                <div className="schedule">
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Meeting Time</th>
                                <th>Monday</th>
                                <th>Tuesday</th>
                                <th>Wednesday</th>
                                <th>Thursday</th>
                                <th>Friday</th>
                                <th>Saturday</th>
                                <th>Sunday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>7:25</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>8:30</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>9:35</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>10:40</td>
                                <td>MAC 2012</td>
                                <td></td>
                                <td>MAC 2012</td>
                                <td></td>
                                <td>MAC 2012</td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>11:45</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>12:50</td>
                                <td></td>
                                <td rowspan="2">CNT 4007C</td>
                                <td></td>
                                <td rowspan="2">CNT 4007C</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>1:55</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>3:00</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>4:05</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>5:10</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>6:15</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>7:20</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>8:25</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
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
                <ScoresPerClassModal show={this.state.scoresPerClassModalShow} onHide={scoresPerClassClose} />
                <InstructorsForCourseModal show={this.state.instructorsForCourseShow} onHide={instructorsForCourseClose} />
            </div>
        );
    }
}