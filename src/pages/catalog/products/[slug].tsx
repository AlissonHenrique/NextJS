import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

import { client } from "@/lib/prismic";
import { Document } from "prismic-javascript/types/documents";

import PrismicDOM from "prismic-dom";

interface ProductProps {
  product: Document;
}
export default function Product({ product }: ProductProps) {
  const router = useRouter();
  if (router.isFallback) {
    return <p> Carregando...</p>;
  }

  return (
    <>
      <h1>{PrismicDOM.RichText.asText(product.data.title)}</h1>

      <div
        dangerouslySetInnerHTML={{
          __html: PrismicDOM.RichText.asHtml(product.data.description),
        }}
      ></div>
      <img src={product.data.url} width="600" alt="camisa" />
      <p>Price: ${product.data.price}</p>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<ProductProps> = async (context) => {
  const { slug } = context.params;
  const product = await client().getByUID("product", String(slug), {});

  return {
    props: {
      product,
    },
    revalidate: 10,
  };
};
