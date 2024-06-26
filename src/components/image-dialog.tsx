import Image from 'next/image';
import { ReactNode } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '~/components/ui/dialog';

interface ImageDialogProps {
  trigger: ReactNode;
  image: string;
}

function ImageDialog({ trigger, image }: ImageDialogProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>

      <DialogContent className="w-[90dvw] p-1 lg:w-auto">
        <Image
          src={image}
          alt="full screen image"
          width={400}
          height={400}
          quality={100}
          className="w-full"
          priority
        />
      </DialogContent>
    </Dialog>
  );
}

export default ImageDialog;
