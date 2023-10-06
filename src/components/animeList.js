import { useEffect, useState } from "react";
import { gql } from '@apollo/client';
import requestApi from './../helpers/apiHepler';
import { Table, Form, FormControl } from "react-bootstrap";

let FIRMS_QUERY = gql`
query ($page: Int!, $perPage: Int!){
  Page(page: $page, perPage: $perPage) {
  media {
    id
    coverImage {
      medium
    }
    title {
      userPreferred
    }
  }
}
}
`;
const AnimeList = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [animeList, setAnimeList] = useState([]);
    let variables = {
        page: currentPage,
        perPage: perPage,
    };
    useEffect(() => {
        requestApi(FIRMS_QUERY, variables).then((response) => {
            console.log(response.media);
            if (response.media) {
                setAnimeList(response.media);
            }
        }).catch((err) => {
            console.log("ERR", err);
        });

    }, [currentPage, perPage]);
    return (
        <div>
            <h3 style={{background: 'gray'}}>Anime list</h3>
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
        </div>
    )
}

export default AnimeList;