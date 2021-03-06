import * as React from "react";
import AdditionalBox from "./AdditionalBox";
import VideoCover from "./VideoCover";

interface GalleryItemProps {
  title: string;
  subtitle: string;
  mediaURL: string;
  mediaAlt: string;
  additionalBox: Boolean;
  videoCover: string;
  downloadGif: string;
  imageURL: string;
  name: string;
}

const ListGalleryItem: React.FC<GalleryItemProps> = ({
  title,
  subtitle,
  mediaURL,
  mediaAlt,
  additionalBox,
  videoCover,
  downloadGif,
  imageURL,
  name,
}) => {
  return (
    <div className="list-gallery-item_wrapper" data-testid="test_listItem">
      <div className="list-gallery-item_content-wrapper">
        <div className="list-gallery-item_info-container">
          <h2 className="list-gallery-item_title" data-testid="test_item-title">
            {title}
          </h2>
          <h3
            className="list-gallery-item_subtitle"
            data-testid="test_item-subtitle"
          >
            {subtitle}
          </h3>
        </div>
        <div className="list-gallery-item_media-container">
          {videoCover ? <VideoCover videoCover={videoCover} /> : null}
          <img
            src={mediaURL}
            alt={mediaAlt}
            className="list-gallery-item_image"
            data-testid="test_item-image"
          />
          {additionalBox ? (
            <AdditionalBox
              downloadGif={downloadGif}
              imageURL={imageURL}
              name={name}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ListGalleryItem;
