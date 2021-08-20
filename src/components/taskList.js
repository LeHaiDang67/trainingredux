import { useEffect, useState } from 'react';
import { FormControl, Form, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from './../actions/index';


const TaskList = (props) => {
    const [keyword, setKeyword] = useState('');
    const [resetFlat, setResetFlat] = useState(0);
    const [filterItem, setFilterItem] = useState('All');
    let taskList = props.tasks;

    useEffect(() => {
    }, [props.tasks, resetFlat, props.filterStatusFromSort, props.sortValue, props.searchTask]);

    const onFilterFromSort = (status) => {
        if (status === 'All') {
            return props.tasks;
        } else {
            let boolValue = status === 'true' ? true : false;
            let newArr = [];
            props.tasks.forEach(item => {
                if (item.status === boolValue) {
                    newArr.push(item);
                }
            });
            return newArr;
        }       
    };

    const onSearchText = (text) => {
        if (text === '') {
            return taskList;
        } else {
            let searchItem = taskList.filter(item => {
                return item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1;
            })
            return searchItem;
        }       
    };

    const onFilterStatus = (event) => {
        let target = event.target;
        let value = target.value;
        setFilterItem(value);
        props.onFilterStatus(value);
    };


    const onChangeSearch = (event) => {
        let target = event.target;
        setKeyword(target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSearchTask(keyword);
    };

    const handleDeleteTask = (item) => {
        props.onDeleteTask(item);
        setResetFlat(resetFlat + 1);
    };
    //handle Filter
    taskList = onFilterFromSort(props.filterStatusFromSort);
    //handle Search
    taskList = onSearchText(props.searchTask);
    //handle Sort
    taskList.sort((a, b) => {
        if (a.name.toLowerCase() > b.name.toLowerCase()) return props.sortValue;
        else if (a.name.toLowerCase() < b.name.toLowerCase()) return -props.sortValue;
        else return 0;
    });

    return (
        <Table bordered hover>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td>
                        <Form onSubmit={handleSubmit}>
                            <FormControl type='text' value={keyword} onChange={onChangeSearch} />
                        </Form>
                    </td>
                    <td>
                        <Form.Select name="status" onChange={onFilterStatus}>
                            <option value="All">Tất cả</option>
                            <option value="false">Ẩn</option>
                            <option value="true">Kích hoạt</option>
                        </Form.Select>
                    </td>
                    <td></td>
                </tr>
                {taskList.map((item, index) => {
                    return (
                        <tr key={index + 1}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.status ? <Button variant="danger" onClick={() => {
                                props.onSwitchStatus(item);
                                props.onClearForm();
                            }}>Kích hoạt</Button>
                                : <Button variant="success" onClick={() => {
                                    props.onSwitchStatus(item)
                                    props.onClearForm();
                                }}>Ẩn</Button>}</td>
                            <td>
                                <Button variant="warning"
                                    onClick={() => {
                                        props.onGetTask(item);
                                        props.onOpenForm();
                                    }}><span><i className="fa fa-pencil-square-o" aria-hidden="true" /> Sửa</span> </Button>
                                <Button variant="danger" style={{ marginLeft: "4px" }} onClick={() => handleDeleteTask(item)}><span><i className="fa fa-trash-o" aria-hidden="true" /> Xóa</span></Button>
                            </td>
                        </tr>
                    );
                })}

            </tbody>
        </Table>
    );
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        isDisplayForm: state.isDisplayForm,
        filterStatusFromSort: state.filterStatus,
        sortValue: state.sortTask,
        searchTask: state.searchTask
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetTask: (task) => {
            dispatch(actions.getTask(task));
        },
        onDeleteTask: (task) => {
            dispatch(actions.deleteTask(task));
        },
        onSwitchStatus: (task) => {
            dispatch(actions.updateStatus(task));
        },
        onOpenForm: () => {
            dispatch(actions.openForm());
        },
        onFilterStatus: (valueStatus) => {
            dispatch(actions.filterStatus(valueStatus));
        },
        onSearchTask: (keyword) => {
            dispatch(actions.searchTask(keyword));
        },
        onClearForm: () => {
            dispatch(actions.clearForm());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);