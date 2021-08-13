import React, { useEffect, useState } from 'react';
import OakButton from '../../../oakui/wc/OakButton';
import OakClickArea from '../../../oakui/wc/OakClickArea';
import OakInput from '../../../oakui/wc/OakInput';
import OakPaginate from '../../../oakui/wc/OakPaginate';
import { searchUnsplash } from '../../section/UnsplashSection/service';
import RichTextEditor from '../RichTextEditor';
import RichTextControlType from '../RichTextEditor/RichTextControlType';
import {
  getUnsplashClass,
  getUnsplashContainerClass,
  getUnsplashContainerImageClass,
  getUnsplashContainerImageImgClass,
  getUnsplashContainerTextClass,
  getUnsplashContainerTextContainerClass,
} from '../../service/EditorHelperService';
import './style.scss';

interface Props {
  value: any;
  handleChange: any;
  placeholder?: string;
}
const UnsplashEditor = (props: Props) => {
  const [chooseImage, setChooseImage] = useState(false);
  const [state, setState] = useState({
    searchText: '',
    pageNo: 1,
    rowsPerPage: 20,
    totalPages: 0,
    total: 0,
  });
  const [results, setResults] = useState<any>([]);

  const handleCaptionChange = (detail: any) => {
    const _newData = { ...props.value.data, caption: detail.value };
    props.handleChange(_newData);
  };

  const handleTextChange = (text: any) => {
    const _newData = { ...props.value.data, text };
    props.handleChange(_newData);
  };

  const handlePaginateChange = (detail: any) => {
    searchImages(detail.pageNo, detail.rowsPerPage, detail.searchText);
  };

  const searchImages = async (
    pageNo: number,
    rowsPerPage: number,
    searchText: string
  ) => {
    const result = await searchUnsplash(searchText, pageNo, rowsPerPage);
    setState({
      ...state,
      rowsPerPage,
      searchText,
      pageNo: result.currentPage,
      totalPages: result.totalPages,
      total: result.total,
    });
    setResults(result.results);
  };

  const handleImageChange = (imageData: any) => {
    const _newData = {
      ...props.value.data,
      raw: {
        urls: imageData.urls,
        user: imageData.user,
        alt_description: imageData.alt_description,
      },
    };
    setChooseImage(false);
    props.handleChange(_newData);
  };

  return (
    <div className={getUnsplashClass()}>
      {!chooseImage && props.value.data?.raw?.urls?.regular && (
        <div
          className={`unsplash-editor__main ${getUnsplashContainerClass(
            props.value
          )}`}
        >
          {props.value.data.position === 'right' && (
            <div className={getUnsplashContainerTextClass()}>
              <div className={getUnsplashContainerTextContainerClass()}>
                <RichTextEditor
                  controls={[
                    RichTextControlType.BOLD,
                    RichTextControlType.ITALIC,
                    RichTextControlType.UNDERLINE,
                    RichTextControlType.STRIKE,
                    RichTextControlType.FONT_SIZE,
                  ]}
                  placeholder="Add content"
                  value={props.value.data.text}
                  handleChange={handleTextChange}
                />
              </div>
            </div>
          )}
          <div
            className={`unsplash-editor__main__image-container ${getUnsplashContainerImageClass()}`}
          >
            <img
              className={`unsplash-editor__main__img ${getUnsplashContainerImageImgClass(
                props.value
              )}`}
              src={props.value.data.raw.urls.regular}
              alt={props.value.data.raw.alt_description}
            />
            <OakInput
              name="caption"
              value={props.value.data.caption || ''}
              shape="underline"
              label="Caption"
              placeholder="Caption"
              handleInput={handleCaptionChange}
              gutterBottom
            />
            <OakButton
              shape="sharp"
              theme="default"
              variant="appear"
              handleClick={() => setChooseImage(true)}
            >
              Change Image
            </OakButton>
          </div>
          {props.value.data.position === 'left' && (
            <div className={getUnsplashContainerTextClass()}>
              <div className={getUnsplashContainerTextContainerClass()}>
                <RichTextEditor
                  controls={[
                    RichTextControlType.BOLD,
                    RichTextControlType.ITALIC,
                    RichTextControlType.UNDERLINE,
                    RichTextControlType.STRIKE,
                    RichTextControlType.FONT_SIZE,
                  ]}
                  placeholder="Add content"
                  value={props.value.data.text}
                  handleChange={handleTextChange}
                />
              </div>
            </div>
          )}
        </div>
      )}
      {(chooseImage || !props.value.data?.raw?.urls?.thumb) && (
        <div className="unsplash-editor__choose-image">
          <div className="unsplash-editor__choose-image__search">
            <OakPaginate
              variant="list"
              formElementShape="underline"
              formElementSize="xsmall"
              paginatePref={{
                pageNo: state.pageNo,
                rowsPerPage: state.rowsPerPage,
                searchText: state.searchText,
              }}
              label=""
              totalRows={state.total}
              handleChange={handlePaginateChange}
            />
          </div>
          <div className="unsplash-editor__choose-image__results">
            {results.map((item: any) => (
              <OakClickArea
                key={item.id}
                handleClick={() => handleImageChange(item)}
              >
                <img
                  className="unsplash-editor__choose-image__results__img"
                  src={item.urls.thumb}
                  alt={item.alt_description}
                />
              </OakClickArea>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UnsplashEditor;
