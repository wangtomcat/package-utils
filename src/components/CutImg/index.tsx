import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import ReactCrop from 'react-image-crop';
import { message, InputNumber, Modal } from 'antd';
import 'react-image-crop/dist/ReactCrop.css';

import styles from './index.module.scss';

interface IProps {
  handleCut?: Function;
  locked?: boolean;
}

enum enumWidthAndHeight {
  'width' = '宽度',
  'height' = '高度',
}

const Index = (props: IProps, ref) => {
  const { handleCut, locked = false } = props;
  let imageRef: any = useRef(null);
  let fileUrl: any = useRef(null);
  const [visible, setVisible] = useState(false);
  const [crop, setCrop] = useState<any>({
    x: 0,
    y: 0,
    width: 40,
    height: 40,
    unit: 'px',
  });
  const [src, setSrc] = useState('');
  const [croppedImageUrl, setCroppedImageUrl] = useState('');

  const show = src => {
    setSrc(src);
    setVisible(true);
  };

  const onCropComplete = crop => makeClientCrop(crop);
  const onCropChange = (crop, percentCrop) => setCrop(crop);
  const onImageLoaded = image => {
    imageRef['current'] = image;
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx?.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height,
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        // @ts-ignore
        blob.name = fileName;
        window.URL.revokeObjectURL(fileUrl?.current);
        fileUrl['current'] = window.URL.createObjectURL(blob);
        resolve(fileUrl?.current);
      }, 'image/jpeg');
    });
  };

  const makeClientCrop = async crop => {
    if (imageRef?.current && crop.width && crop.height) {
      const croppedImageUrl = (await getCroppedImg(imageRef?.current, crop, 'newFile.jpeg')) as string;
      setCroppedImageUrl(croppedImageUrl);
      return croppedImageUrl;
    }
    return '';
  };

  const hide = () => setVisible(false);

  const handleSetCrop = (key, value) => {
    if (imageRef?.current?.[key] < value) return message.error(`${enumWidthAndHeight[key]}超出可裁切的范围了`);
    setCrop({
      ...crop,
      [`${key}`]: value,
    });
  };

  useImperativeHandle(ref, (): any => ({
    show,
    hide,
  }));
  return (
    <Modal
      title="剪切图片"
      open={visible}
      onOk={async () => {
        const res = await makeClientCrop(crop);
        if (!res) return;
        handleCut?.(res);
        hide?.();
      }}
      onCancel={hide}
      className={styles.cutImgDialogWrap}
    >
      {locked ? (
        <div className="widthAndHeightWrap">
          <InputNumber
            addonBefore="width："
            onChange={v => handleSetCrop('width', v)}
            value={crop?.width}
            style={{ width: '160px', marginRight: '10px' }}
            controls={false}
          />
          <InputNumber
            addonBefore="height："
            onChange={v => handleSetCrop('height', v)}
            style={{ width: '160px' }}
            value={crop?.height}
            controls={false}
          />
        </div>
      ) : null}
      <ReactCrop className='ReactCrop' locked={locked} crop={crop} ruleOfThirds onComplete={onCropComplete} onChange={onCropChange}>
        <img
          src={src}
          alt=""
          onLoad={v => {
            onImageLoaded(v?.target);
          }}
        />
      </ReactCrop>
    </Modal>
  );
};

const ForwardIndex = forwardRef(Index);

export default ForwardIndex;