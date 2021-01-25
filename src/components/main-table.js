import React, { useEffect, useState, useMemo } from "react";
import Pagination from './pagination';
import TableHeader from './table-header';
import Search from './search';
import useFullPageLoader from './useFullPageLoader';
import axios from 'axios';
import {Table} from 'react-bootstrap';



const DataTable = () => {
    const [comments, setComments] = useState([]);
    const [loader, showLoader, hideLoader] = useFullPageLoader();
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    const ITEMS_PER_PAGE = 20;

    const headers = [
        { name: "CustomerCanSee", field: "CustomerCanSee", sortable: true },
        { name: "Description", field: "Description", sortable: true },
 
        { name: "VersionNo", field: "VersionNo", sortable: true },
       
         { name: "DeveloperId", field: "DeveloperId", sortable: true }
    ];

    useEffect(() => {
        const getData = () => {
            showLoader();

            // fetch("http://localhost:3000/cars")
            //     .then(response => console.log(response))
            //     .then(res => {
            //         hideLoader();
            //         setComments(res);
            //         console.log(res)
                    
                    
            //     });

            axios
                .get("http://localhost:3000/versions")
                .then((res) => {
                    // console.log(res)
                    hideLoader();
                    console.log(res.data.versions.Items)
                   setComments(res.data.versions.Items);
                   
                })
        };

        getData();
    }, []);

    const commentsData = useMemo(() => {
        let computedComments = comments;

        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.Description.toLowerCase().includes(search.toLowerCase()) ||
                    comment.DeveloperId.toLowerCase().includes(search.toLowerCase()) ||
                    comment.VersionNo.toLowerCase().includes(search.toLowerCase()) 
            );
        }

        setTotalItems(computedComments.length);

        //Sorting comments
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        //Current Page slice
        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
    }, [comments, currentPage, search, sorting]);

    return (
        <>

            <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                            <Pagination
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Search
                                onSearch={value => {
                                    setSearch(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                    </div>

                    <Table responsive size="sm"  striped bordered hover variant="dark">
                        <TableHeader
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                            {commentsData.map(comment => (
                                <tr>
                                    <th scope="row" key={comment.ID}>
                                        {comment.CustomerCanSee==="1" ?  "Evet" : "Hayır"}
                                    </th>
                                    <td style={{textAlign:"left"}}>{ comment.Description}</td>
                                    
                                    <td>{comment.VersionNo}</td>
                                    <td style={{textAlign:"right"}}>{comment.DeveloperId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
            {loader}
        </>
    );
};

export default DataTable;