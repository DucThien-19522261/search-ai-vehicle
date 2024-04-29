import { useEffect, useMemo, useState } from "react";
import { AppStyled } from "./App.style.tsx";
import { ImageContainer } from "./containers/ImageContainer/ImageContainer.tsx";
import { SideBar } from "./containers/SideBar/SideBar.tsx";
import {
  fetchImages,
  fetchImagesByKeywork,
  fetchSearchImages,
  insertImages,
} from "./service/service-image.ts";
import { ImageData } from "./service/interfaces.ts";

function App() {
  const [images, setImages] = useState<ImageData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchImage, setSearchImage] = useState<File | null>();
  const [isInValidSearch, setIsInvalidSearch] = useState<boolean>(false);
  const [vehicleType, setVehicleType] = useState<string>("");
  const [doneInsert, setDoneInsert] = useState<boolean>(false);

  const fetchImage = async () => {
    setLoading(true);
    setIsInvalidSearch(false);
    try {
      const response = await fetchImages();
      if (!response) return;
      setImages(response);
    } finally {
      setLoading(false);
    }
  };

  const onSearchImage = async (image: File) => {
    setLoading(true);
    setIsInvalidSearch(false);
    try {
      const response = await fetchSearchImages(image);
      if (!response?.length) return;
      setImages(response);
      setVehicleType(response[0]?.label);
    } catch (error) {
      setIsInvalidSearch(true);
      // alert("I think this is not a photo of a vehicle!");
    } finally {
      setLoading(false);
    }
  };

  const onInsert = async (image: File): Promise<void> => {
    try {
      const res = await insertImages(image);
      setDoneInsert(true);
      console.log(res);
    } catch (error) {
      if (error) {
        alert("Sorry, your input photo may not be a vehicle!");
      }
    } finally {
      if (doneInsert) {
        fetchImage();
      }
    }
  };

  const onClearAfterInsert = (): void => {
    setDoneInsert(false);
  };

  useEffect(() => {
    if (!searchImage) {
      Promise.all([fetchImage()]);
    } else {
      Promise.all([onSearchImage(searchImage)]);
    }
  }, [searchImage]);

  const onSearch = (image: File): void => {
    setSearchImage(image);
  };

  const imageFiles = useMemo(() => {
    if (!images?.length) return [];
    const listFile: File[] = [];
    images?.forEach((image) => {
      const targetImage = require(`${image.path}`);
      listFile.push(targetImage);
    });
    return listFile;
  }, [images]);

  const onFilter = async (keywork: string): Promise<void> => {
    if (!keywork) {
      await fetchImage();
      return;
    }
    setLoading(true);
    try {
      const response = await fetchImagesByKeywork(keywork);
      if (!response?.length) return;
      setImages(response);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppStyled>
      <div className="body">
        <div className="side-bar">
          <h1 className="header">Vehicle photos</h1>
          <SideBar
            onSearch={onSearch}
            onClear={(): void => setSearchImage(null)}
            onInsert={onInsert}
            doneInsert={doneInsert}
            vehicleType={vehicleType}
            onClearAfterInsert={onClearAfterInsert}
            onFilter={onFilter}
          />
        </div>
        <ImageContainer
          images={imageFiles || []}
          loading={loading}
          isInValidSearch={isInValidSearch}
        />
      </div>
    </AppStyled>
  );
}

export default App;
