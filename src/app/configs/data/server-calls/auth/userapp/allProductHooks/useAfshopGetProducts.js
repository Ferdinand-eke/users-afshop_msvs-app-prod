import { useState } from 'react';
import productApiRepository from '../repositories/productsApiRepo/productApiRepository';



export default function useGetProducts() {
    const [loading, setLoading] = useState(false);
    const [productItems, setProductItems] = useState(null);
    const [product, setProduct] = useState(null);
    return {
        loading,
        productItems,
        product,
        setProductItems: (payload) => {
            setProductItems(payload);
        },

        setLoading: (payload) => {
            setLoading(payload);
        },

        getProducts: async (payload) => {
            setLoading(true);
            let responseData;

            if (payload) {
                // responseData = await ProductRepository.getProducts(payload);

                responseData = await productApiRepository.getServerProducts(payload);
            } else  {
                const queries = {
                    _limit: 12,
                };

                // responseData = await productApiRepository.getServerProducts(queries);
                responseData = await productApiRepository.getServerProducts();
            }
            console.log('ApiProducts__Payloads', responseData);

            if (responseData) {
                // console.log('ApiProductsPayloads', responseData);

                setProductItems(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },

        getProductById: async (payload) => {
            setLoading(true);
            // const responseData = await ProductRepository.getProductsById(
            //     payload
            // );
            const responseData = await productApiRepository.getProductsById(
                payload
            );
            if (responseData) {
                setProduct(responseData);
                setTimeout(
                    function () {
                        setLoading(false);
                    }.bind(this),
                    250
                );
            }
        },
    };
}
