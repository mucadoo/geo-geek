import Image from 'next/image';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="container mx-auto">
      <Header />
      <main className="flex gap-[20px] items-start animate-in fade-in duration-1000">
        <figure className="w-[460px] m-[10px]">
          <Image 
            src="/media/main_argentina.png" 
            alt="Main image" 
            width={460} 
            height={345}
            className="border border-black rounded-[5px]"
          />
        </figure>
        <article className="w-[460px] m-[10px]">
          <h2 className="title text-left">About us</h2>
          <p className="big-text">
            Welcome to GeoGeek! Here we breathe geography. Created with the intention of teaching a more interactive geography, GeoGeek has explorers map that will allow the user to have a better knowledge of the world political territory, besides curiosity and geographical rankings. Do not waste time and start to explore!
          </p>
        </article>
      </main>
    </div>
  );
}
