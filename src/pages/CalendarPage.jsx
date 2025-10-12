import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'; // Import Views
import moment from 'moment';
import 'moment/locale/bg';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css';
import EventModal from '../components/EventModal';
import ViewEventModal from '../components/ViewEventModal';

moment.locale('bg');
const localizer = momentLocalizer(moment);

const categoryColors = {
    lecture: '#3174ad',
    exercise: '#4caf50',
    exam: '#f44336',
    task: '#ff9800',
    homework: '#795548',
    meeting: '#9c27b0',
};

function CalendarPage() {
    const navigate = useNavigate();
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem('calendarEvents');
        return savedEvents ? JSON.parse(savedEvents).map(event => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end)
        })) : [];
    });

    const [addModalIsOpen, setAddModalIsOpen] = useState(false);
    const [viewModalIsOpen, setViewModalIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [view, setView] = useState(Views.MONTH); // Add view state

    useEffect(() => {
        localStorage.setItem('calendarEvents', JSON.stringify(events));
    }, [events]);

    const handleSelectSlot = ({ start }) => {
        setSelectedDate(start);
        setAddModalIsOpen(true);
    };

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setViewModalIsOpen(true);
    }

    const handleAddEvent = ({ title, category, startTime, endTime }) => {
        if (title && selectedDate) {
            const startDateTime = moment(selectedDate).set({
                hour: startTime.split(':')[0],
                minute: startTime.split(':')[1]
            }).toDate();

            const endDateTime = moment(selectedDate).set({
                hour: endTime.split(':')[0],
                minute: endTime.split(':')[1]
            }).toDate();

            const newEvent = { 
                id: new Date().getTime(),
                title,
                start: startDateTime,
                end: endDateTime,
                category
            };
            setEvents([...events, newEvent]);
        }
        setAddModalIsOpen(false);
    };

    const handleDeleteEvent = (eventToDelete) => {
        setEvents(events.filter(event => event.id !== eventToDelete.id));
        setViewModalIsOpen(false);
    };

    const eventStyleGetter = (event) => {
        const backgroundColor = categoryColors[event.category] || '#8e9eab';
        const style = {
            backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '0px',
            display: 'block'
        };
        return {
            style: style
        };
    };

    const messages = {
        allDay: 'Цял ден',
        previous: 'Назад',
        next: 'Напред',
        today: 'Днес',
        month: 'Месец',
        week: 'Седмица',
        day: 'Ден',
        agenda: 'Дневен ред',
        date: 'Дата',
        time: 'Час',
        event: 'Събитие',
        showMore: total => `+${total} още`,
    };

    return (
        <div className="calendar-container-page">
            <button className="home-button" onClick={() => navigate('/')}>🏠</button>
            <h1 className="calendar-title">Твоят график</h1>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 600 }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                eventPropGetter={eventStyleGetter}
                messages={messages}
                culture='bg'
                view={view} // Control the current view
                onView={(view) => setView(view)} // Handle view changes
            />
            <EventModal
                isOpen={addModalIsOpen}
                onClose={() => setAddModalIsOpen(false)}
                onAddEvent={handleAddEvent}
            />
            <ViewEventModal 
                isOpen={viewModalIsOpen}
                onClose={() => setViewModalIsOpen(false)}
                event={selectedEvent}
                onDelete={handleDeleteEvent}
            />
        </div>
    );
}

export default CalendarPage;
