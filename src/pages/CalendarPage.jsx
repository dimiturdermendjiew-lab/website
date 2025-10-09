import React, { useState, useCallback } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './CalendarPage.css';
import EventModal from '../components/EventModal';

moment.locale('bg');
const localizer = momentLocalizer(moment);

const categories = {
  university: { name: 'Университет', color: '#3b5998' },
  school: { name: 'Училище', color: '#8b9dc3' },
  extracurricular: { name: 'Извънкласна дейност', color: '#f7f7f7', textColor: '#333' },
  sports: { name: 'Спортна дейност', color: '#ff9f40' },
  love: { name: 'Любовен живот', color: '#d9363e' },
  work: { name: 'Работа', color: '#55c57a' },
  personal: { name: 'Лични задачи', color: '#ffeb3b', textColor: '#333' },
  health: { name: 'Здраве', color: '#ff7f7f' },
};

// Custom component to render the event with its category
function CustomEvent({ event }) {
    const categoryName = categories[event.category]?.name || 'Без категория';
    return (
      <div>
        <strong>{event.title}</strong>
        <div style={{ fontSize: '0.8em', opacity: 0.9, marginTop: '2px' }}>{categoryName}</div>
      </div>
    );
}

// Wrapper for date cells to apply custom styles to weekends
const DateCellWrapper = ({ children, value }) => {
    const day = value.getDay();
    const isWeekend = day === 0 || day === 6; // 0 for Sunday, 6 for Saturday

    // Clone the child and add a new class if it's a weekend
    return React.cloneElement(React.Children.only(children), {
        className: `${children.props.className} ${isWeekend ? 'weekend-cell' : ''}`,
    });
};

const sampleEvents = [
  {
    id: 1,
    title: 'Изпит по Уеб Технологии',
    start: new Date(2024, 5, 28, 10, 0),
    end: new Date(2024, 5, 28, 12, 0),
    allDay: false,
    category: 'university',
  },
];

function CalendarPage() {
  const [events, setEvents] = useState(sampleEvents);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [view, setView] = useState('month');
  const [date, setDate] = useState(new Date());

  const handleSelectSlot = (slotInfo) => {
    setModalOpen(true);
    setSelectedEvent({ start: slotInfo.start, end: slotInfo.end });
  };
  
  const handleSelectEvent = (event) => {
    setModalOpen(true);
    setSelectedEvent(event);
  };

  const handleSaveEvent = ({ title, category }) => {
    if (title && selectedEvent) {
      if (selectedEvent.id) {
        setEvents(prevEvents => prevEvents.map(ev => 
          ev.id === selectedEvent.id ? { ...ev, title, category } : ev
        ));
      } else {
        const newEvent = {
            id: new Date().getTime(), 
            title,
            start: selectedEvent.start,
            end: selectedEvent.end,
            allDay: !selectedEvent.start.getHours(),
            category,
        };
        setEvents(prevEvents => [...prevEvents, newEvent]);
      }
    }
    setModalOpen(false);
    setSelectedEvent(null);
  };
  
  const handleDeleteEvent = () => {
      if (selectedEvent && selectedEvent.id) {
          if (window.confirm('Сигурни ли сте, че искате да изтриете това събитие?')) {
              setEvents(prevEvents => prevEvents.filter(ev => ev.id !== selectedEvent.id));
              setModalOpen(false);
              setSelectedEvent(null);
          }
      }
  }

  const onNavigate = useCallback((newDate) => setDate(newDate), [setDate]);
  const onView = useCallback((newView) => setView(newView), [setView]);

  const eventStyleGetter = (event) => {
    const category = categories[event.category] || {};
    return {
      style: {
        backgroundColor: category.color,
        borderRadius: '5px',
        opacity: 0.9,
        color: category.textColor || 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  const components = {
    event: CustomEvent,
    dateCellWrapper: DateCellWrapper, // Use the custom wrapper for date cells
    toolbar: (toolbar) => (
      <div className="rbc-toolbar">
        <div className="rbc-btn-group">
          <button type="button" onClick={() => toolbar.onNavigate('PREV')}>&lt;</button>
          <button type="button" onClick={() => toolbar.onNavigate('TODAY')}>Днес</button>
          <button type="button" onClick={() => toolbar.onNavigate('NEXT')}>&gt;</button>
        </div>
        <span className="rbc-toolbar-label">{moment(toolbar.date).format('MMMM YYYY')}</span>
        <div className="rbc-btn-group">
            <button type="button" className={toolbar.view === 'month' ? 'rbc-active' : ''} onClick={() => toolbar.onView('month')}>Месец</button>
            <button type="button" className={toolbar.view === 'week' ? 'rbc-active' : ''} onClick={() => toolbar.onView('week')}>Седмица</button>
            <button type="button" className={toolbar.view === 'day' ? 'rbc-active' : ''} onClick={() => toolbar.onView('day')}>Ден</button>
        </div>
      </div>
    ),
  };

  return (
    <div className="page-content calendar-page">
      <header className="calendar-header">
        <h1>Календар</h1>
        <p>Планирайте и организирайте вашите събития и задачи.</p>
      </header>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 'calc(100vh - 250px)' }}
          components={components}
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          view={view}
          date={date}
          onView={onView}
          onNavigate={onNavigate}
          messages={{
            allDay: 'Цял ден', previous: 'Назад', next: 'Напред', today: 'Днес',
            month: 'Месец', week: 'Седмица', day: 'Ден', agenda: 'Дневен ред',
            date: 'Дата', time: 'Час', event: 'Събитие',
            noEventsInRange: 'Няма събития в този период.',
            showMore: total => `+${total} още`,
          }}
        />
      </div>
      <EventModal 
        isOpen={modalOpen} 
        onClose={() => { setModalOpen(false); setSelectedEvent(null); }}
        onSave={handleSaveEvent}
        onDelete={handleDeleteEvent}
        event={selectedEvent}
      />
    </div>
  );
}

export default CalendarPage;
