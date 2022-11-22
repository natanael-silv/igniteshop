import { GetServerSideProps } from "next";
import Image from "next/image";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import Link from "next/link";
import { ImageContainer, SuccessContainer } from "../styles/pages/success";
import { Product } from "../styles/pages/home";

interface SuccessProps {
  costumerName: string;
  product: {
    name: string;
    imageUrl: string;
  };
}
export default function Success({ costumerName, product }: SuccessProps) {
  return (
    <SuccessContainer>
      <h1>Compra efetuada</h1>

      <ImageContainer>
        <Image src={product.imageUrl} width={120} height={110} alt="" />
      </ImageContainer>

      <p>
        <strong>Natanael Silva</strong>, sua <strong>Camiseta</strong> já esta a
        caminho da sua casa.
      </p>

      <Link href="/">Voltar ao catálogo</Link>
    </SuccessContainer>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ["line_items", "line_items.data.price.product"],
  });

  const costumerName = session.customer_details?.name;
  const product = session.line_items?.data[0].price?.product as Stripe.Product;

  return {
    props: {
      costumerName,
      product: {
        name: product.name,
        imageUrl: product.images[0],
      },
    },
  };
};
