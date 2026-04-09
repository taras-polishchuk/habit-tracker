// HabitItem — окремий компонент для відображення однієї звички.
// Отримує дані і колбеки через props — нічого не змінює сам.
function HabitItem({ habit, onToggle, onDelete }) {
  return (
    <li className={`habit-item ${habit.doneToday ? 'done' : ''}`}>
      {/* Чекбокс перемикає стан "виконано сьогодні" */}
      <label className="habit-label">
        <input
          type="checkbox"
          checked={habit.doneToday}
          onChange={() => onToggle(habit.id)}
          className="habit-checkbox"
        />
        <span className="habit-title">{habit.title}</span>
      </label>

      {/* Кнопка видалення — пропрацьовує id вгору до App */}
      <button
        onClick={() => onDelete(habit.id)}
        className="delete-btn"
        aria-label="Delete habit"
      >
        ✕
      </button>
    </li>
  )
}

export default HabitItem
