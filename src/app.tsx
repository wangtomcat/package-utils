import { Button } from "antd";
import React, { useRef } from "react";
import CutImg from '@/components/CutImg'
import Editor from '@/components/Editor'

const data = `
import { Button } from "antd";
import React, { useRef } from "react";
import CutImg from '@/components/CutImg'
import Editor from '@/components/Editor'

const Index = props => {
  const cutImgRef: React.RefObject<{ show: Function, hide: Function }> = useRef(null)
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        cutImgRef?.current?.show(reader?.result);
      };
    }
  };
`

const Index = props => {
  const cutImgRef: React.RefObject<{ show: Function, hide: Function }> = useRef(null)
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        cutImgRef?.current?.show(reader?.result);
      };
    }
  };

  return <div>
    <a href="http://www.taobao.com" target="_blank" rel="noopener noreferrer">url</a>
    <Button type='primary'>45rfcdx</Button>
    <input type="file" accept="image/*" onChange={onSelectFile} />
    <CutImg locked ref={cutImgRef} handleCut={(v) => { console.log(v, "45r") }} />
    <div style={{ height: '400px' }} >
      <Editor value={data} />
    </div>
  </div>
}

export default Index