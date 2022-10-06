import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import {
  useProductsQuery,
  Product
} from "../graphql/generated";


interface HomeProps {
  products: Product[]
}

const Home = ({ products }: HomeProps) => {

  const { data, loading } = useProductsQuery({
    variables: {
      first: 10
    }
  })

  return (
    <div className={styles.container}>
      <p>Hello Shopify</p>
      {loading ? "carregando..." :
        <pre>{JSON.stringify(data?.products.edges[0].node.title, null, 2)}</pre>}
    </div>
  )
}


export async function getServerSideProps(ctx: any) {

  /* const { products } = await getAllProducts();

  console.log(products?.edges); */

  return {
    props: {
      products: [] //products?.edges
    },
  }
}


export default Home
