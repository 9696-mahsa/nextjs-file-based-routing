import EvenItem from "./event-item";
import classes from './event-list.module.css';

export default function EventList (props) {
    const { items } = props;

    return(

            <ul className={classes.list}>
                {items.map(event => 
                    <EvenItem 
                        key={event.id}
                        id={event.id} 
                        title={event.title} 
                        location={event.location} 
                        date={event.date} 
                        image={event.image}
                    />
                )}
            </ul>
 
    );
}