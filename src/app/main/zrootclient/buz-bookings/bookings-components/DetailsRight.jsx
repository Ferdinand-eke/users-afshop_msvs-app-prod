import { Box, Button, Grid, Paper, Typography } from '@mui/material'
import React, { lazy, useMemo, useState } from 'react'
import FontAwesome from 'react-fontawesome'
import { ListingReservation } from './reservationreview'
import { Link } from 'react-router-dom'
import { formatCurrency } from 'src/app/main/vendors-shop/pos/PosUtils'
// import { UilHeart, UilShareAlt, UilShoppingBag } from '@iconscout/react-unicons'





const DetailsRight = React.memo(
    
    ({
        listing,
        locationValue,
        coordinates,
        price,
        totalPrice,
        onChangeDate,
        dateRange,
        onSubmit,
        disabled,
        disabledDates,
    }) => {
        const Map = useMemo(
            () => lazy(() => import('../bookings-components/map')),
            [locationValue]
        )

        // const dispatch = useDispatch()
        const [state, setState] = useState({
            quantity: 1,
        })

        // const { name, rate, price, oldPrice, description, category, brand, popular, id } = listing;
        const { quantity } = state

        // const incrementQuantity = (e) => {
        //     e.preventDefault()
        //     setState({
        //         ...state,
        //         quantity: quantity + 1,
        //     })
        // }

        
        // const decrementQuantity = (e) => {
        //     e.preventDefault()
        //     if (quantity !== 1)
        //         setState({
        //             ...state,
        //             quantity: quantity - 1,
        //         })
        // }

        return (
            <div>
                <Box>
                    <Paper className="lg:mb-5">
                        <Typography
                            className="mx-8 mb-[10px] text-dark dark:text-white/[.87] text-xl lg:text-[16px] sm:text-2xl font-semibold"
                       
                        >
                            {listing?.title}
                        </Typography>
                        {/* <Rate
                            className="relative -top-[2px] ltr:[&>li]:mr-0.5 rtl:[&>li]:ml-0.5 [&>.ant-rate-star>div>div>span>svg]:w-[14px] [&>.ant-rate-star>div>div>span>svg]:h-[14px] [&>.ant-rate-star-full>div>div>span>svg]:text-warning  [&>.ant-rate-star-half>div>.ant-rate-star-first>span>svg]:text-warning [&>.ant-rate-star-half>div>.ant-rate-star-second>span>svg]:text-[#c6d0dc] [&>.ant-rate-star-zero>div>div>span>svg]:text-[#c6d0dc]"
                            allowHalf
                            defaultValue={listing?.rate}
                            disabled
                        /> */}
                        {/* <span className="inline-block ltr:mr-1 ltr:ml-2 rtl:ml-1 rtl:mr-2 text-dark dark:text-white/[.87] text-[15px] font-semibold">
                            {listing?.rate}
                        </span>
                        <span className="font-normal text-light dark:text-white/60">
                            {' '}
                            778 Reviews
                        </span>
                        <p>
                            <span className="inline-block ltr:mr-1.5 rtl:ml-1.5 mb-2 text-light dark:text-white/60 text-[13px]">
                                Brand :
                            </span>
                            <span className="text-dark dark:text-white/[.87] text-[13px] font-medium">
                                {listing?.brand}
                            </span>
                        </p> */}
                        {/* <Typography
                            className="text-dark dark:text-white/[.87] mt-[18px] mb-2 text-[22px] font-medium"
                            // as="h3"
                        >
                            <span className="text-sm text-light dark:text-white/60">
                            ₦
                            </span>
                            <span>
                                {formatCurrency(listing?.price)}{' '}
                                <span className="text-sm ltr:ml-1.5 rtl:mr-1.5 text-light dark:text-white/30 font-normal">
                                    {' '}
                                    per night
                                </span>
                            </span>
                        </Typography>
                        {listing?.oldPrice && (
                            <Typography
                                className="text-dark dark:text-white/[.87] mb-[22px] font-semibold inline-flex items-center"
                                as="h6"
                            >
                                <del className="text-base font-normal text-light dark:text-white/60">
                                ₦{formatCurrency(listing?.oldPrice)}
                                </del>{' '}
                                <span className="inline-block text-xs ltr:ml-2 rtl:mr-2 text-primary">
                                    30% Off
                                </span>
                            </Typography>
                        )} */}
                    
                        

                        {/* <div className="flex items-center flex-wrap mb-7 pb-[30px] border-b border-regular dark:border-white/10 gap-[10px]">
                            <div className="flex flex-wrap items-center gap-[10px]">
                                <Button
                                    onClick={() =>
                                        {}
                                    }
                                    className={` inline-flex items-center justify-center bg-white dark:bg-white/10 w-[40px] h-[40px] ltr:mr-[10px] rtl:ml-[10px] border-none rounded-full shadow-[0_5px_10px_rgba(160,160,260,0.13)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] ${
                                        listing?.popular
                                            ? 'text-danger'
                                            : 'text-body dark:text-white/60'
                                    } `}
                                    size="default"
                                    raised
                                    type="white"
                                    shape="circle"
                                >
                                    {listing?.popular ? (
                                        <ReactSVG
                                            src={`/hexadash-nextjs/img/icon/heart-fill.svg`}
                                        />
                                    ) : (
                                        <UilHeart className="w-[14px] h-[14px]" />
                                    )}
                                </Button>
                                <Button
                                    size="default"
                                    raised
                                    type="white"
                                    shape="circle"
                                    className="inline-flex items-center justify-center bg-white dark:bg-white/10 text-body dark:text-white/60 w-[40px] h-[40px] ltr:mr-[10px] rtl:ml-[10px] border-none rounded-full shadow-[0_5px_10px_rgba(160,160,260,0.13)] dark:shadow-[0_5px_30px_rgba(1,4,19,.60)]"
                                >
                                    <UilShareAlt className="w-[14px] h-[14px]" />
                                </Button>
                            </div>
                            <div className="ltr:ml-[5px] rtl:mr-[5px]">
                                <Link
                                    href="#"
                                    className="ltr:mr-3 rtl:ml-3 group"
                                >
                                    <FontAwesome
                                        className="text-sm text-[#666] dark:text-white/60 group-hover:text-[#8231d3]"
                                        name="facebook"
                                        size="2x"
                                        style={{
                                            textShadow:
                                                '0 1px 0 rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="ltr:mr-3 rtl:ml-3 group"
                                >
                                    <FontAwesome
                                        className="text-sm text-[#666] dark:text-white/60 group-hover:text-[#8231d3]"
                                        name="twitter"
                                        size="2x"
                                        style={{
                                            textShadow:
                                                '0 1px 0 rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="ltr:mr-3 rtl:ml-3 group"
                                >
                                    <FontAwesome
                                        className="text-sm text-[#666] dark:text-white/60 group-hover:text-[#8231d3]"
                                        name="pinterest-p"
                                        size="2x"
                                        style={{
                                            textShadow:
                                                '0 1px 0 rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="ltr:mr-3 rtl:ml-3 group"
                                >
                                    <FontAwesome
                                        className="text-sm text-[#666] dark:text-white/60 group-hover:text-[#8231d3]"
                                        name="linkedin"
                                        size="2x"
                                        style={{
                                            textShadow:
                                                '0 1px 0 rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                </Link>
                                <Link
                                    href="#"
                                    className="ltr:mr-3 rtl:ml-3 group"
                                >
                                    <FontAwesome
                                        className="text-sm text-[#666] dark:text-white/60 group-hover:text-[#8231d3]"
                                        name="send"
                                        size="2x"
                                        style={{
                                            textShadow:
                                                '0 1px 0 rgba(0, 0, 0, 0.1)',
                                        }}
                                    />
                                </Link>
                            </div>
                        </div> */}
                    </Paper>



                   
                        {/* date picker here */}
                        <ListingReservation
                            price={price}
                            totalPrice={totalPrice}
                            onChangeDate={onChangeDate}
                            dateRange={dateRange}
                            onSubmit={onSubmit}
                            disabled={disabled}
                            disabledDates={disabledDates}
                        />
                    

                </Box>

             

                {coordinates && <Map center={coordinates} />}
            </div>
        )
    }
)

export default DetailsRight