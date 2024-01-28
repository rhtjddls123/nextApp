'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerType } from '@/util/typs';
import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  register: UseFormRegister<registerType>;
  watch: UseFormWatch<registerType>;
  errors: FieldErrors<registerType>;
  setSubmitBtn: Dispatch<SetStateAction<boolean>>;
};

const EmailCheck = ({ register, watch, errors, setSubmitBtn }: Props) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handler = (data: string) => {
    if (!errors.email && data) {
      fetch('api/auth/userGet', {
        method: 'POST',
        body: JSON.stringify({
          email: data,
        }),
      })
        .then((r) => {
          if (r.status === 409) throw Error();
          return r.json();
        })
        .then((r) => {
          setSubmitBtn(true);
          alert(r);
        })
        .catch(() => {
          setSubmitBtn(false);
          alert('이미 사용중인 이메일입니다!');
        });
    }
  };
  return (
    <>
      <div className=' flex items-center'>
        <Input
          type='text'
          placeholder='이메일'
          className='my-2 mr-2 border-gray-400'
          {...register('email', {
            required: '이메일을 입력해주세요',
          })}
        />
        <Button
          variant={'outline'}
          type='button'
          onClick={() => {
            if (emailRegex.test(watch().email)) handler(watch().email);
          }}
          className=' border-gray-400 w-fit p-2'
        >
          중복확인
        </Button>
      </div>
      {(!watch().email && (
        <small className='  text-red-400'>이메일을 입력해주세요</small>
      )) ||
        (!emailRegex.test(watch().email) && (
          <small className='  text-red-400'>이메일을 바르게 입력해주세요</small>
        ))}
    </>
  );
};

export default EmailCheck;
