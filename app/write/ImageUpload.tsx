'use client';

import { SignedPostPolicyV4Output } from '@google-cloud/storage';
import { v4 } from 'uuid';
import Image from 'next/image';
import { useState } from 'react';

const ImageUpload = () => {
  const [src, setSrc] = useState('');
  const [file, setFile] = useState<File>();
  const [res, setRes] = useState<SignedPostPolicyV4Output>();
  const [uuid] = useState<string>(v4());
  const formData = new FormData();
  return (
    <>
      <input
        type='file'
        accept='image/*'
        className=' p-[10px] block mb-[10px] '
        onChange={async (e) => {
          if (e.target.files) {
            const f = e.target.files[0];
            setFile(f);
            const result = await fetch(`/api/post/image?file=${uuid}`);
            const tmp: SignedPostPolicyV4Output = await result.json();
            setRes(tmp);
            setSrc(URL.createObjectURL(f));
          }
        }}
      ></input>
      {src && (
        <Image
          src={src}
          width={400}
          height={400}
          alt='img'
          className=' h-[300px] w-auto'
        ></Image>
      )}
      {res && file && (
        <input
          name='img'
          value={`${res.url}${uuid}`}
          className=' hidden'
        ></input>
      )}
      <button
        type='submit'
        className=' px-[10px] py-[15px] bg-gray-200 border-none roun-[5px]'
        onClick={async () => {
          if (res && file) {
            Object.entries({ ...res.fields, file }).forEach(([key, value]) => {
              formData.append(key, value);
            });
            await fetch(res.url, {
              method: 'POST',
              body: formData,
            });
          }
        }}
      >
        전송
      </button>
    </>
  );
};

export default ImageUpload;
