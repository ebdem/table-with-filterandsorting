import React,{useState, useEffect, useMemo} from 'react';
import Paginatin from 'react-bootstrap/Pagination';


 const PaginationComponent = ({
    total=0,
    itemsPerPage = 10,
    currentPage = 1,
    onPageChange
}) => {

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if(total > 0 && itemsPerPage > 0 )
            setTotalPages(Math.ceil(total / itemsPerPage));
    },[total , itemsPerPage]);

    const paginationItems = useMemo(() => {
        const pages = [];

        for(let i = 1; i <= totalPages; i++){
            pages.push(
                <Paginatin.Item
                key={i}
                active = { i === currentPage}
                onClick={() => onPageChange(i)}
                >
                    {i}
                </Paginatin.Item>
            );
        }


        return pages;
    }, [totalPages, currentPage]);
    return(
        <Paginatin>
            <Paginatin.Prev
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            />
                {paginationItems}
            <Paginatin.Next 
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === totalPages}
            />
        </Paginatin>
    )
}

export default PaginationComponent;