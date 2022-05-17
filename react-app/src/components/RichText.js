import React from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import draftToHtml from 'draftjs-to-html';
// import BlockType from './controls/BlockType';

const Wrapper = styled.div`
  border: 1px solid #ccc;
  margin-right: 20px;
`;

const Section = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
`;

class RichText extends React.Component {
  state = {
    editorState: EditorState.createEmpty()
  };

  onChange = editorState => this.setState({ editorState });

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  uploadImageCallBack = file => {
    const imageObject = {
      file: file,
      localSrc: URL.createObjectURL(file)
    };
    return new Promise((resolve, reject) => {
      resolve({ data: { link: imageObject.localSrc } });
    });
  };

  render() {
    const { editorState } = this.state;
    return (
      <Wrapper>
        <h2>Without initial</h2>
        <Editor
          editorState={editorState}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            options: [
              'inline',
              'blockType',
              'list',
              'textAlign',
              'link',
              'embedded',
              'emoji',
              'image',
              'remove',
              'history'
            ],
            blockType: {
              inDropdown: true
              // options: ['Normal', 'Blockquote', 'Code']
              // component: BlockType
            },
            inline: {
              inDropdown: false,
              options: ['bold', 'italic']
            },
            list: {
              inDropdown: false,
              options: ['unordered', 'ordered']
            },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            image: {
              urlEnabled: true,
              uploadEnabled: true,
              alignmentEnabled: true,
              uploadCallback: this.uploadImageCallBack,
              previewImage: true,
              inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
              alt: { present: false, mandatory: false },
              defaultSize: {
                height: 'auto',
                width: 'auto'
              }
            }
          }}
        />

        <Section>
          <h2>html:</h2>
          <div
            dangerouslySetInnerHTML={{
              __html: draftToHtml(convertToRaw(editorState.getCurrentContent()))
            }}
          />
        </Section>
        <Section>
          <h2>json:</h2>
          <pre>
            {JSON.stringify(
              convertToRaw(editorState.getCurrentContent()),
              null,
              2
            )}
          </pre>
        </Section>
      </Wrapper>
    );
  }
}

export default RichText;
