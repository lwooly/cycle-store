import Product from '@/components/Product';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import React from 'react';
import { getProductFromDB, getProductsFromDB } from '@/lib/api-functions/server/products/queries';
const hyphenate = (str) => str.replaceAll(" ", "-");
const slugify = (str, id) => `${hyphenate(str).toLowerCase()}-${id}`;

const SingleProduct = ({ssd}) => {

    return (
        <div>
            <ErrorBoundary>
                <Product values={ssd} headingLevel='h1'/>
            </ErrorBoundary>
        </div>
    );
};

export default SingleProduct;

export const getStaticPaths = async () => {
    const products = await getProductsFromDB().catch((err) => console.log(`this error`, err))
    //get paths from products
    const paths = products.map(product => ({
        params: {
            slug: slugify(product.title, product.id),
        }
    }
    ));

    return {paths, fallback: 'blocking'};
};

export const getStaticProps = async ({params: {slug}}) => {
    console.log('slug', slug);
    const id = slug.split('-').at(-1)
    const product = await getProductFromDB(id).catch((err) => {console.log(err)})
    return {
        props: {
            ssd: JSON.parse(JSON.stringify(product))
        }
    }
}