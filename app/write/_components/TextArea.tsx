import { Textarea } from '@/components/ui/textarea';

export function TextArea() {
  return (
    <Textarea
      name='content'
      placeholder='Tell us a little bit about yourself'
      className='resize-none border-2 grow-[4]'
    />
  );
}
