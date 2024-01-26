'use client';

import { FieldErrors, UseFormRegister, UseFormWatch } from 'react-hook-form';
import { Dispatch, SetStateAction } from 'react';

type register = {
  name: string;
  email: string;
  password: string;
};

type Props = {
  register: UseFormRegister<register>;
  watch: UseFormWatch<register>;
  errors: FieldErrors<register>;
  setSubmitBtn: Dispatch<SetStateAction<boolean>>;
};

const EmailCheck = ({ register, watch, errors, setSubmitBtn }: Props) => {
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
      <div>
        <input
          type='text'
          placeholder='이메일'
          className=' border border-black p-2 m-2 w-44'
          {...register('email', {
            required: '이메일을 입력해주세요',
          })}
        />
        <button
          type='button'
          onClick={() => {
            handler(watch().email);
          }}
          className=' border border-black rounded-md w-fit p-2'
        >
          중복확인
        </button>
      </div>
      {!watch().email && (
        <small className='  text-red-400'>이메일을 입력해주세요</small>
      )}
    </>
  );
};

export default EmailCheck;
