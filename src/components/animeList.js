import { useEffect, useState } from "react";
import { gql } from '@apollo/client';
import requestApi from './../helpers/apiHepler';
import { Table, Form, FormControl, Button } from "react-bootstrap";
import Pagination from 'react-js-pagination'

let FIRMS_QUERY = gql`
query ($page: Int!, $perPage: Int!){
  Page(page: $page, perPage: $perPage) {
  media{
    id
    coverImage {
      medium
    }
    title {
      userPreferred
    }
  }}
}
`;
let SEACH_FIRMS_QUERY = gql`
query ($page: Int!, $perPage: Int!, $search: String!){
  Page(page: $page, perPage: $perPage) {
  media(search: $search) {
    id
    coverImage {
      medium
    }
    title {
      userPreferred
    }
  }}
}
`;
const AnimeList = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [animeList, setAnimeList] = useState([]);
    //control state search
    const [txtSearch, setTxtSearch] = useState('');
    const [keywordSearch, setKeywordSearch] = useState('');

    useEffect(() => {
        let queryData = FIRMS_QUERY;
        let variables = {
            page: currentPage,
            perPage: perPage
        };
        if (keywordSearch != '') {
            variables.search = keywordSearch;
            queryData = SEACH_FIRMS_QUERY;
        }
        requestApi(queryData, variables).then((response) => {
            console.log(response.media);
            if (response.media) {
                setAnimeList(response.media);
                setTotalRows(response.media.length);
            }
        }).catch((err) => {
            console.log("ERR", err);
        });

    }, [currentPage, perPage, keywordSearch]);

    const onChangeSearch = (event) => {
        let target = event.target;
        if (target.value == '') {
            setTxtSearch(target.value);
            setKeywordSearch(target.value);
        } else {
            setTxtSearch(target.value);
        }
    };

    const onSearchText = (event) => {
        event.preventDefault();
        setKeywordSearch(txtSearch);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div>
            <h3 style={{ background: 'gray' }}>Anime list</h3>
            <Form onSubmit={onSearchText}>
                <Form.Group>
                    <input style={{ height: "40px" }} name='txtSearch' type='text' placeholder='Nhập nội dung tìm kiếm' value={txtSearch} onChange={onChangeSearch} />
                    <Button style={{ height: "42px" }} variant="outline-primary" type='submit' >Tìm kiếm</Button>
                </Form.Group>
            </Form>
            <Table bordered hover>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Tên</th>
                        <th>Hinh</th>
                    </tr>
                </thead>
                <tbody>
                    {(animeList.length > 0) && animeList.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td>{item.title.userPreferred}</td>
                                <td>
                                    <img src={item.coverImage.medium} style={{ width: 100 }}></img>
                                </td>
                            </tr>
                        );
                    })}

                </tbody>
            </Table>
            <Pagination
                innerClass={'pagination'}
                activePage={currentPage}
                itemsCountPerPage={5}
                totalItemsCount={totalRows}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
                firstPageText={<span className=''><i className='fa fa-step-backward' aria-hidden="true"/></span>}
                lastPageText={<span><i className='fa fa-step-forward' aria-hidden="true"/></span>}
                prevPageText={<span><i className="fa fa-chevron-left" aria-hidden="true"/></span>}
                nextPageText={<span><i className="fa fa-chevron-right" aria-hidden="true"></i></span>}
            />     
        </div>
    )
}

export default AnimeList;