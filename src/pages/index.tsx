import SEO from "@/components/SEO";
import { GetServerSideProps } from "next";
import React from "react";
import { Title } from "../styles/pages/Home";

interface IProduct {
  id: string;
  title: string;
}
interface HomeProps {
  recommendedProducts: IProduct[];
}
export default function Home({ recommendedProducts }: HomeProps) {
  async function handleSum() {
    const math = (await import("../lib/math")).default;
    alert(math.sum(3, 5));
  }
  return (
    <>
      <div>
        <SEO title="You ecomerce" sholdExcludeTitleSuffix />
        <section>
          <Title>Hello</Title>
          <ul>
            {recommendedProducts.map((recommendedProduct) => {
              return (
                <li key={recommendedProduct.id}>{recommendedProduct.title}</li>
              );
            })}
          </ul>
        </section>
      </div>
      <button onClick={handleSum}>Sum</button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const response = await fetch(`${process.env.API_URL}/recommended`);
  const recommendedProducts = await response.json();

  return {
    props: {
      recommendedProducts,
    },
  };
};
