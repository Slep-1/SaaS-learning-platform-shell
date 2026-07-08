import Image from 'next/image';
import wordmark from '@/public/assets/images/wordmark-final@2x.png';

export const Logo = () => (
  <Image
    src={wordmark}
    alt="myLearning"
    width={517}
    height={130}
    className="h-9 w-auto"
    priority
  />
);
