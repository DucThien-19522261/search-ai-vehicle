import { ReactElement } from "react";
import { ImageContainerStyled } from "./ImageContainer.style";
import { CloudFilled, LoadingOutlined } from "@ant-design/icons";
import { Flex } from "antd";

type ImageContainerProps = {
  images: any[] | undefined;
  loading: boolean;
  isInValidSearch: boolean;
};

export const ImageContainer = (props: ImageContainerProps): ReactElement => {
  const { images, loading, isInValidSearch } = props;

  if (loading) {
    return (
      <ImageContainerStyled>
        <div className="loading">
          <LoadingOutlined className="loading-icon" />
        </div>
      </ImageContainerStyled>
    );
  }

  if (isInValidSearch) {
    return (
      <ImageContainerStyled>
        <div className="no-data">
          Sorry, your input photo may not be a vehicle!
        </div>
      </ImageContainerStyled>
    );
  }

  return (
    <ImageContainerStyled>
      {!loading && !images?.length ? (
        <div className="no-data">
          <CloudFilled className="cloud-icon" />
          <div>No data</div>
        </div>
      ) : (
        <div className="list-image-container">
          <Flex wrap="wrap" gap="small" align="center">
            {images?.map((image, index) => {
              return <img alt="vehicle" src={image} />;
            })}
          </Flex>
        </div>
      )}
    </ImageContainerStyled>
  );
};
