import React, { useState, useEffect } from 'react';
import {
    CButton,
    CCardGroup,
    CAlert,
    CFormText,
    CFormGroup,
    CLabel,
    CInput,
    CTextarea
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import Axios from 'axios';
import { DEV_URL } from "../Constant";

const AddNew = () => {
    const [inputTitle, setInputTitle] = useState('')
    const [inputContent, setInputContent] = useState('')
    const [inputCategory, setInputCategory] = useState('')
    const [isButton, setIsButton] = useState(true)
    const [visible1, setVisible1] = useState(0)
    const [visible2, setVisible2] = useState(0)

    useEffect(() => {
        if (inputTitle.length >= 20 && inputContent.length >= 200 && inputCategory.length >= 3) {
            setIsButton(false)
        } else {
            setIsButton(true)
        }
    }, [inputTitle, inputContent, inputCategory])

    const submitPost = (postType) => {
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
        Axios.post(`${DEV_URL}/article/create`, body).then(res => {
            console.log(res)
            if (res.data.code === 200) {
                setVisible1(1)
            } else {
                setVisible2(1)
            }
        })
    }

    return (
        <div style={{ backgroundColor: '#ffffff', padding: '20px' }}>
            <CAlert
                color="success"
                show={visible1}
                closeButton
                onShowChange={setVisible1}
            >
                Add post success!
            </CAlert>
            <CAlert
                color="danger"
                show={visible2}
                closeButton
                onShowChange={setVisible2}
            >
                Add post error!
            </CAlert>

            <CFormGroup>
                <CLabel>Title</CLabel>
                <CInput onChange={(e) => setInputTitle(e.target.value)} placeholder="Enter your title" />
                <CFormText>
                    Title minimal 20 character! {inputTitle.length}/20 {inputTitle.length >= 20 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                </CFormText>
            </CFormGroup>

            <CFormGroup>
                <CLabel>Content</CLabel>
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
                <CLabel>Category</CLabel>
                <CInput onChange={(e) => setInputCategory(e.target.value)} placeholder="Enter your category" />
                <CFormText>
                    Category minimal 3 character! {inputCategory.length}/3 {inputCategory.length >= 3 ? <CIcon name='cil-check-circle' size='sm' style={{ color: '#2eb85c' }} /> : null}
                </CFormText>
            </CFormGroup>

            <CCardGroup>
                <CButton
                    color="success"
                    disabled={isButton}
                    onClick={() => submitPost(0)}
                >
                    Publish
                </CButton>
                <CButton
                    color="warning"
                    style={{ marginLeft: '10px' }}
                    disabled={isButton}
                    onClick={() => submitPost(1)}
                >
                    Draft
                </CButton>
            </CCardGroup>
        </div>
    )
}

export default AddNew