import SEO from "@/components/SEO";
import { client } from "@/lib/prismic";
import { GetServerSideProps } from "next";
import React from "react";
import { Title } from "../styles/pages/Home";
import Prismic from "prismic-javascript";
import Link from "next/link";
import PrismicDOM from "prismic-dom";
import { Document } from "prismic-javascript/types/documents";

// interface IProduct {
//   id: string;
//   title: string;
// }
interface HomeProps {
  recommendedProducts: Document[];
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
          <Title>Products</Title>
          <ul>
            {recommendedProducts.map((recommendedProduct) => {
              return (
                <li key={recommendedProduct.id}>
                  <Link href={`/catalog/products/${recommendedProduct.uid}`}>
                    <a>
                      {PrismicDOM.RichText.asText(
                        recommendedProduct.data.title
                      )}
                    </a>
                  </Link>
                </li>
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
  const recommendedProducts = await client().query([
    Prismic.Predicates.at("document.type", "product"),
  ]);

  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
};
