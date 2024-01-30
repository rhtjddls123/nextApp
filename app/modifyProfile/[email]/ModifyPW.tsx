'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { registerType } from '@/util/typs';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type Props = {
  user: string;
  setChangePW: Dispatch<SetStateAction<boolean>>;
};
const ModifyPW = ({ user, setChangePW }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<registerType & { curPW: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userData = JSON.parse(user) as registerType;
  const handler = (data: registerType & { curPW: string }) => {
    setIsSubmitting(true);
    const fetchData = {
      _id: data._id,
      password: data.password,
      passwordCheck: data.passwordCheck,
      curPW: data.curPW,
    };
    fetch('/api/auth/modifyPW', {
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
        setChangePW(false);
      })
      .catch((e) => {
        alert(e);
      });
  };
  return (
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
        type='password'
        placeholder='현재 비밀번호'
        className='  my-2 border-gray-400'
        {...register('curPW', {
          required: '비밀번호를 입력해주세요',
          pattern: /^(?=.*[a-z])(?=.*[\W_]).{8,}$/,
        })}
      />
      {errors.curPW &&
        (errors.curPW.type === 'required' ? (
          <small className=' text-red-400'>
            {errors.curPW.message?.toString()}
          </small>
        ) : (
          errors.curPW.type === 'pattern' && (
            <small className=' text-red-400'>
              비밀번호는 영어 소문자와 특수문자를 포함한 8자리 이상이여야합니다!
            </small>
          )
        ))}
      <Input
        type='password'
        placeholder='새 비밀번호'
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
              비밀번호는 영어 소문자와 특수문자를 포함한 8자리 이상이여야합니다!
            </small>
          )
        ))}
      <Input
        type='password'
        placeholder='새 비밀번호확인'
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
              비밀번호는 영어 소문자와 특수문자를 포함한 8자리 이상이여야합니다!
            </small>
          )
        ))}

      <div className=' mt-2'>
        <Button
          variant={'outline'}
          type='submit'
          disabled={isSubmitting}
          onClick={async () => {}}
        >
          변경
        </Button>
      </div>
    </form>
  );
};

export default ModifyPW;
