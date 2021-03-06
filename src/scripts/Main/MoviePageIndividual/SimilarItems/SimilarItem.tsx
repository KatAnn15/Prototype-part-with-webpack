import * as React from "react";
import "./SimilarItem.scss";
import { posterBase } from "@constants/Constants";

interface SimilarItemProps {
  data: { poster_path: string; original_title: string };
}

const SimilarItem: React.FC<SimilarItemProps> = ({ data }) => {
  const { poster_path, original_title } = data;

  return (
    <div className="similar-item_wrapper" data-testid="test_one-similar">
      <div
        className="similar-item_poster"
        style={{ backgroundImage: `url(${posterBase}${poster_path})` }}
      ></div>
      <h3 className="similar-item_title">{original_title}</h3>
    </div>
  );
};

export default SimilarItem;
