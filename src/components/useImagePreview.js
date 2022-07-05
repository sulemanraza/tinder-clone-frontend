import { useEffect, useState } from "react";

const useImagePreview = (image) => {
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image, preview]);

  return preview;
};

export default useImagePreview;
