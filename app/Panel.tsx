import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';

export function Panel() {
  return (
    <ResizablePanelGroup direction='horizontal' className='rounded-lg border'>
      <ResizablePanel defaultSize={20}>
        <div className='flex h-full items-center justify-center p-6 border border-black'>
          <span className='font-semibold'>One</span>
        </div>
      </ResizablePanel>
      <ResizablePanel defaultSize={50}>
        <ResizablePanelGroup direction='vertical'>
          <ResizablePanel defaultSize={25}>
            <div className='flex h-full items-center justify-center p-6 border border-black'>
              <span className='font-semibold'>Two</span>
            </div>
          </ResizablePanel>
          {/* <ResizableHandle /> */}
          <ResizablePanel defaultSize={75}>
            <div className='flex h-full items-center justify-center p-6 border border-black'>
              <span className='font-semibold'>Three</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
      <ResizablePanel defaultSize={20}>
        <div className='flex h-full items-center justify-center p-6 border border-black'>
          <span className='font-semibold'>One</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
