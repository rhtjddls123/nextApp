'use client';

import { Button } from '@/components/ui/button';
import { postType } from '@/util/typs';
import { SignedPostPolicyV4Output } from '@google-cloud/storage';
import { UseFormRegister } from 'react-hook-form';
import { v4 } from 'uuid';
import Image from 'next/image';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  register: UseFormRegister<postType>;
  isSubmitting: boolean;
};

const ImageUpload = ({ register, isSubmitting }: Props) => {
  const [src, setSrc] = useState('');
  const [file, setFile] = useState<File>();
  const [res, setRes] = useState<SignedPostPolicyV4Output>();
  const [uuid] = useState<string>(v4());
  const formData = new FormData();
  return (
    <div>
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
            if (f) setSrc(URL.createObjectURL(f));
            else setSrc('');
          }
        }}
      ></input>
      {src && (
        <>
          <Image
            src={src}
            width={400}
            height={400}
            alt='img'
            className=' h-[100px] w-auto'
          ></Image>
          <div>{src}</div>
        </>
      )}
      {res && file && (
        <input
          value={`${res.url}${uuid}`}
          className=' hidden'
          {...register('img')}
        ></input>
      )}
      <Button
        variant={'secondary'}
        type='submit'
        className=' px-[10px] py-[15px]'
        disabled={isSubmitting}
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
      </Button>
    </div>
  );
};

export default ImageUpload;
