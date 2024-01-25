const WritePage = () => {
  return (
    <div className=' p-[20px]'>
      <form action={'/api/post/write'} method='POST'>
        title:{' '}
        <input
          name='title'
          placeholder='글제목'
          className=' box-border p-[10px] block mb-[10px] border border-black'
        ></input>
        content:{' '}
        <input
          name='content'
          placeholder='글내용'
          className=' box-border p-[10px] block mb-[10px] border border-black'
        ></input>
        <button
          type='submit'
          className=' px-[10px] py-[15px] bg-gray-200 border-none roun-[5px]'
        >
          전송
        </button>
      </form>
    </div>
  );
};

export default WritePage;
