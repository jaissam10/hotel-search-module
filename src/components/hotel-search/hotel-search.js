import React, { useState, useEffect, useMemo } from "react";
import "./hotel-search.scss";
import Autosuggest from 'react-autosuggest';
import { useForm } from 'react-hook-form'
import DatePickerComponent from "../date-picker/date-picker";
import { useDispatch, useSelector } from "react-redux";
import { authRequest } from "../../redux/actions/auth";
import { cityListRequest } from "../../redux/actions/city-list";
import { nationalityListRequest } from "../../redux/actions/nationality-list";
import { Radio } from 'antd';
import 'antd/dist/antd.css';
import Moment from "react-moment";


const HotelSearch = () => {
    /* const { register, handleSubmit, errors, getValues } = useForm({
        mode: "onBlur"
    }) */
    const [travelModalShow, setTravelModalShow] = useState(false);
    const [checkinDate, setCheckinDate] = useState(new Date());
    const [checkoutDate, setCheckoutDate] = useState(new Date());
    const [searching, setSearching] = useState(false);
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [cityValue, setCityValue] = useState("Goa");
    const [nationalitySuggestions, setNationalitySuggestions] = useState([]);
    const [nationalityValue, setNationalityValue] = useState("India");
    const [ minCheckoutDate, setMinCheckoutDate ] = useState(new Date());
    const {authData, cityListData, nationalityListData} = useSelector(state => ({authData: state.authData, cityListData: state.cityListData, nationalityListData: state.nationalityListData}));
    const dispatch = useDispatch();

    useEffect(() => {
        authAPI();
        initMinDate();
    }, []);

    useEffect(() => {
        if(!authData.error && Object.keys(authData.payload).length) {
            console.log("auth request changed => ", authData);
            nationalityListAPI();
        }
    }, [authData]);

    useEffect(() => {
        if(!cityListData.error && Object.keys(cityListData.payload).length) {
            console.log("city list data changed => ", cityListData);
            let data = [];
            if(cityListData.payload.response.status == "SUCCESS") {
                if(cityListData.payload.response.response.searchedCity) {
                    data = cityListData.payload.response.response.searchedCity.splice(0, 10)
                } else {
                    data = cityListData.payload.response.response.hotelMasterList.splice(0, 10)
                }
                setCitySuggestions(data);
            }
        }
    }, [cityListData]);
    useEffect(() => {
        console.log('nationalitySuggestions chan => ', nationalitySuggestions)
    }, [nationalitySuggestions])

    const authAPI = async () => {
        console.log("AUTH API");
        await dispatch(authRequest());
    }
    const initMinDate = () => {
        setMinCheckoutDate(addDays(new Date(), 1));
        setCheckoutDate(addDays(new Date(), 1))
    }
    const nationalityListAPI = () => {
        dispatch(nationalityListRequest());
    }

    const getCitySuggestions = async (value) => {
        console.log("input value change => ", value);
        const inputValue = value.trim().toLowerCase();
        if(inputValue.length > 2)
            dispatch(cityListRequest(inputValue));
        return [];
            
    };
    const getSuggestionValue = suggestion => {
        return suggestion.cityName || suggestion.hotelName;
    };
    const renderSuggestion = suggestion => {
        // console.log('suggestion => ', suggestion)
        return    (
                <span className="suggestion-content dancounsell">
                    <span className="name">
                        <span className="highlight">{suggestion.cityName || suggestion.hotelName}</span>
                        <span className="">{suggestion.countryCode || suggestion.countyCode}</span>
                    </span>
                </span>
            )
        
    };
    const onCitySuggestionsFetchRequested = ({ value }) => {
        setCitySuggestions(getCitySuggestions(value));
    };
    const onSuggestionsClearRequested = () => {
        setCitySuggestions([]);
    };
    const onCityChange = (event, { newValue }) => {
        // console.log('city change');
        setCityValue(newValue);
    };

    // Autosuggest will pass through all these props to the input.
    const inputPropsCity = {
        placeholder: 'City / Hotel',
        value: cityValue,
        onChange: onCityChange
    };

    

    const onNationalityChange = (event, {newValue}) => {
        // console.log('new value => ', newValue)
        setNationalityValue(newValue);
    }
    const onNationalitySuggestionsClearRequested = () => {
        setNationalitySuggestions([]);
    };
    const onNationalitySuggestionsFetchRequested = ({ value }) => {
        console.log('vl => ', value)
        setNationalitySuggestions(getNationalitySuggestions(value));
    };
    const getNationalitySuggestions = (value) => {
        // console.log("input value change => ", value);
        const inputValue = value.trim().toLowerCase();
        if(Object.keys(nationalityListData.payload).length) {
            let countryList = nationalityListData?.payload?.response?.response?.countryList;
            let arr = countryList.filter(val => (val.countryName).toLowerCase().includes(inputValue));
            arr = arr.length ? arr.splice(0, 10): [];
            console.log(" Nationality => ",arr );
            // setNationalitySuggestions(arr);
            return arr;
        }
        return [];
    };
    const renderNationalitySuggestion = suggestion => {
        console.log('suggestion => ', suggestion)
        return    (
                <span className="suggestion-content dancounsell">
                    <span className="name">
                        <span className="highlight">{suggestion.countryName}</span>
                        {/* <span className="">{suggestion.countryCode}</span> */}
                    </span>
                </span>
            )
    };
    const getNationalitySuggestionValue = suggestion => {
        return suggestion.countryName;
    };
    const inputPropsNationality = {
        placeholder: 'Nationality',
        value: nationalityValue,
        onChange: onNationalityChange
    }

    const checkinStartDateChange = (val) => {
        // console.log("changed checkinStartDateChange => ", val);
        setMinCheckoutDate(addDays(new Date(val), 1));
        setCheckinDate(new Date(val));
        setCheckoutDate(addDays(new Date(val), 1));
    }

    const checkoutStartDateChange = (val) => {
        setCheckoutDate(new Date(val));
    }

    const addDays = (date, val) => {
        let today = new Date(date);
        return new Date(new Date().setDate(today.getDate() + val))
    }

    const onSearch = () => {
        console.log("nationality value => ", nationalityValue);
        setSearching(true);
    }


    /* Memo of DatePicker Component */
    const memoCheckinDateComponent = useMemo(() => (
        <DatePickerComponent
            minDate={new Date()}
            startDateChange={checkinStartDateChange}
        />
    ), []);
    /* Memo of DatePicker Component */
    const memoCheckoutDateComponent = useMemo(() => (
        <DatePickerComponent 
            minDate={minCheckoutDate}
            startDateChange={checkoutStartDateChange}
        />
    ), [minCheckoutDate]);

    return (
        <main className="hotel-search-content" onClick={() => {
            if(travelModalShow)
                setTravelModalShow(false)
        }}>
            <section className="hotel-search-section">
                <div className="container">
                    <div className="row pt-5">
                        <div className="col-lg-12">
                            <div className="widget-section">
                                <div className="hotel-icon-div">
                                    <a className=""><i className="fa fa-bed"></i>Hotels</a>
                                </div>
                                <div></div>
                                <div className="form-div">
                                    <div className="form-content">
                                        <div className="city-div">
                                            <p className="">City / Hotel</p>
                                            <h1 className="">
                                                <Autosuggest
                                                    suggestions={citySuggestions}
                                                    onSuggestionsFetchRequested={onCitySuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={onSuggestionsClearRequested}
                                                    getSuggestionValue={getSuggestionValue}
                                                    renderSuggestion={renderSuggestion}
                                                    inputProps={inputPropsCity}
                                                />
                                            </h1>
                                            
                                        </div>
                                        <div className="checkin-div">
                                            <p>Check In Date</p>
                                            <h1>
                                                {memoCheckinDateComponent}
                                            </h1>
                                            {/* <p>Tuesday</p> */}
                                            <p>
                                                <Moment format="dddd">{checkinDate}</Moment>
                                            </p>

                                        </div>
                                        <div className="checkout-div">
                                            <p>Check Out Date</p>
                                            <h1>
                                                {memoCheckoutDateComponent}
                                            </h1>
                                            <p>
                                                <Moment format="dddd">{checkoutDate}</Moment>
                                            </p>
                                        </div>
                                        <div className="travel-div" onClick={() => {
                                            setTravelModalShow(true)
                                        }}>
                                            <p>Travel</p>
                                            <h1> 2 Guests</h1>
                                            <p>2 Adults, 0 Children</p>
                                            {
                                                travelModalShow && 
                                                <>
                                                <div className="add-room" onClick={(e) => {
                                                    e.stopPropagation();
                                                }} 
                                                >
                                                <div className="">
                                                    <div className="rooms-div">
                                                        <h4>Room 1</h4>
                                                        <div className="d-flex adult-room-div">
                                                            <div className="flex-1">
                                                                <span className="adults-heading">
                                                                    Adults
                                                                    <br />
                                                                    <p>(12+ years)</p>
                                                                </span>
                                                            </div>
                                                            <div className="flex-13">
                                                                {/* <ul>
                                                                    <li>1</li>
                                                                    <li>2</li>
                                                                    <li>3</li>
                                                                    <li>4</li>
                                                                </ul> */}
                                                                <Radio.Group onChange={() => {}} defaultValue="2">
                                                                    <Radio.Button value="1">1</Radio.Button>
                                                                    <Radio.Button value="2">2</Radio.Button>
                                                                    <Radio.Button value="3">3</Radio.Button>
                                                                    <Radio.Button value="4">4</Radio.Button>
                                                                </Radio.Group>
                                                            </div>
                                                        </div>
                                                        <div className="d-flex mt-3 child-room-div">
                                                            <div className="flex-1">
                                                                <span className="child-heading">
                                                                    Children
                                                                    <br />
                                                                    <p>(0 - 11 years)</p>
                                                                </span>
                                                            </div>
                                                            <div  className="flex-13">
                                                                <Radio.Group onChange={() => {}} defaultValue="0">
                                                                    <Radio.Button value="0">0</Radio.Button>
                                                                    <Radio.Button value="1">1</Radio.Button>
                                                                    <Radio.Button value="2">2</Radio.Button>
                                                                </Radio.Group>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <hr />
                                                <div className=""></div>
                                            </div>
                                            </>
                                            }
                                            
                                        </div>
                                        <div className="nationality-div">
                                            <p>Nationality</p>
                                            <h1>
                                                <Autosuggest
                                                    suggestions={nationalitySuggestions}
                                                    onSuggestionsFetchRequested={onNationalitySuggestionsFetchRequested}
                                                    onSuggestionsClearRequested={onNationalitySuggestionsClearRequested}
                                                    getSuggestionValue={getNationalitySuggestionValue}
                                                    renderSuggestion={renderNationalitySuggestion}
                                                    inputProps={inputPropsNationality}
                                                />
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="text-center mt-3">
                                        <button type="button" className="search-button" onClick={onSearch}>Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {
            searching && 
            <section className="result-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <p className="fs-20">
                                Searching ...
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            }
        </main>
    )
}

export default HotelSearch;