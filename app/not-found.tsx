import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <p className="eyebrow">404</p>
      <h1 className="font-display mt-4 text-5xl text-teal md:text-7xl">
        Not found
      </h1>
      <p className="mt-6 text-base text-text-2">
        That page does not exist. Return{" "}
        <Link href="/" className="link-quiet underline">
          home
        </Link>
        .
      </p>
    </Container>
  );
}
