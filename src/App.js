import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import { Col, Row, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import TaskList from './components/taskList';
import Search from './components/search';
import Sort from './components/sort';
import TaskForm from './components/taskForm';
import {connect} from 'react-redux';
import * as actions from './actions/index';

function App(props) {
  return (
    <div className="main-box">
      <div className="title-container">
        Quản lý công việc
      </div>
      <Row className="">
        {props.isDisplayForm ? (<TaskForm/>) : ''}
        <Col className={props.isDisplayForm ? `col-xs-12 col-sm-12 col-md-8 col-lg-8` : `col-xs-12 col-sm-12 col-md-12 col-lg-12`}>
          <div className="action-box">
            <div className="header-action-box">
              <Button className="button-add-box" variant="primary" onClick={() => props.onToggleForm()}>
                <span><i className="fa fa-plus" aria-hidden="true" /> Thêm công việc</span>
              </Button>
            </div>
            <Row>
              <Col className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                <Row>
                  <Col className="col-xs-12 col-sm-12 col-md-8 col-lg-8">
                    <Search/>
                  </Col>
                  <Col className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                    <Sort/>
                  </Col>
                </Row>
              </Col>
            </Row>
            <br />
            <TaskList/>
          </div>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) =>{
  return {
    isDisplayForm: state.isDisplayForm,
    listData: state.tasks
  };
};

const mapDispatchToProps = (dispatch, props) =>{
  return {
    onToggleForm : ()=>{
      dispatch(actions.toggleForm());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
