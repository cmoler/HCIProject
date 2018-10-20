import React, { Component } from 'react';
import {Button, ButtonToolbar} from "react-bootstrap";
import "./RegistrationPage.css";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {ScoresPerClassModal} from "../ScoresPerClassModal/ScoresPerClassModal";
import {InstructorsForCourseModal} from "../InstructorsForCourseModal/InstructorsForCourseModal";

export class RegistrationPage extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            scoresPerClassModalShow: false,
            instructorsForCourseShow: false
        };
    }

    render() {
        let scoresPerClassClose = () => this.setState({ scoresPerClassModalShow: false });
        let instructorsForCourseClose = () => this.setState ({ instructorsForCourseShow: false});

        return (
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
        );
    }
}