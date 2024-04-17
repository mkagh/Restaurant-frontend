import React, { useState, useRef, useEffect } from 'react';
import axios from "axios"
import Cookies from 'js-cookie';
import { useGlobalContext } from '../context'

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {
    const { isLogged } = useGlobalContext()
    const [isDateFree, setIsDateFree] = useState(false)

    const buttonRef = useRef(null)
    const monthRef = useRef(null)

    const [date, setDate] = useState({
        year: "2023",
        month: "january",
        day: "1.",
        name: "",
        email: "",
        member: null
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const reserved = await axios.get(`/api/v1/reservations`, { params: date });
                if (reserved.data.reservation.length > 1) {
                    setIsDateFree(false)
                    buttonRef.current.disabled = true
                }
                else {
                    setIsDateFree(true)
                    buttonRef.current.disabled = false
                }
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [date]);

    const [selectedDate, setSelectedDate] = useState(new Date());
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const generateCalendarDays = () => {
        const daysArray = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(<div key={`empty${i}`} className="empty-day"></div>);
        }
        for (let day = 1; day <= daysInMonth; day++) {
            daysArray.push(
                <div
                    onClick={(e) => {
                        const yearValue = monthRef.current.textContent.slice(-5)
                        const monthValue = monthRef.current.textContent.slice(0, -6)
                        const dayValue = e.target.textContent
                        setDate(prevDate => ({
                            ...prevDate,
                            year: yearValue,
                            month: monthValue,
                            day: `${dayValue}.`,
                            member: isLogged ? true : false,
                            name: isLogged ? JSON.parse(Cookies.get("userData")).username : prevDate.name,
                            email: isLogged ? JSON.parse(Cookies.get("userData")).email : prevDate.email
                        }));
                    }}
                    key={day}
                    className={`day ${selectedDate.getDate() === day ? 'selected-day' : ''}`}
                >
                    <div className="date">{day}</div>
                </div>
            );
        }

        return daysArray;
    };

    return (
        <div className="wrappCalendar">
            <div className="calendar">
                <div className="header">
                    <button className='changeMonth' onClick={() => setSelectedDate(new Date(year, month - 1, 1))}>&lt;</button>
                    <div ref={monthRef} className='month'><p>{selectedDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</p></div>
                    <button className='changeMonth' onClick={() => setSelectedDate(new Date(year, month + 1, 1))}>&gt;</button>
                </div>
                <div className="weekdays">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="weekday">
                            {day}
                        </div>
                    ))}
                </div>
                <div className="days">{generateCalendarDays()}</div>
            </div>
            <div className="chosenDate">
                <h2>RESERVE:</h2>
                <div style={{ color: "white" }} className="date">
                    {!isLogged && <div className='credentials' >
                        <input onChange={(e) => {
                            setDate({
                                ...date,
                                name: e.target.value
                            })
                        }} placeholder="name" type="text" name='name' value={date.name} />
                        <input onChange={(e) => {
                            setDate({
                                ...date,
                                email: e.target.value
                            })
                        }} placeholder="email" type="text" name='email' value={date.email} /></div>}
                    <div className="finalDate">
                        <p>{date.day}</p>
                        <p>{date.month}</p>
                        <p>{date.year}</p>
                    </div>
                    {isDateFree ? <p style={{ color: 'green' }}>slobodan datum</p> : <p style={{ color: 'red' }}>izaberi neki drugi datum</p>}
                </div>
                <div className="choseDateButton">
                    <button ref={buttonRef} onClick={async (e) => {
                        e.target.disabled = true
                        await axios.post(`/api/v1/reservations`, { date })
                    }} >Reserve</button>
                </div>
            </div>
        </div>
    );
};

export default Calendar;
