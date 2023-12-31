import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="wrapper flex-between flex-col gap-4 text-center sm:flex-row">
        <Link href="/">
          <Image src="/assets/images/logo.svg" alt="Evently logo" width={128} height={38} />
        </Link>

        <p>2024 Event. All Rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
