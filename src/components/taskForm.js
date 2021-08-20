import { useEffect, useState } from 'react';
import { Card, FormControl, Form, Button, Col, CloseButton } from 'react-bootstrap';
import Randomstring from 'randomstring';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

const TaskForm = (props) => {
  const [task, setTask] = useState(
    {
      id:'',
      name: '',
      status: false
    }
  );
  const [resetFlat, setResetFlat] = useState(0);

  useEffect(()=>{
    if(props.selectedItem && props.selectedItem.id !== null){
      setTask({
        id: props.selectedItem.id,
        name: props.selectedItem.name,
        status: props.selectedItem.status
      });
    } else{
      handleCancel();
    }
      
  }, [props.selectedItem]);

  const handleInput = (event) => {
    let target = event.target;
    setTask({...task, [target.name]: target.value });
  };

  const handleCancel = () => {
    setTask({
      id: '',
      name: '',
      status: false
    });
  };

  const handleSubmit = (event)=>{
    event.preventDefault();
    if(task.id === ''){
      let newID = Randomstring.generate();
      setTask(Object.assign(task, {id: newID}));
      props.onAddTask(task);
    } else {
      props.onUpdateTask(task);
    }
    handleCancel();
  };

  return (
    <Col className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
      <Card className="add-box">
        <div className="title-add-box" >
          <span>Thêm công việc</span>
          <CloseButton onClick={()=>{props.onCloseForm()}}/>
        </div>
        <Card.Body>
          <Form onSubmit={handleSubmit} >
            <label className="label-field">Tên:</label>
            <br />
            <FormControl type="text" name="name" value={task.name} onChange={handleInput} />
            <br />
            <label className="label-field">Trạng thái</label>
            <br />
            <Form.Select name="status" value={task.status} onChange={handleInput}>
              <option value={true}>Kích hoạt</option>
              <option value={false}>Ẩn</option>
            </Form.Select>
            <div className="button-add-box">
              <Button className="button-item" type="submit" variant="warning"><span><i className="fa fa-plus-square" /> Lưu lại</span> </Button>
              <Button className="button-item" variant="danger" onClick={handleCancel} ><span><i className="fa fa-times" /> Hủy bỏ</span></Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Col>
  );
};

const mapStateToProps = (state) =>{
    return{
      isDisplayForm: state.isDisplayForm,
      selectedItem : state.selectedItem
    };
};

const mapDispatchToProps = (dispatch, props)=>{
    return{
      onAddTask : (task) =>{
        dispatch(actions.addTask(task));
      },
      onUpdateTask : (task) =>{
        dispatch(actions.updateTask(task));
      },
      onCloseForm : ()=>{
        dispatch(actions.closeForm());
      }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);