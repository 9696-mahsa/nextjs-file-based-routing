import { useRouter } from "next/router"
import { Fragment } from "react";
import EventList from "../../components/events/event-list";
import ResultTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import { getFilteredEvents } from "../../dummy-data";
import ErrrorAlert from '../../components/ui/error-alert';

export default function FilteredEventsPage() {

    const router = useRouter();
    const filterData = router.query.slug;

    if(!filterData) {
      return( <p className="center">Loading...</p>)
    }

    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if(
      isNaN(numYear) || 
      isNaN(numMonth) || 
      numYear>2024 || 
      numYear<2021 || 
      numMonth<1 || 
      numMonth>12 
      ) {
           return (
            <Fragment>
              <ErrrorAlert>
                <p>Invalid filter.</p>
              </ErrrorAlert>

              <div className="center">
                <Button link='/events'>Show All Events</Button>
              </div>

            </Fragment>

           )  
          }

    const filteredEvents = getFilteredEvents( { year: numYear , month: numMonth });

    if( !filteredEvents || filteredEvents.length === 0 ) {
      return ( 
        <Fragment>
          <ErrrorAlert>
            <p> No events found for the chosen filter ! </p> 
          </ErrrorAlert>

          <div className="center">
            <Button link='/events'>Show All Events</Button>
          </div>
        </Fragment>
        );
    }

    const date = new Date(numYear , numMonth-1);

    
    return (
      <Fragment>
        <ResultTitle date={date}/>
        <EventList items={filteredEvents}/>
      </Fragment>
    )
  }
  