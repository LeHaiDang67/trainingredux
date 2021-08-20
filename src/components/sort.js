import {Dropdown, DropdownButton} from 'react-bootstrap';
import * as actions from './../actions/index';
import {connect} from 'react-redux';

const Sort = (props) => {
    return (
        <DropdownButton id="dropdown-basic-button" title="Sắp xếp">
            <Dropdown.Item onClick={()=>{
                props.onSortTask(1);
                props.onSelected(-1);
            }}
                className={(props.sortItem === 1) ? 'sort_selected' : ''}
            >
                <span><i className="fa fa-sort-alpha-asc" aria-hidden="true"></i> A-Z</span>
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>{
                props.onSortTask(-1);
                props.onSelected(1);
            }}
                className={(props.sortItem === -1) ? 'sort_selected' : ''}
            >
                <span><i className="fa fa-sort-alpha-desc" aria-hidden="true"></i> Z-A</span>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={()=>props.onFilterStatus('All')}>Tất cả trạng thái</Dropdown.Item>
            <Dropdown.Item onClick={()=>props.onFilterStatus('true')}>Trạng thái kích hoạt</Dropdown.Item>
            <Dropdown.Item onClick={()=>props.onFilterStatus('false')}>Trạng thái ẩn</Dropdown.Item>
        </DropdownButton>
    );
};

const mapStateToProps = (state) =>{
    return {
        sortItem: state.sortSelected,
    };
};

const mapDispatchToProps = (dispatch, props) =>{
    return {
        onFilterStatus : (valueStatus)=>{
            dispatch(actions.filterStatus(valueStatus));
        },
        onSortTask : (valueSort)=>{
            dispatch(actions.sortTask(valueSort));
        },
        onSelected : (value) =>{
            dispatch(actions.sortSelected(value));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sort);