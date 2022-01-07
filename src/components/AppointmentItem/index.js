import './index.css'

const AppointmentItem = props => {
  const {appointmentListItem, updateStarred} = props
  const {id, title, date, isStarred} = appointmentListItem

  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    updateStarred(id)
  }
  return (
    <li className="appointment-list-item">
      <div className="list-text-container">
        <p className="appointment-title">{title}</p>
        <p className="appointment-time">{date}</p>
      </div>
      <button
        type="button"
        testid="star"
        className="start-btn"
        onClick={onClickStar}
      >
        <img src={starImage} alt="star" className="start-icon" />
      </button>
    </li>
  )
}

export default AppointmentItem
