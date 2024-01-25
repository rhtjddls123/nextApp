const JoinPage = () => {
  return (
    <div className=' p-[20px]'>
      <form action={'/api/post/join'} method='POST'>
        id:{' '}
        <input
          name='id'
          placeholder='id'
          className=' box-border p-[10px] block mb-[10px] border border-black'
        ></input>
        password:{' '}
        <input
          name='password'
          placeholder='password'
          type='password'
          className=' box-border p-[10px] block mb-[10px] border border-black'
        ></input>
        <button
          type='submit'
          className=' px-[10px] py-[15px] bg-gray-200 border-none roun-[5px]'
        >
          회원가입
        </button>
      </form>
    </div>
  );
};

export default JoinPage;
