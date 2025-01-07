import NavLinkAdapter from '@fuse/core/NavLinkAdapter';
import { Typography } from '@mui/material';
import useProductCats from 'app/configs/data/server-calls/product-categories/useProductCategories'
import React from 'react'
import { useParams } from 'react-router'

const CategoryAndTradehub = () => {
    const routeParams = useParams();
    const { id } = routeParams;

    const {data:categories, isLoading} = useProductCats()


  

    let categoriesView;
    if (!isLoading) {
        if (categories?.data?.data && categories?.data?.data.length > 0) {
            const items = categories?.data?.data.map((item) => (
                <li key={item._id} className={item._id === id ? 'relative bg-orange-100 rounded-md hover:bg-orange-300 py-1 px-4 cursor-pointer'
                 : 'relative bg-white rounded-md hover:bg-orange-300 py-1 px-4 cursor-pointer'}>
                    <Typography
                    //  href={`/afshopcategory/${item._id}`}
                    component={NavLinkAdapter}
                    to={`/marketplace/products/${item?._id}/by-category`}
                     >
                        {item.name}
                    </Typography>
                </li>
            ));
            categoriesView = <ul className="space-y-2 p-4">{items}</ul>;
        } else {
        }
    } else {
        categoriesView = <p>Loading...</p>;
    }

  return (
<>
<h2 className="font-bold mb-4 p-4">CATEGORY</h2>
                {/* <ul className="space-y-2 p-4">
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Computing</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Electronics</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Phones & Tablets</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Home & Office</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Automobile</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Computing</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Electronics</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Phones & Tablets</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Home & Office</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Automobile</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Computing</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Electronics</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Phones & Tablets</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Home & Office</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Automobile</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Computing</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Electronics</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Phones & Tablets</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Home & Office</li>
                  <li className='relative bg-white rounded-md hover:bg-orange-100 py-1 px-4 cursor-pointer'>Automobile</li>
                </ul> */}

                {categoriesView}
</>
  )
}

export default CategoryAndTradehub