import React, { useEffect, useState, useRef } from 'react';
import { Editor, EditorState } from 'draft-js';
import { useTransition } from 'react-spring';
import {
    MdFormatBold,
    MdFormatItalic,
    MdFormatUnderlined,
    MdLink
} from 'react-icons/md';

import * as domUtils from '../../utils/dom';

import { EditorContainer, PopupContainer, PopupButton, PopupSeparator } from './styles';

const RichTextEditor: React.FC = () => {
    const divContainerRef = useRef<HTMLDivElement>(null);
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const [popupPosition, setPopupPosition] = useState<[number, number]>([0, 0]);
    const [popupVisible, setPopupVisible] = useState(false);

    const popupTransitions = useTransition(popupVisible, {
        from: {
            opacity: 0,
            transform: 'translate3d(-50%, -20px, 0) scale3d(0.1, 0.1, 0.1)'
        },
        enter: {
            opacity: 1,
            transform: 'translate3d(-50%, 30px, 0) scale3d(1, 1, 1)'
        },
        leave: {
            opacity: 0,
            transform: 'translate3d(-50%, -20px, 0) scale3d(0.1, 0.1, 0.1)'
        }
    });

    useEffect(() => {
        const handleSelectionChange = () => {
            let left = 0;
            let top = 0;
            if (divContainerRef.current) {
                const domRc = divContainerRef.current.getBoundingClientRect();
                left = domRc.left;
                top = domRc.top;
            }
            const rc = domUtils.getSelectionCoords();
            if (rc) {
                if (rc.width > 0) {
                    setPopupPosition([rc.left + rc.width / 2 - left, rc.top - top]);
                    setPopupVisible(true);
                } else {
                    setPopupVisible(false);
                }
            } else {
                setPopupVisible(false);
            }
        };

        const handleSelectionStart = () => {
            document.addEventListener('selectionchange', handleSelectionChange);
        };

        const handleMouseLeave = () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
        };

        if (!divContainerRef.current) {
            return;
        }
        divContainerRef.current.addEventListener('selectstart', handleSelectionStart);
        divContainerRef.current.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            document.removeEventListener('selectionchange', handleSelectionChange);
            if (!divContainerRef.current) {
                return;
            }
            divContainerRef.current.removeEventListener('selectstart', handleSelectionStart);
            divContainerRef.current.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [divContainerRef.current]);

    return (
        <EditorContainer>
            <div ref={divContainerRef}>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                />
            </div>
            {popupTransitions((props, item, key) => item && (
                <PopupContainer
                    key={JSON.stringify(key)}
                    style={props}
                    x={popupPosition[0]}
                    y={popupPosition[1]}
                >
                    <PopupButton>
                        <MdFormatBold size={24} />
                    </PopupButton>
                    <PopupButton>
                        <MdFormatItalic size={24} />
                    </PopupButton>
                    <PopupButton>
                        <MdFormatUnderlined size={24} />
                    </PopupButton>
                    <PopupSeparator />
                    <PopupButton>
                        <MdLink size={24} />
                    </PopupButton>
                </PopupContainer>
            ))}
        </EditorContainer>
    );
};

export default RichTextEditor;
