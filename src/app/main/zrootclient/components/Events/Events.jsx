import React, { useEffect } from 'react';
import { useState } from 'react';
// import { useSelector } from 'react-redux';
import styles from '../../styles/style';
import EventCard from './EventCard.jsx';
import NoEventCard from './NoEventCard';
import { eventData } from '../../static/data';

const Events = () => {
  // const { allEvents, isLoading } = useSelector((state) => state.events);
  const [allEvents, setAllEvents] = useState(eventData);

  return (
    <div>
      {/* {!isLoading && ( */}
      <div className={`${styles.section}`}>
        <div className={`${styles.heading}`}>
          <h1>Popular Events</h1>
        </div>

        <div className="w-full grid">
          {allEvents.length !== 0 && (
            <EventCard data={allEvents && allEvents[0]} />
          )}
          {/* <h4></h4> */}
          {allEvents?.length === 0 && <NoEventCard />}
        </div>
      </div>
      {/* // )} */}
    </div>
  );
};

export default Events;
