import React from "react";

import { useDispatch, useSelector } from "react-redux";

import shortid from "shortid";

import FileList from "./FileList";

import { addFiles, removeFileItem } from "../slice/fileSlice";

export default function FileLoader() {
  const { files: list } = useSelector((state) => state.file);

  const dispatch = useDispatch();

  const fileToDataUrl = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.addEventListener("load", (evt) => {
        resolve(evt.currentTarget.result);
      });

      fileReader.addEventListener("error", (evt) => {
        reject(new Error(evt.currentTarget.error));
      });

      fileReader.readAsDataURL(file);
    });
  };

  const handleSelect = async (evt) => {
    const files = [...evt.target.files];
    const urls = await Promise.all(files.map((o) => fileToDataUrl(o)));

    const matched = urls.filter(
      (el) => list.findIndex((item) => item.value === el) === -1
    );

    const newArr = matched.map((el) => ({ value: el, id: shortid.generate() }));

    dispatch(addFiles([...newArr]));
  };

  function handleRemoveItem(id) {
    dispatch(removeFileItem(id));
  }

  return (
    <div className="file-loader">
      <div className="file-loader-header mb-20">
        <div className="file-loader-title">Мои фотографии</div>
        <div className="input-box">
          <input
            className="file-loader-input"
            type="file"
            name="file"
            accept="image/png, image/gif, image/jpeg"
            multiple="multiple"
            onChange={handleSelect}
          />
          <button className="file-loader-btn">Добавить фотографии</button>
        </div>
      </div>
      <div className="mt-20">
        <FileList onRemoveItem={handleRemoveItem} />
      </div>
    </div>
  );
}
