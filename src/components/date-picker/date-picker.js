import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./date-picker.scss";

const DatePickerComponent = ({ minDate, startDateChange }) => {
    // const [startDate, setStartDate] = useState(minDate);
    const [minimumDate, setMinimumDate] = useState(minDate);
    const [selectedDate, setSelectedDate] = useState(minDate);

    
    useEffect(() => {
        // console.log('min date change => ', minDate);
        setMinimumDate(minDate);
        setSelectedDate(minDate);
    }, [minDate]);

    return (
        <DatePicker
            selected={selectedDate}
            // onChange={this.handleChange}
            minDate={minimumDate}
            onChange={(date) => {
                    console.log("Date => ", date);
                    setSelectedDate(date);
                    startDateChange(date);
                }
            }
            dateFormat="d MMMM, yyyy"
            className="date-picker"
        />
    )
}

export default DatePickerComponent;