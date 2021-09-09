import React, { useEffect, useState } from 'react';
import {
    CButton,
    CNav,
    CNavItem,
    CNavLink,
    CCard,
    CCardBody,
    CTabs,
    CTabContent,
    CPagination,
    CCol,
    CAlert,
    CFormGroup,
    CInput,
    CFormText,
    CTextarea,
    CCardGroup,
    CCardHeader
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Axios from 'axios';

const AllPosts = () => {
    const [tab, setTab] = useState(1)
    const [listData, setListData] = useState([])
    const [page, setPage] = useState(1)
    const [totalData, setTotalData] = useState({})
    const [totalPage, setTotalPage] = useState(0)
    const [isEdit, setIsEdit] = useState(false)
    const [dataEdit, setDataEdit] = useState({})

    const [visible1, setVisible1] = useState(0)
    const [visible2, setVisible2] = useState(0)

    const [inputTitle, setInputTitle] = useState('')
    const [inputContent, setInputContent] = useState('')
    const [inputCategory, setInputCategory] = useState('')
    const [isButton, setIsButton] = useState(true)

    useEffect(() => {
        if (inputTitle.length >= 20 && inputContent.length >= 200 && inputCategory.length >= 3) {
            setIsButton(false)
        } else {
            setIsButton(true)
        }
    }, [inputTitle, inputContent, inputCategory])

    useEffect(() => {
        var status = ''
        var offset = (page - 1) * 5
        if (tab === 1) { status = 'publish' }
        if (tab === 2) { status = 'draft' }
        if (tab === 3) { status = 'thrash' }

        Axios.get(`http://localhost:8000/article/byStatus?status=${status}&limit=5&offset=${offset}`).then(res => {
            console.log(res)
            setListData(res.data)
        })
    }, [tab, page, visible1, visible2])

    useEffect(() => {
        var totalPublish = 0;
        var totalDraft = 0;
        var totalThrash = 0;

        Axios.get(`http://localhost:8000/article/getCount?status=publish`).then(res => {
            totalPublish = res.data[0].count
        })
        Axios.get(`http://localhost:8000/article/getCount?status=draft`).then(res => {
            totalDraft = res.data[0].count
        })
        Axios.get(`http://localhost:8000/article/getCount?status=thrash`).then(res => {
            totalThrash = res.data[0].count
        })

        setTimeout(
            function () { setTotalData({ publish: totalPublish, draft: totalDraft, thrash: totalThrash }) }.bind(this), 100
        );

    }, [visible1, visible2])

    useEffect(() => {
        var temp = 0

        if (tab === 1) {(totalData.publish % 5 > 0) ? temp = parseInt(totalData.publish / 5 + 1) : temp = parseInt(totalData.publish / 5)}
        if (tab === 2) {(totalData.draft % 5 > 0) ? temp = parseInt(totalData.draft / 5 + 1) : temp = parseInt(totalData.draft / 5)}
        if (tab === 3) {(totalData.thrash % 5 > 0) ? temp = parseInt(totalData.thrash / 5 + 1) : temp = parseInt(totalData.thrash / 5)}

        setTotalPage(temp)
    }, [tab, listData, totalData])

    useEffect(() => {
        setPage(1)
    }, [tab])

    const chrashAction = (e) => {
        const data = {
            Title: e.title,
            Content: e.content,
            Category: e.category,
            Status: 'thrash'
        }
        Axios.put(`http://localhost:8000/article/update?id=${e.id}`, data).then(res => {
            console.log(res)
            if (res.data.code === 200) {
                setVisible1(1)
            }
        })
    }

    const submitEdit = (postType) => {
        var status;
        if (postType === 0)
            status = 'publish'
        else if (postType === 1)
            status = 'draft'

        const body = {
            Title: inputTitle,
            Content: inputContent,
            Category: inputCategory,
            Status: status
        }
        Axios.put(`http://localhost:8000/article/update?id=${dataEdit.id}`, body).then(res => {
            console.log(res)
            if (res.data.code === 200) {
                setVisible2(1)
                setIsEdit(false)
                setInputTitle('')
                setInputContent('')
                setInputCategory('')
            }
        })

    }

    const editAction = (data) => {
        setIsEdit(true)
        setDataEdit(data)
    }

    const backEditAction = () => {
        setIsEdit(false)
        setInputTitle('')
        setInputContent('')
        setInputCategory('')
    }

    return (
        <div>
            <CAlert
                color="success"
                show={visible1}
                closeButton
                onShowChange={setVisible1}
            >
                Trashed article success!
            </CAlert>
            <CAlert
                color="success"
                show={visible2}
                closeButton
                onShowChange={setVisible2}
            >
                Edit article success!
            </CAlert>
            {!isEdit ?
                <CCol xs="12" md="12" className="mb-4">
                    <CCard>
                        <CCardBody>
                            <CTabs>
                                <CNav variant="tabs" style={{ marginBottom: '20px' }}>
                                    <CNavItem onClick={() => setTab(1)}>
                                        <CNavLink>
                                            Published ({totalData.publish})
                                        </CNavLink>
                                    </CNavItem>
                                    <CNavItem onClick={() => setTab(2)}>
                                        <CNavLink>
                                            Drafts ({totalData.draft})
                                        </CNavLink>
                                    </CNavItem>
                                    <CNavItem onClick={() => setTab(3)}>
                                        <CNavLink>
                                            Trashed ({totalData.thrash})
                                        </CNavLink>
                                    </CNavItem>
                                </CNav>
                                <CTabContent>
                                    <div style={{ backgroundColor: '#768192', height: '50px', width: '100%', display: 'flex' }}>
                                        <div style={{ width: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <text style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>Title</text>
                                        </div>
                                        <div style={{ width: '35%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <text style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>Category</text>
                                        </div>
                                        <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <text style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>Action</text>
                                        </div>
                                    </div>

                                    <div style={{ backgroundColor: '#ffffff', minHeight: '50px', width: '100%', display: 'flex', flexDirection: 'column', padding: '3px 0' }}>
                                        {listData != null ?
                                            listData.map((value, key) => {
                                                return (
                                                    <div style={{ backgroundColor: '#ebedef', minHeight: '50px', width: '100%', display: 'flex', margin: '3px 0' }}>
                                                        <div style={{ width: '35%', display: 'flex', justifyContent: 'flex-start', padding: '20px', alignItems: 'center' }}>
                                                            <text style={{ fontSize: '12px', color: '#4f5d73' }}>{value.title}</text>
                                                        </div>
                                                        <div style={{ width: '35%', display: 'flex', justifyContent: 'center', padding: '20px', alignItems: 'center' }}>
                                                            <text style={{ fontSize: '12px', color: '#4f5d73' }}>{value.category}</text>
                                                        </div>
                                                        <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                            <CButton variant="ghost" color="info" size="sm" style={{ margin: '0 5px' }}>
                                                                <CIcon onClick={() => editAction(value)} name="cil-pencil" />
                                                            </CButton>
                                                            <CButton onClick={() => chrashAction(value)} variant="ghost" color="danger" size="sm" style={{ margin: '0 5px' }}>
                                                                <CIcon name="cil-trash" />
                                                            </CButton>
                                                        </div>
                                                    </div>
                                                )
                                            }) :
                                            <div style={{ backgroundColor: '#ffffff', minHeight: '50px', width: '100%', display: 'flex', margin: '3px 0', justifyContent: 'center', alignItems: 'center' }}>
                                                <text>Data not found!</text>
                                            </div>}
                                    </div>

                                    <div style={{ backgroundColor: '#768192', height: '50px', width: '100%', display: 'flex', padding: '20px', justifyContent: 'flex-end', alignItems: 'center' }} >
                                        <CPagination
                                            style={{ marginTop: '16px' }}
                                            activePage={page}
                                            pages={totalPage}
                                            onActivePageChange={setPage}
                                            size="sm"
                                        />
                                    </div>
                                </CTabContent>
                            </CTabs>
                        </CCardBody>
                    </CCard>
                </CCol>
                :
                <CCol xs="12" md="12" className="mb-4">
                    <CCard>
                        <CCardHeader>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <CButton style={{ position: 'absolute', left: '10px', marginBottom: '0px' }} variant="ghost" color="primary" size="sm" onClick={() => backEditAction()}>
                                    {'<'} Back
                                </CButton>
                                Edit Article
                            </div>


                        </CCardHeader>
                        <CCardBody>
                            <CTabs>
                                <CFormGroup>
                                    <CFormText style={{ marginBottom: '5px' }}>Current title: {dataEdit.title}</CFormText>
                                    <CInput onChange={(e) => setInputTitle(e.target.value)} placeholder="Enter your title" />
                                    <CFormText>
                                        Title minimal 20 character! {inputTitle.length}/20 {inputTitle.length >= 20 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                                    </CFormText>
                                </CFormGroup>

                                <CFormGroup>
                                    <CFormText style={{ marginBottom: '5px' }}>Current content: {dataEdit.content}</CFormText>
                                    <CTextarea
                                        name="textarea-input"
                                        rows="8"
                                        placeholder="Content..."
                                        onChange={(e) => setInputContent(e.target.value)}
                                    />
                                    <CFormText>
                                        Content minimal 200 character! {inputContent.length}/200 {inputContent.length >= 200 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                                    </CFormText>
                                </CFormGroup>

                                <CFormGroup>
                                    <CFormText style={{ marginBottom: '5px' }}>Current category: {dataEdit.category}</CFormText>
                                    <CInput onChange={(e) => setInputCategory(e.target.value)} placeholder="Enter your category" />
                                    <CFormText>
                                        Category minimal 3 character! {inputCategory.length}/3 {inputCategory.length >= 3 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                                    </CFormText>
                                </CFormGroup>

                                <CCardGroup>
                                    <CButton color="success" disabled={isButton} onClick={() => submitEdit(0)}>
                                        Publish
                                    </CButton>
                                    <CButton color="warning" style={{ marginLeft: '10px' }} disabled={isButton} onClick={() => submitEdit(1)}>
                                        Draft
                                    </CButton>
                                </CCardGroup>
                            </CTabs>
                        </CCardBody>
                    </CCard>
                </CCol>
            }
        </div>
    )
}

export default AllPosts