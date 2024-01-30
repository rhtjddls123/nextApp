'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerType } from '@/util/typs';
import { SignedPostPolicyV4Output } from '@google-cloud/storage';
import { useForm } from 'react-hook-form';
import { v4 } from 'uuid';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ModifyPW from './ModifyPW';

type Props = {
  user: string;
};

const Modify = ({ user }: Props) => {
  const [src, setSrc] = useState('');
  const [file, setFile] = useState<File>();
  const [res, setRes] = useState<SignedPostPolicyV4Output>();
  const [uuid] = useState<string>(v4());
  const [changePW, setChangePW] = useState(false);
  const formData = new FormData();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userData = JSON.parse(user) as registerType;
  useEffect(() => {
    if (userData.image) setSrc(userData.image);
  }, [userData.image]);
  const handler = (data: registerType) => {
    setIsSubmitting(true);
    const fetchData = {
      _id: data._id,
      name: data.name,
      birthDate: data.birthDate,
      phoneNumber: data.phoneNumber,
      image: data.image,
    };
    console.log(fetchData);
    fetch('/api/auth/modify', {
      method: 'POST',
      body: JSON.stringify(fetchData),
    })
      .then(async (r) => {
        setIsSubmitting(false);
        if (r.status === 200) {
          return r.json();
        }
        throw new Error(await r.json());
      })
      .then(() => {
        router.back();
        router.refresh();
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <div className='  absolute -translate-x-1/2 left-1/2'>
      <div className=' flex flex-col p-4 border border-gray-400 m-2 w-[500px]'>
        {changePW ? (
          <ModifyPW user={user} setChangePW={setChangePW}></ModifyPW>
        ) : (
          <form
            onSubmit={handleSubmit((data) => {
              handler(data);
            })}
            className='h-full flex flex-col'
          >
            <input
              value={userData._id.toString()}
              className=' hidden'
              {...register('_id')}
            ></input>
            <Input
              placeholder={'이름을 입력해주세요'}
              defaultValue={userData.name}
              className=' my-2 border-gray-400'
              {...register('name', {
                required: true,
              })}
            ></Input>
            <div className='flex justify-between'>
              <input
                type='file'
                accept='image/*'
                className=' p-[10px] block mb-[10px] '
                onChange={async (e) => {
                  if (e.target.files) {
                    const f = e.target.files[0];
                    console.log(f);
                    setFile(f);
                    const result = await fetch(`/api/post/image?file=${uuid}`);
                    const tmp: SignedPostPolicyV4Output = await result.json();
                    setRes(tmp);
                    if (f) setSrc(URL.createObjectURL(f));
                    else setSrc(userData.image || '');
                  }
                }}
              ></input>
              {src && (
                <Image
                  src={src}
                  width={400}
                  height={400}
                  alt='img'
                  className=' h-[100px] w-auto'
                ></Image>
              )}
              {res && file && (
                <input
                  value={`${res.url}${uuid}`}
                  className=' hidden'
                  {...register('image')}
                ></input>
              )}
            </div>
            <Input
              type='number'
              placeholder='[선택] 생년월일 8자리'
              defaultValue={userData.birthDate}
              className='  my-2 border-gray-400'
              {...register('birthDate', {
                pattern: /^\d{8}$/,
              })}
            />
            {errors.birthDate && errors.birthDate.type === 'pattern' && (
              <small className=' text-red-400'>
                생년월일은 8자리 숫자로 입력해 주세요.
              </small>
            )}
            <Input
              placeholder='[선택] 휴대전화번호( - 생략)'
              defaultValue={userData.phoneNumber}
              className='  my-2 border-gray-400'
              {...register('phoneNumber', {
                pattern: /^01[016789]\d{4}\d{4}$/,
              })}
            />
            {errors.phoneNumber && errors.phoneNumber.type === 'pattern' && (
              <small className=' text-red-400'>
                전화번호를 바르게 입력해주세요
              </small>
            )}
            <div className=' mt-2 flex justify-between'>
              <Button
                variant={'outline'}
                type='submit'
                disabled={isSubmitting}
                onClick={async () => {
                  if (res && file) {
                    Object.entries({ ...res.fields, file }).forEach(
                      ([key, value]) => {
                        formData.append(key, value);
                      }
                    );
                    await fetch(res.url, {
                      method: 'POST',
                      body: formData,
                    });
                  }
                }}
              >
                변경
              </Button>
              <Button
                variant={'outline'}
                type='button'
                onClick={() => {
                  setChangePW(true);
                }}
              >
                비밀번호 변경
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modify;
