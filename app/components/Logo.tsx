import Image from "next/image";


export default function Logo(){
  return(
    <a href="/" className="aspect-square w-8 relative">
      <Image src="/images/logo.png" fill alt="logo" />
    </a>
  )
}
