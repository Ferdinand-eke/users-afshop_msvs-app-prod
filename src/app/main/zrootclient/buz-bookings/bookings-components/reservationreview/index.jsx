import { Button, Typography } from "@mui/material";
import { FC } from "react";
import { Range } from "react-date-range";
import { Calender } from "../calender";
import { formatCurrency } from "src/app/main/vendors-shop/PosUtils";



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
      {/* Price Header */}
      <div className="px-4 py-4 border-b border-neutral-200">
        <Typography
          className="text-dark dark:text-white/[.87] text-[24px] font-bold"
          as="h3"
        >
          <span className="text-base text-light dark:text-white/60">₦</span>
          <span>
            {formatCurrency(price)}{" "}
            <span className="text-base ltr:ml-1.5 rtl:mr-1.5 text-light dark:text-white/30 font-normal">
              per night
            </span>
          </span>
        </Typography>
      </div>

      {/* Calendar - Full Width */}
      <div className="w-full">
        <Calender
          value={dateRange}
          disabledDates={disabledDates}
          onChange={(value) => onChangeDate(value?.selection)}
        />
      </div>

      <hr />

      {/* Reserve Button */}
      <div className="p-4">
        <Button
          size="large"
          type="primary"
          className="h-[52px] w-full px-[30px] text-white text-base font-bold rounded-lg transition-all duration-300"
          onClick={onSubmit}
          disabled={disabled}
          sx={{
            backgroundColor: '#ea580c',
            '&:hover': {
              backgroundColor: '#c2410c',
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 20px rgba(234, 88, 12, 0.3)',
            },
            '&:disabled': {
              backgroundColor: '#9ca3af',
              cursor: 'not-allowed',
            },
            textTransform: 'none',
          }}
        >
          Reserve Now
        </Button>
      </div>

      {/* Total Price */}
      <div
        className="
                p-4
                flex
                flex-row
                items-center
                justify-between
                font-bold
                text-xl
                border-t
                border-neutral-200
                bg-orange-50
                "
      >
        <div className="text-gray-800">Total</div>
        <div className="text-orange-600">₦ {formatCurrency(totalPrice)}</div>
      </div>
    </div>
  );
};
