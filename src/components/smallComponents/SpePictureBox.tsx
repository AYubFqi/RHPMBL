import { useState } from "react";
import "./css/spepicturebox.scss";
import profil from '../../css/img/Profil.png'
interface propsF {
  id: any;
  className?: string;
  img: any;
  alt: string;
  onChange?: any;
  style?: any;
}
const SpePictureBox = ({
  id,
  className,
  img,
  alt,
  onChange,
  style,
}: propsF) => {
  const [image, setImage] = useState(img);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const onLoad = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setWidth(event.currentTarget.naturalWidth);
    setHeight(event.currentTarget.naturalHeight);
  };

  return (
    <div id="spePictureBox" style={{ ...style }}>
      <img
        src={profil}
        alt={alt}
        onLoad={onLoad}
      />
    </div>
  );
};

export default SpePictureBox;
