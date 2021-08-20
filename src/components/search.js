import { useState } from 'react';
import { Col, Row, Form, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import * as action from './../actions/index';

const Search = (props) =>{
    const [keyword, setKeyword] = useState('');

    const onChangeInput = (event) =>{
      let target = event.target;
      setKeyword(target.value);
    };

    const onSearch = (event)=>{
      event.preventDefault();
      props.handleSearchTask(keyword);
    };

    return (
      <Form>
        <Row>
          <Col className={props.isDisplayForm?"col-xs-12 col-sm-12 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-6 col-lg-6"}>
            <input className="search-input" type="text" value={keyword} onChange={onChangeInput} placeholder="Nhập từ khóa..." />
          </Col>
          <Col className="col-xs-3 col-sm-4 col-md-4 col-lg-4">
          <Button variant="primary" type="submit" onClick={onSearch}>
              <span><i className="fa fa-search" aria-hidden="true"/> Tìm</span>
          </Button>
          </Col>
        </Row>
      </Form>
    );

};

const mapStateToProps = (state) =>{
  return {
    isDisplayForm : state.isDisplayForm
  };
};

const mapDispatchToProps = (dispatch, props) =>{
  return {
    handleSearchTask : (keyword)=>{
      dispatch(action.searchTask(keyword));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);