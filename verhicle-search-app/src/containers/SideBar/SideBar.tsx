import { UploadOutlined } from "@ant-design/icons";
import { ReactElement, useEffect, useState } from "react";
import { SideBarStyled } from "./SideBar.style";
import { Select } from "antd";

type SideBarProps = {
  onSearch: (image: File) => void;
  onClear: () => void;
  onInsert: (image: File) => void;
  doneInsert: boolean;
  vehicleType: string;
  onClearAfterInsert: () => void;
  onFilter: (keywork: string) => Promise<void>;
};

export const SideBar = (props: SideBarProps): ReactElement => {
  const {
    onSearch,
    onClear,
    onInsert,
    doneInsert,
    vehicleType,
    onClearAfterInsert,
    onFilter,
  } = props;
  const [selectedImage, setSelectedImage] = useState<File | null>();
  const [selectedInsertImage, setSelectedInsertImage] = useState<File | null>();
  const [type, setType] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<string>("");

  useEffect(() => {
    setType(vehicleType);
  }, [vehicleType]);

  const uploadElement = document.getElementById(
    "upload-img"
  ) as HTMLInputElement;
  const handleUploadImage = () => {
    uploadElement?.click();
  };
  const onSelectImage = (event: any): void => {
    setSelectedItems("");
    if (!event.target.files) return;
    setSelectedImage(event.target.files[0]);
  };

  const handleClear = (): void => {
    setSelectedImage(null);
    setType("");
    uploadElement.value = "";
    onClear();
  };

  const handleSubmit = (): void => {
    setType("");
    if (!selectedImage) return;
    onSearch(selectedImage);
  };
  ////////////////////////////////////////////////////

  const uploadInsertElement = document.getElementById(
    "upload-insert-img"
  ) as HTMLInputElement;
  const handleUploadInsertImage = () => {
    uploadInsertElement?.click();
  };
  const onSelectInsertImage = (event: any): void => {
    if (!event.target.files) return;
    setSelectedInsertImage(event.target.files[0]);
  };

  const handleClearInsert = (): void => {
    setSelectedInsertImage(null);
    uploadInsertElement.value = "";
  };

  useEffect(() => {
    if (doneInsert) {
      handleClearInsert();
      onClearAfterInsert();
    }
  }, [doneInsert]);

  const handleSubmitInsert = (): void => {
    setSelectedItems("");
    if (!selectedInsertImage) return;
    handleClear();
    onInsert(selectedInsertImage);
    if (doneInsert) {
      handleClearInsert();
      setSelectedInsertImage(null);
    }
  };

  const filteredOptions = [
    {
      label: "SUV",
      value: "SUV",
    },
    {
      label: "Bus",
      value: "bus",
    },
    {
      label: "Family sedan",
      value: "family sedan",
    },
    {
      label: "Fire engine",
      value: "fire engine",
    },
    {
      label: "Heavy truck",
      value: "heavy truck",
    },
    {
      label: "Jeep",
      value: "jeep",
    },
    {
      label: "Minibus",
      value: "minibus",
    },
    {
      label: "Racing car",
      value: "racing car",
    },
    {
      label: "Taxi",
      value: "taxi",
    },
    {
      label: "Truck",
      value: "truck",
    },
  ];

  const onFilterKeywork = (value: string): void => {
    setSelectedItems(value);
    onFilter(value);
    handleClearInsert();
    // clear search
    setSelectedImage(null);
    setType("");
    uploadElement.value = "";
  };

  return (
    <SideBarStyled>
      <div id="filter" className="title filter-bar">
        Filter:
        <Select
          className="filter"
          placeholder="Inserted are removed"
          value={selectedItems}
          onChange={onFilterKeywork}
          options={filteredOptions}
          getPopupContainer={() =>
            document.getElementById("filter") as HTMLElement
          }
          allowClear
        />
      </div>
      <hr />
      <div className="title">
        Search image:{" "}
        {selectedImage && type ? (
          <span className="label-type">"{type}"</span>
        ) : null}
      </div>
      {selectedImage ? (
        <div className="img-preview">
          <img alt="preview" src={URL.createObjectURL(selectedImage)} />
          <div className="change-img">
            <div className="change" onClick={handleUploadImage}>
              Change
            </div>
            <div className="clear" onClick={handleClear}>
              Remove
            </div>
          </div>
        </div>
      ) : (
        <div className="upload" onClick={handleUploadImage}>
          <UploadOutlined className="upload-icon" />
          <div className="upload-text">Upload Image</div>
        </div>
      )}
      <input
        className="btn-upload"
        type="file"
        id="upload-img"
        name="upload-img"
        accept="image/*"
        onChange={onSelectImage}></input>
      <div
        className={selectedImage ? "allow-search-btn" : "disabled-search-btn"}>
        <button disabled={!selectedImage} onClick={handleSubmit}>
          Search
        </button>
      </div>

      <div className="insert-title title">Insert image:</div>
      {selectedInsertImage ? (
        <div className="img-preview">
          <img alt="preview" src={URL.createObjectURL(selectedInsertImage)} />
          <div className="change-img">
            <div className="change" onClick={handleUploadInsertImage}>
              Change
            </div>
            <div className="clear" onClick={handleClearInsert}>
              Remove
            </div>
          </div>
        </div>
      ) : (
        <div className="upload" onClick={handleUploadInsertImage}>
          <UploadOutlined className="upload-icon" />
          <div className="upload-text">Upload Image</div>
        </div>
      )}
      <input
        className="btn-upload"
        type="file"
        id="upload-insert-img"
        name="upload-img"
        accept="image/*"
        onChange={onSelectInsertImage}></input>
      <div
        className={
          selectedInsertImage
            ? "allow-search-btn allow-insert-btn"
            : "disabled-search-btn"
        }>
        <button disabled={!selectedInsertImage} onClick={handleSubmitInsert}>
          Insert Image
        </button>
      </div>
    </SideBarStyled>
  );
};
