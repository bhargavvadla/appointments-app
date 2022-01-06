import './index.css'
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointments: [],
    titleInput: '',
    dateInput: '',
    hasStarredList: false,
  }

  getStarred = () => {
    this.setState(prevState => ({hasStarredList: !prevState.hasStarredList}))
  }

  onChangeTitle = e => {
    this.setState({
      titleInput: e.target.value,
    })
  }

  onChangeDate = e => {
    this.setState({dateInput: e.target.value})
  }

  addAppointment = e => {
    e.preventDefault()
    const {titleInput, dateInput} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointments: [...prevState.appointments, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onClickStar = id => {
    this.setState(prevState => ({
      appointments: prevState.appointments.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {
            ...eachAppointment,
            isStarred: !eachAppointment.isStarred,
          }
        }
        console.log(eachAppointment)
        return eachAppointment
      }),
    }))
  }

  render() {
    const {titleInput, dateInput, appointments, hasStarredList} = this.state
    const startBtnClass = hasStarredList ? 'star-filled' : 'star-empty'

    return (
      <div className="app-container">
        <div className="app-main-container">
          <div className="appointment-container">
            <div className="appointment-top-container">
              <form className="form" onSubmit={this.addAppointment}>
                <h1 className="form-heading">Add Appointment</h1>
                <label className="label" htmlFor="title">
                  TITLE
                </label>
                <input
                  id="title"
                  type="text"
                  className="input"
                  placeholder="Title"
                  onChange={this.onChangeTitle}
                  value={titleInput}
                />
                <label className="label" htmlFor="date">
                  DATE
                </label>
                <input
                  id="date"
                  type="date"
                  className="input"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
                <div>
                  <button
                    type="submit"
                    className="add-btn"
                    onClick={this.addAppointment}
                  >
                    Add
                  </button>
                </div>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="appointment-image"
              />
            </div>
            <hr className="divider" />
            <div className="menu-header">
              <h1 className="menu-heading">Appointments</h1>
              <button
                className={`get-starred-btn ${startBtnClass}`}
                type="submit"
                onClick={this.getStarred}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-menu">
              {hasStarredList
                ? appointments.map(
                    eachAppointment =>
                      eachAppointment.isStarred && (
                        <AppointmentItem
                          updateStarred={this.onClickStar}
                          appointmentListItem={eachAppointment}
                          key={eachAppointment.id}
                        />
                      ),
                  )
                : appointments.map(eachAppointment => (
                    <AppointmentItem
                      updateStarred={this.onClickStar}
                      appointmentListItem={eachAppointment}
                      key={eachAppointment.id}
                    />
                  ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
