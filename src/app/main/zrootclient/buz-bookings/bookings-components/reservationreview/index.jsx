import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { Range } from "react-date-range";
import { Calender } from "../calender";
import { formatCurrency } from "src/app/main/vendors-shop/pos/PosUtils";
// import Heading from '@/components/heading'
// import { Calender } from '@/components/calender'
// import { Buttons } from '@/components/buttons'

// interface IListingReservationProps {
//     price: number;
//     totalPrice: number;
//     onChangeDate: (value: Range) => void;
//     dateRange: Range;
//     onSubmit: () => void;
//     disabled: boolean;
//     disabledDates: Date[];
// }

//: FC<IListingReservationProps>
export const ListingReservation = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="
        bg-white
        rounded-xl
        border-[1px]
        border-neutral-200
        overflow-hidden
        "
    >
      <div
        className="
            flex flex-row items-center 
            "
      >
        {/* <div className="text-2xl fonr-semibold">
                    $ {price}
                </div> */}
        <Typography
          className="text-dark dark:text-white/[.87] mt-[18px] mb-2 text-[22px] font-medium"
          as="h3"
        >
          <span className="text-sm text-light dark:text-white/60">₦</span>

          <span>
            {formatCurrency(price)}{" "}
            <span className="text-sm ltr:ml-1.5 rtl:mr-1.5 text-light dark:text-white/30 font-normal">
              {" "}
              per night
            </span>
          </span>
        </Typography>
        {/* <hr /> */}
      </div>

      <hr />
      <Calender
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value?.selection)}
      />
      <hr />
      <div className="p-4">
        <Button
          size="small"
          type="primary"
          className="bg-orange-500 hover:bg-orange-800 h-[44px] w-full px-[30px] bg-primary text-black dark:text-white/[.87] text-sm font-semibold border-primary rounded-[6px]"
          onClick={onSubmit}
          disabled={disabled}
        >
          Reserve
        </Button>
      </div>

      <div
        className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-semibold
                text-lg
                "
      >
        <div>Total</div>
        <div>₦ {formatCurrency(totalPrice)}</div>
      </div>
    </div>
  );
};
