import React, { useEffect, useState, useRef } from 'react'
import { Editor, EditorState } from 'draft-js'

import * as domUtils from '../../utils/dom'

import { EditorContainer, PopupContainer } from './styles'

const RichTextEditor: React.FC = () => {
    const divContainerRef = useRef<HTMLDivElement>(null)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
    const [popupPosition, setPopupPosition] = useState<[number, number]>([0, 0])
    const [popupVisible, setPopupVisible] = useState(false)

    useEffect(() => {
        const handleSelectionChange = () => {
            let left = 0
            let top = 0
            if (divContainerRef.current) {
                const domRc = divContainerRef.current.getBoundingClientRect()
                left = domRc.left
                top = domRc.top
            }
            const rc = domUtils.getSelectionCoords()
            if (rc) {
                if (rc.width > 0) {
                    setPopupPosition([rc.left + rc.width / 2 - left, rc.top - top])
                    setPopupVisible(true)
                } else {
                    setPopupVisible(false)
                }
            } else {
                setPopupVisible(false)
            }
        }

        const handleSelectionStart = () => {
            document.addEventListener('selectionchange', handleSelectionChange)
        }

        const handleMouseLeave = () => {
            document.removeEventListener('selectionchange', handleSelectionChange)
        }

        if (!divContainerRef.current) {
            return
        }
        divContainerRef.current.addEventListener('selectstart', handleSelectionStart)
        divContainerRef.current.addEventListener('mouseleave', handleMouseLeave)
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange)
            if (!divContainerRef.current) {
                return
            }
            divContainerRef.current.removeEventListener('selectstart', handleSelectionStart)
            divContainerRef.current.removeEventListener('mouseleave', handleMouseLeave)
        }
    }, [divContainerRef.current])

    return (
        <EditorContainer>
            <div ref={divContainerRef}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                />
            </div>
            {popupVisible && (
                <PopupContainer x={popupPosition[0]} y={popupPosition[1]}>
                    POPUP
                </PopupContainer>
            )}
        </EditorContainer>
    )
}

export default RichTextEditor
