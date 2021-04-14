import React from 'react'

import RichTextEditor from '../../components/RichTextEditor'

import { WriterContainer } from './styles'

const Writer: React.FC = () => {
    return (
        <WriterContainer>
            <RichTextEditor />
        </WriterContainer>
    )
}

export default Writer
