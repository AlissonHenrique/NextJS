import { useRouter } from "next/router";
import { useState } from "react";

import dynamic from "next/dynamic";

const AddToCardModal = dynamic(
  () => import("../../../components/AddToCardModal"),
  { loading: () => <p>Loading...</p>, ssr: false }
);
export default function Product() {
  const router = useRouter();
  const [isAddToCardVisible, setIsAddToCardVisible] = useState(false);
  function handleAddToCard() {
    setIsAddToCardVisible(true);
  }

  return (
    <>
      <h1>{router.query.slug}</h1>

      <button onClick={handleAddToCard}>Add to card</button>

      {isAddToCardVisible && <AddToCardModal />}
    </>
  );
}
