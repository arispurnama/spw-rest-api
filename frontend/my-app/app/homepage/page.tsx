import Card from "@/components/Card";
import Header from "@/components/Header";
import Image from 'next/image'

import Gambar from "@/public/images/gambar-bg-1.jpg";
import Footer from "@/components/Footer";

export default function homepage() {
    return (
        <>
            <div >
                <Header />
                <div className="relative min-h-screen flex flex-col items-center justify-center bg-teal-100">
                    <Image
                        src={Gambar}
                        alt="Picture of the author"
                        className="blur-sm h-screen"
                    />
                    <h6 className="absolute z-20 left-10 top-[30%] text-4xl text-white font-bold">SEKOLAH PENCETAK WIRAUSAHA</h6>
                    <div className="absolute z-20 left-10 top-[35%] text-white font-bold max-w-[60%]">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos, hic fuga quia veniam consectetur deserunt molestiae vero nobis minus voluptatibus itaque saepe maiores qui voluptas incidunt ab. Rem, temporibus eum.
                    </div>
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
