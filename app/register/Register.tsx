'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerType } from '@/util/typs';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import EmailCheck from './EmailCheck';

const Register = () => {
  const [submitBtn, setSubmitBtn] = useState(false);
  const router = useRouter();
  const {
    watch,
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<registerType>();
  const handler = (data: registerType) => {
    fetch('api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
        passwordCheck: data.passwordCheck,
        birthDate: data.birthDate,
        phoneNumber: data.phoneNumber,
      }),
    })
      .then(async (r) => {
        if (r.status === 409) {
          throw new Error(await r.json());
        }
        return r.json();
      })
      .then((r) => {
        router.push('/');
        alert(r);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
    <div className=' flex flex-col p-4 border border-gray-400 m-2 w-[500px]'>
      <form
        onSubmit={handleSubmit((data) => {
          handler(data);
        })}
      >
        <Input
          type='text'
          placeholder='이름'
          className=' my-2 border-gray-400'
          {...register('name', {
            required: '이름을 입력해주세요',
          })}
        />
        {errors.name && (
          <small className=' text-red-400'>
            {errors.name.message?.toString()}
          </small>
        )}
        <EmailCheck
          setSubmitBtn={setSubmitBtn}
          watch={watch}
          register={register}
          errors={errors}
        ></EmailCheck>

        <Input
          type='password'
          placeholder='비밀번호'
          className='  my-2 border-gray-400'
          {...register('password', {
            required: '비밀번호를 입력해주세요',
            pattern: /^(?=.*[a-z])(?=.*[\W_]).{8,}$/,
          })}
        />
        {errors.password &&
          (errors.password.type === 'required' ? (
            <small className=' text-red-400'>
              {errors.password.message?.toString()}
            </small>
          ) : (
            errors.password.type === 'pattern' && (
              <small className=' text-red-400'>
                비밀번호는 영어 소문자와 특수문자를 포함한 8자리
                이상이여야합니다!
              </small>
            )
          ))}
        <Input
          type='password'
          placeholder='비밀번호확인'
          className='  my-2 border-gray-400'
          {...register('passwordCheck', {
            required: '비밀번호확인을 입력해주세요',
            pattern: /^(?=.*[a-z])(?=.*[\W_]).{8,}$/,
          })}
        />
        {errors.passwordCheck &&
          (errors.passwordCheck.type === 'required' ? (
            <small className=' text-red-400'>
              {errors.passwordCheck.message?.toString()}
            </small>
          ) : (
            errors.passwordCheck.type === 'pattern' && (
              <small className=' text-red-400'>
                비밀번호는 영어 소문자와 특수문자를 포함한 8자리
                이상이여야합니다!
              </small>
            )
          ))}
        <Input
          type='number'
          placeholder='[선택] 생년월일 8자리'
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
        <Button
          variant={'outline'}
          type='submit'
          className=' w-fit border-gray-400 p-2 my-2 '
          disabled={isSubmitting || !submitBtn}
        >
          가입요청
        </Button>
      </form>
    </div>
  );
};

export default Register;
