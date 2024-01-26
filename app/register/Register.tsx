'use client';

import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EmailCheck from './EmailCheck';

type register = {
  name: string;
  email: string;
  password: string;
};

const Register = () => {
  const [submitBtn, setSubmitBtn] = useState(false);
  const router = useRouter();
  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<register>();
  const handler = (data: register) => {
    fetch('api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    })
      .then((r) => {
        if (r.status === 409) throw Error();
        return r.json();
      })
      .then((r) => {
        router.push('/');
        alert(r);
      })
      .catch(() => {
        setSubmitBtn(false);
        alert('이메일 중복을 확인해주세요!');
      });
  };
  return (
    <form
      onSubmit={handleSubmit((data) => {
        handler(data);
      })}
    >
      <div className=' flex flex-col w-80 p-4 border border-black m-2'>
        <input
          type='text'
          placeholder='이름'
          className=' border border-black p-2 m-2 w-44'
          {...register('name', {
            required: '이름을 입력해주세요',
          })}
        />
        {errors.name && (
          <small className='  text-red-400'>
            {errors.name.message?.toString()}
          </small>
        )}
        <EmailCheck
          setSubmitBtn={setSubmitBtn}
          watch={watch}
          register={register}
          errors={errors}
        ></EmailCheck>

        <input
          type='password'
          placeholder='비번'
          className=' border border-black p-2 m-2 w-44'
          {...register('password', {
            required: '비밀번호를 입력해주세요',
          })}
        />
        {errors.password && (
          <small className=' text-red-400'>
            {errors.password.message?.toString()}
          </small>
        )}
        <button
          type='submit'
          className=' w-fit border rounded-md border-black p-2 m-2 '
          disabled={isSubmitting || !submitBtn}
        >
          id/pw 가입요청
        </button>
      </div>
    </form>
  );
};

export default Register;
