import { DataResponse, ImageData } from "./interfaces";

const PREFIX_PATH = "./assets/data/";
export const fetchImages = async (): Promise<ImageData[]> => {
  const listImage: DataResponse[] = await fetch("http://localhost:5000/", {
    method: "GET",
  }).then((res) => res.json());

  if (!listImage?.length) {
    return [];
  }

  const response: ImageData[] = listImage.map((item) => {
    return {
      id: item._id,
      label: item.label,
      path: PREFIX_PATH + item.sort_path,
    };
  });
  return response;
};

export const fetchImagesByKeywork = async (
  keywork: string
): Promise<ImageData[]> => {
  const listImage: DataResponse[] = await fetch(
    `http://localhost:5000/search-keywork?keywork=${keywork}`,
    {
      method: "GET",
    }
  ).then((res) => res.json());

  if (!listImage?.length) {
    return [];
  }

  const response: ImageData[] = listImage.map((item) => {
    return {
      id: item._id,
      label: item.label,
      path: PREFIX_PATH + item.sort_path,
    };
  });
  return response;
};

export const fetchSearchImages = async (image: File): Promise<ImageData[]> => {
  const formData = new FormData();
  formData.append("file", image);
  const listImage: DataResponse[] = await fetch(
    "http://localhost:5000/search",
    {
      method: "POST",
      body: formData,
    }
  ).then((res) => {
    if (!res?.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  });

  if (!listImage?.length) {
    return [];
  }

  const response: ImageData[] = listImage.map((item) => {
    return {
      id: item._id,
      label: item.label,
      path: PREFIX_PATH + item.sort_path,
    };
  });
  return response;
};

export const insertImages = async (image: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", image);
  const res = await fetch("http://localhost:5000/post", {
    method: "POST",
    body: formData,
  }).then((res) => {
    if (!res?.ok) {
      throw new Error("Something went wrong");
    }
    return res.json();
  });
  return res;
};
