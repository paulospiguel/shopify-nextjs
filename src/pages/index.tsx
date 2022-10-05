import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'

import { getAllProducts } from '../services/products/getAllProducts'


interface HomeProps {
  products: any[]
}

const Home = ({ products }: HomeProps) => {
  return (
    <div className={styles.container}>
      {JSON.stringify(products, null, 2)}
    </div>
  )
}


export async function getServerSideProps(ctx: any) {

  const { products } = await getAllProducts();

  console.log(products?.edges);

  return {
    props: {
      products: products?.edges
    },
  }
}


export default Home
