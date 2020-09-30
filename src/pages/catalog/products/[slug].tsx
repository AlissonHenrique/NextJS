import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();
  return <div>{router.query.slug}</div>;
}
