import React, { useEffect, useState } from 'react';
import {
    CCardHeader,
    CPagination
} from '@coreui/react';
import Axios from 'axios';

const Preview = () => {
    const [listData, setListData] = useState(null)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    useEffect(() => {
        Axios.get(`http://localhost:8000/article/byStatus?status=publish&limit=1&offset=${page - 1}`).then(res => {
            console.log(res)
            setListData(res.data)
        })

        Axios.get(`http://localhost:8000/article/getCount?status=publish`).then(res => {
            console.log(res)
            setTotalPage(res.data[0].count)
        })
        setPage(page)
    }, [page])

    return (
        <div style={{ backgroundColor: '#ffffff', padding: '10px' }}>
            <CCardHeader>
                Preview Article
            </CCardHeader>

            {listData != null ?
                <div style={{ padding: '0 60px' }}>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' }}>
                        <h4>{listData[0].title}</h4>
                    </div>

                    <div style={{ margin: '40px 0', overflow: 'auto' }}>
                        <h6 style={{ marginBottom: '20px' }}>Category: {listData[0].category}</h6>
                        <p>{listData[0].content}</p>
                    </div>
                </div> : null
            }
            <div style={{ backgroundColor: '#768192', height: '50px', width: '100%', display: 'flex', padding: '20px', justifyContent: 'flex-end', alignItems: 'center' }} >
                <CPagination
                    style={{ marginTop: '16px' }}
                    activePage={page}
                    pages={totalPage}
                    onActivePageChange={setPage}
                    size="sm"
                />
            </div>
        </div>
    )
}

export default Preview