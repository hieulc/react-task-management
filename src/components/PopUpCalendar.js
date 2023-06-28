import styles from "../login.module.css";
import { AiOutlineClose } from "react-icons/ai";
import Calendar from "react-calendar";
import "../calendar.css";
import { useEffect, useState } from "react";
import moment from "moment/moment";
import { useRef } from "react";

function PopUpCalendar({ onClose, onAddDueDate }) {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState(moment().format("L"));
  const [time, setTime] = useState(moment().format("LT"));

  const divEl3 = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl3.current) {
        return;
      }

      if (!divEl3.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const onDateChange = (date) => {
    const formattedDate = moment(date).format("L");
    setFormattedDate(formattedDate);
    setDate(date);
  };

  const onTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddDueDate(date);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("LT"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className={styles.calendar_container} ref={divEl3}>
      <div className={styles.calendar_header}>
        <h2 className={styles.calendar_header_title}>Dates</h2>
        <a href="#" className={styles.close_calendar_btn} onClick={onClose}>
          <span className={styles.test_button_icon}>
            <AiOutlineClose />
          </span>
        </a>
      </div>

      <div className={styles.table_calendar}>
        <Calendar value={date} onChange={onDateChange} />
        <div className={styles.bottom_calendar}>
          <form onSubmit={handleSubmit}>
            <div className={styles.due_date_calendar_input_container}>
              <div className={styles.due_date_calendar_input}>
                <label className={styles.due_date_label}>Due Date</label>
                <div className={styles.input_due_date}>
                  <input
                    placeholder="YYYY/MM/DD"
                    value={formattedDate}
                    onChange={onDateChange}
                    disabled
                  />
                </div>
                <div className={styles.input_due_hours}>
                  <input
                    placeholder="Add time"
                    value={time}
                    onChange={onTimeChange}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className={styles.calendar_form_button_container}>
              <button className={styles.calendar_form_button_save}>Save</button>
              <a
                href="#"
                className={styles.calendar_form_button_remove}
                onClick={onClose}
              >
                Remove
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default PopUpCalendar;
