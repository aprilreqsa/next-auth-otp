import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="flex h- items-center justify-between p-4 bg-gray-800 text-white">
      <Link className="text-white" href="/dashboard">Dashboard</Link>
      <Link className="text-white" href="/signin">Sign In</Link>
      </header>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <Image height={400} width={400} src="/assets/gyokeres.jpg" alt="gyokeres"/>
        <div className="p-8">
          <h1 className="font-bold text-2xl">Arsenal RESMI Kontrak Viktor Gyokeres, Mikel Arteta: Pemain Cerdas Di Kotak Penalti</h1>
          <p className="font-medium text-xl">Arsenal telah mengonfirmasi perekrutan Viktor Gyokeres dari Sporting CP dengan durasi kontrak jangka panjang.</p>
          <ul>
            <li>Arsenal merekrut pemain internasional Swedia</li>
            <li>Viktor Gyokeres teken kontrak jangka panjang</li>
            <li>Sang striker akan mengenakan nomor punggung 14</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
