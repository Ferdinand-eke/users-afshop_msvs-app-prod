import {
    getTradehubs,
    getProdCats,
    getProducts,
    getProductById,
    getUserCartProductsById,
    getProductByCategory,
    getShopsByHubs,
    getServerMarketCategories,
    serializeQuery,
    trackUserOrderStatus,
    getFeaturedMarketCategories,
    getFeaturedProdCats,
    getAllProducts,
} from 'app/configs/data/client/RepositoryClient';
import { toast } from 'react-toastify';
// import Repository, { baseUrl, serializeQuery } from './Repository';

// import { getTradehubs } from "app/configs/data/client/RepositoryClient";

class ProductApiRepository {
    async getOrderSearchRecords(params) {
        const reponse = await trackUserOrderStatus(serializeQuery(params))
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({
                error: JSON.stringify(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
                ),
            }));
        return reponse;
    }

    //done
    async getRecords(params) {
        const reponse = await getProducts(serializeQuery(params))
            .then((response) => {
                return response.data.products;
            })
            .catch((error) => ({
                error: JSON.stringify(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
                ),
            }));
        return reponse;
    }
    //done

    async getServerProducts(params) {
        const reponse = await getAllProducts(params)
            .then((response) => {
                if (response.data && response.data.products.length > 0) {
                    return response.data.products;
                } else {
                    return null;
                }
            })

            .catch((error) => {
                console.log(
                    JSON.stringify(
                        error.response && error.response.data.message
                            ? error.response.data.message
                            : error.message
                    )
                );
                toast.error(error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message)
                return null;
            });
        return reponse;
    }
    //done
    async getHubs() {
        const reponse = await getTradehubs()
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({
                error: JSON.stringify(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
                ),
            }));
        return reponse;
    }
    //done

    async getApiProductCategories() {
        const reponse = await getProdCats()
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getApiFeaturedProductCategories() {
        const reponse = await getFeaturedProdCats()
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    // async getTotalRecords() {
    //     const reponse = await Repository.get(`${baseUrl}/products/count`)
    //         .then((response) => {
    //             return response.data;
    //         })
    //         .catch((error) => ({ error: JSON.stringify(error) }));
    //     return reponse;
    // }
    //done
    async getProductsById(payload) {
        const reponse = await getProductById(payload)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getArrayCartProductsById(payload) {
        const reponse = await getUserCartProductsById(payload)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({
                error: JSON.stringify(
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message
                ),
            }));
        return reponse;
        // });
    }

    //done
    async getApiProductByCategories(payload) {
        const reponse = await getProductByCategory(payload)
            .then((response) => {
                console.log('RelatedProducts1', response);
                console.log('RelatedProducts2', response.data);
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data;
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }
    //get Shops by Hub_ID
    async getApiShopsByHubs(payload) {
        const reponse = await getShopsByHubs(payload)
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data;
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    //Get Market  Categories getFeaturedMarketCategories getServerMarketCategories
    async getApiMarketCategories() {
        const reponse = await getServerMarketCategories()
            .then((response) => {
                return response.data.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new ProductApiRepository();
