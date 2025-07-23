import { FC } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';



// interface ICalenderProps {
//     value: Range
//     disabledDates?: Date[]
//     onChange: (value: RangeKeyDict) => void
// };



export const Calender = ({
    value,
    disabledDates,
    onChange
}) => {

    return (
        <DateRange
        rangeColors={["#262626"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
        />
    );
}
