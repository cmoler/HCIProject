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
            programLevel: "Undergraduate",
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

    updateState(newEvent) {
        this.setState({
            programLevel: newEvent.value
        })
    }

    handleInstructorModal(text) {
        this.setState({instructorSelected: text});
        //alert("Jake!")
        //setNewInstructor(text)
    }


    getSearchCriteria() {
        //get DOM ID of every place they entered data and return it 

        var searchMap = new Map();
        
        //program level
        var programLevelDropdown = document.getElementById('program-level-dropdown');
        var programLevel = programLevelDropdown.options[programLevelDropdown.selectedIndex].value;
        searchMap["ProgramLevel"] = programLevel;

        //department
        var departmentDropdown = document.getElementById('department-dropdown');
        var departmentLevel = departmentDropdown.options[departmentDropdown.selectedIndex].value;
        searchMap["Department"] = departmentLevel;

        if(typeof document.getElementById('courseNumber').value !== "undefined") {
            var courseNumber = document.getElementById('courseNumber').value;
            //searchMap.set("CourseNumber": courseNumber);
            searchMap["CourseNumber"] = courseNumber;
        }
        else if(typeof document.getElementById('courseNumber2').value !== "undefined"){
            var courseNumber = document.getElementById('courseNumber2').value;
            searchMap["CourseNumber"] = courseNumber;
        }

        if(typeof document.getElementById('classNumber').value !== "undefined") {
            var classNumber = document.getElementById('classNumber').value;  
            searchMap["ClassNumber"] = classNumber;   
        }
        else if(typeof document.getElementById('classNumber2').value !== "undefined"){   
            var classNumber = document.getElementById('classNumber2').value; 
            searchMap["ClassNumber"] = classNumber;    
        }

        if(typeof document.getElementById('courseTitle').value !== "undefined") {
            var courseTitle = document.getElementById('courseTitle').value;
            searchMap["CourseTitle"] = courseTitle;
        }
        else if(typeof document.getElementById('courseTitle2')){
            var courseTitle = document.getElementById('courseTitle2').value;
            searchMap["CourseTitle"] = courseTitle;
        }

        //levelmin
        var minLevelDropdown = document.getElementById('level-min-dropdown');
        var minLevel = minLevelDropdown.options[minLevelDropdown.selectedIndex].value;
        searchMap["LevelMinimum"] = minLevel;  

        //level max
        var maxLevelDropdown = document.getElementById('level-max-dropdown');
        var maxLevel = maxLevelDropdown.options[maxLevelDropdown.selectedIndex].value;
        searchMap["LevelMaximum"] = maxLevel; 

        //instructor
        var instructor = document.getElementById('instructor').value;
        if(typeof instructor !== "undefined") {
            searchMap["InstructorLastName"] = instructor; 
        }

        //credits
        var credits = document.getElementById('credits').value;
        if(typeof credits !== "undefined") {
            searchMap["Credits"] = credits; 
        }

        //class meeting

        let instructorButtonFunc = (name) => {
            this.setState({ instructorsForCourseShow: true });
            this.setState({ courseSelected: name });
        };

        let courseButtonFunc = (course) => {
            this.setState({ scoresPerClassModalShow: true });
            this.setState({ instructorSelected: course });
        };

        //POST REQUEST HERE
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                var table = document.getElementById("searchResultTable");
                for(var i = 0; i < myArr.length; i++) {

                    var row = table.insertRow(i);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);
                    var cell4 = row.insertCell(3);

                    var courseButton = document.createElement("input");
                    courseButton.type = "Button";
                    courseButton.value = myArr[i].Name;
                    courseButton.onclick = function() {
                        instructorButtonFunc(this.value);
                    };
                    courseButton.onclick.courseName = myArr[i].Name;

                    var instructorButton = document.createElement("input");
                    instructorButton.type = "Button";
                    instructorButton.value = myArr[i].Professor;
                    instructorButton.onclick = function() {
                        courseButtonFunc(this.value);
                    };


                    cell1.appendChild(courseButton);
                    cell2.innerHTML = myArr[i].Credits;
                    cell3.innerHTML = myArr[i].Rating;
                    cell4.appendChild(instructorButton);
                }
            }
        };
        var url = "https://intense-springs-54094.herokuapp.com/api/course_schedule";
        var data = JSON.stringify({
            "ProgramLevel": programLevel,
            "Department": departmentLevel,
            "CourseNumber": courseNumber,
            "ClassNumber": classNumber,
            "CourseTitle": courseTitle,
            "LevelMinimum": minLevel,
            "LevelMaximum": maxLevel,
            "InstructorLastName": instructor,
            "Credits": credits
        });

        var newData = JSON.stringify(searchMap);

        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader("Content-Type", "application/json");
        xmlhttp.send(newData);
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
                                    Program Level: <select title="Program level" id="program-level-dropdown">
                                        <option value="">--</option>
                                        <option value="Undergraduate">Undergraduate</option>
                                        <option value="Graduate">Graduate</option>
                                    </select>
                                    Program: <select title="Program" id="program-dropdown">
                                        <option value="">--</option>
                                        <option value="Campus">Campus</option>
                                        <option value="Online">Online</option>
                                        <option value="Innovation Academy">Innovation Academy</option>
                                    </select>
                                    Department: <select title="Department" id="department-dropdown">
                                        <option value="">--</option>
                                        <option value="Computer & Information Science & Engineering">Computer & Information Science & Engineering</option>
                                        <option eventKey="Electrical Engineering">Electrical Engineering</option>
                                    </select>
                                </ButtonToolbar>
                                <ButtonToolbar>
                                    Course Number: <input name="Course Number" type="text" placeholder = "ex:ACG 2021" id="courseNumber"/>
                                    Class Number: <input name="Class Number" type="text" placeholder = "ex: 15110" id="classNumber"/>
                                    Course Title: <input name="Course Title" type="text" placeholder = "Course Title or Keyword" id="courseTitle"/>
                                </ButtonToolbar>
                            </div>
                        </Tab>
                        <Tab eventKey={1} title="Course Filter">
                            <ButtonToolbar>
                                Course Number: <input name="Course Number" type="text" placeholder = "ex:ACG 2021" id="courseNumber2"/>
                                Class Number: <input name="Class Number" type="text" placeholder = "ex: 15110" id="classNumber2"/>
                                Course Title: <input name="Course Title" type="text" placeholder = "Course Title or Keyword" id="courseTitle2"/>
                            </ButtonToolbar>
                            <ButtonToolbar>
                                Minimum Level: <select title="Level Minimum" id="level-min-dropdown">
                                    <option value="">--</option>
                                    <option value="1000">1000</option>
                                    <option value="2000">2000</option>
                                    <option value="3000">3000</option>
                                    <option value="4000">4000</option>
                                    <option value="5000">5000</option>
                                    <option value="6000">6000</option>
                                    <option value="7000">7000</option>
                                    <option value="8000">8000</option>
                                </select>
                                Maximum Level: <select title="Level Maximum" id="level-max-dropdown">
                                    <option value="">--</option>
                                    <option value="1999">1999</option>
                                    <option value="2999">2999</option>
                                    <option value="3999">3999</option>
                                    <option value="4999">4999</option>
                                    <option value="5999">5999</option>
                                    <option value="6999">6999</option>
                                    <option value="7999">7999</option>
                                    <option value="8999">8999</option>
                                </select>
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
                            Period Start: <select title="Period Start" id="periodStart">
                                <option value="Undefined">--</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">E1</option>
                                <option value="12">E2</option>
                                <option value="13">E3</option>
                            </select>
                            Period End: <select title="Period End" id="periodEnd">
                                <option value="Undefined">--</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">E1</option>
                                <option value="12">E2</option>
                                <option value="13">E3</option>
                            </select>
                        </Tab>
                    </Tabs>
                    <Button onClick={() => this.getSearchCriteria()}>Search</Button>
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
                                                <Button bsStyle="default" onClick={() =>{
                                                    this.setState({ instructorsForCourseShow: true });
                                                    this.setState({ courseSelected: "Human Computer Interaction"});
                                                }}>
                                                    Human Computer Interaction
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>10</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => {
                                                        this.setState({ scoresPerClassModalShow: true });
                                                        this.setState({ instructorSelected: "J. Ruiz"});
                                                }}>
                                                    J. Ruiz
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button bsStyle="default" onClick={() =>{
                                                    this.setState({ instructorsForCourseShow: true });
                                                    this.setState({ courseSelected: "Penetration Testing"});
                                                }}>
                                                    Penetration Testing
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>8.3</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => {
                                                    this.setState({scoresPerClassModalShow: true});
                                                    this.setState({ instructorSelected: "Wilson"});
                                                }}>
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
                                                <Button bsStyle="default" onClick={() =>{
                                                    this.setState({ instructorsForCourseShow: true });
                                                    this.setState({ courseSelected: "Human Computer Interaction"});
                                                }}>
                                                    Human Computer Interaction
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>10</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => {
                                                    this.setState({ scoresPerClassModalShow: true });
                                                    this.setState({ instructorSelected: "J. Ruiz"});
                                                }}>
                                                    J. Ruiz
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button bsStyle="default" onClick={() =>{
                                                    this.setState({ instructorsForCourseShow: true });
                                                    this.setState({ courseSelected: "Penetration Testing"});
                                                }}>
                                                    Penetration Testing
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>8.3</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => {
                                                    this.setState({scoresPerClassModalShow: true});
                                                    this.setState({ instructorSelected: "Wilson"});
                                                }}>
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
                                                <Button bsStyle="default" onClick={() =>{
                                                    this.setState({ instructorsForCourseShow: true });
                                                    this.setState({ courseSelected: "Human Computer Interaction"});
                                                }}>
                                                    Human Computer Interaction
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>10</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => {
                                                    this.setState({ scoresPerClassModalShow: true });
                                                    this.setState({ instructorSelected: "J. Ruiz"});
                                                }}>
                                                    J. Ruiz
                                                </Button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <Button bsStyle="default" onClick={() =>{
                                                    this.setState({ instructorsForCourseShow: true });
                                                    this.setState({ courseSelected: "Penetration Testing"});
                                                }}>
                                                    Penetration Testing
                                                </Button>
                                            </td>
                                            <td>3</td>
                                            <td>8.3</td>
                                            <td>
                                                <Button bsStyle="default" onClick={() => {
                                                    this.setState({scoresPerClassModalShow: true});
                                                    this.setState({ instructorSelected: "Wilson"});
                                                }}>
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

                <div className="searchResults" id="searchResults">
                    <h3>Search Results</h3>
                    <table class="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Course</th>
                                <th scope="col">Credits</th>
                                <th scope="col">Rating</th>
                                <th scope="col">Professor</th>
                            </tr>
                        </thead>
                        <tbody id="searchResultTable">
                        </tbody>
                    </table>
                </div>

                <div className="schedule">
                    <h3>Current Schedule</h3>
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
                <ScoresPerClassModal show={this.state.scoresPerClassModalShow} onHide={scoresPerClassClose} instructor={this.state.instructorSelected}/>
                <InstructorsForCourseModal show={this.state.instructorsForCourseShow} onHide={instructorsForCourseClose} course={this.state.courseSelected} />
            </div>
        );
    }
}