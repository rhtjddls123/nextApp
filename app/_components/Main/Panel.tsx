import { ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { connectDB } from '@/util/database';
import { postType } from '@/util/typs';
import { getServerSession } from 'next-auth';
import { PostListPanel } from './PostListPanel';

export async function Panel() {
  const db = (await connectDB).db('forum');
  const result = (await db.collection('post').find().toArray()) as postType[];
  const session = await getServerSession(authOptions);
  const r: postType[] = result.map((a: postType) =>
    JSON.parse(JSON.stringify(a))
  );

  return (
    <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
      <ResizablePanel defaultSize={0}>
        <div className='flex h-full items-center justify-center p-6 border border-black'>
          <span className='font-semibold'>One</span>
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={100}>
        <div className='flex h-full items-start justify-center p-6 border border-black'>
          <PostListPanel data={r}></PostListPanel>
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={0}>
        <div className='flex h-full items-center justify-center p-6 border border-black'>
          <span className='font-semibold'>One</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
