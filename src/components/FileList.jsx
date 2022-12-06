import React from "react";

import { useSelector } from "react-redux";

export default function FileList({ onRemoveItem }) {
  const { files } = useSelector((state) => state.file);

  if (!files.length) {
    return null;
  }

  return (
    <div className="file-loader-list">
      {files.map((el) => (
        <div className="file-loader-item" key={el.id}>
          <img className="file-loader-img" src={el.value} alt="" />
          <div
            className="file-loader-item-remove"
            onClick={() => onRemoveItem(el.id)}
          >
            &#10006;
          </div>
        </div>
      ))}
    </div>
  );
}
