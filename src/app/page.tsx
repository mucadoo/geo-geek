import Image from 'next/image';
import Header from '@/components/Header';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container-custom">
      <Header />
      <main className="animate-in fade-in duration-1000 flex gap-10 items-center mt-12 card !p-10">
        <figure className="flex-1 overflow-hidden rounded-2xl shadow-lg border border-gray-100 group">
          <Image 
            src="/media/main_argentina.png" 
            alt="Main image" 
            width={460} 
            height={345}
            className="w-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        </figure>
        <article className="flex-1 flex flex-col items-start text-left">
          <h2 className="title !text-left !mb-5">About us</h2>
          <p className="text-lg leading-relaxed font-space text-gray-600 mb-8">
            Welcome to <strong className="text-[#1c2e36]">GeoGeek</strong>! Here we breathe geography. 
            Created with the intention of teaching a more interactive geography, GeoGeek has an explorers map that will allow the user to have a better knowledge of the world political territory, besides curiosity and geographical rankings. Do not waste time and start to explore!
          </p>
          <Link href="/map" className="btn-primary inline-flex items-center gap-2">
            Explore the Map →
          </Link>
        </article>
      </main>
    </div>
  );
}
