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
                    <Tabs defaultActiveKey={0} id="filter-tabs">
                        <Tab eventKey={0} title="Filters">
                        </Tab>
                        <Tab eventKey={1} title="Course Filter">
                        </Tab>
                        <Tab eventKey={2} title="Meeting Time">
                        </Tab>
                        <Tab eventKey={3} title="Course Properties">
                        </Tab>
                    </Tabs>
                </div>

                <div className="unmet-requirements">
                    <h4>Unmet Requirements</h4>
                    <ButtonToolbar>
                        <ButtonGroup vertical>
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