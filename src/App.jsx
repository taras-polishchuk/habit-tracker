import { useState } from 'react'
import HabitItem from './components/HabitItem'

// Читаємо збережені звички з localStorage при першому завантаженні.
// Якщо нічого не збережено — повертаємо порожній масив.
function loadHabits() {
  const saved = localStorage.getItem('habits')
  return saved ? JSON.parse(saved) : []
}

function App() {
  // Список звичок. Кожна звичка — об'єкт: { id, title, doneToday }
  const [habits, setHabits] = useState(loadHabits)

  // Значення контрольованого інпуту для нової звички
  const [inputValue, setInputValue] = useState('')

  // Зберігаємо оновлений масив звичок і в стейт, і в localStorage
  function saveHabits(updatedHabits) {
    setHabits(updatedHabits)
    localStorage.setItem('habits', JSON.stringify(updatedHabits))
  }

  // Додаємо нову звичку до списку
  function addHabit() {
    const trimmed = inputValue.trim()

    // Не додаємо порожні рядки
    if (!trimmed) return

    const newHabit = {
      id: Date.now(),   // простий унікальний ідентифікатор
      title: trimmed,
      doneToday: false,
    }

    saveHabits([...habits, newHabit])
    setInputValue('') // очищаємо поле після додавання
  }

  // Перемикаємо стан "виконано сьогодні" для звички за id
  function toggleDone(id) {
    const updated = habits.map((habit) =>
      habit.id === id ? { ...habit, doneToday: !habit.doneToday } : habit
    )
    saveHabits(updated)
  }

  // Видаляємо звичку зі списку за id
  function deleteHabit(id) {
    const updated = habits.filter((habit) => habit.id !== id)
    saveHabits(updated)
  }

  // Додавання звички клавішею Enter
  function handleKeyDown(e) {
    if (e.key === 'Enter') addHabit()
  }

  // Рахуємо скільки звичок виконано сьогодні (для рядка прогресу)
  const doneCount = habits.filter((h) => h.doneToday).length

  // Всі звички виконані (і список не порожній)
  const allDone = habits.length > 0 && doneCount === habits.length

  return (
    <div className="app">
      <header className="app-header">
        <h1>Habit Tracker</h1>
        {habits.length > 0 && (
          <p className="progress-text">
            {doneCount} / {habits.length} done today
          </p>
        )}
      </header>

      {/* Банер з'являється коли всі звички відмічено */}
      {allDone && (
        <div className="all-done-banner">
          <span className="all-done-icon">🎉</span>
          <div>
            <p className="all-done-title">All done for today!</p>
            <p className="all-done-sub">You crushed it. See you tomorrow.</p>
          </div>
        </div>
      )}

      {/* Форма додавання нової звички */}
      <div className="add-habit-form">
        <input
          type="text"
          placeholder="New habit (e.g. Read 20 min)"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="habit-input"
        />
        <button onClick={addHabit} className="add-btn">
          Add
        </button>
      </div>

      {/* Список звичок */}
      {habits.length === 0 ? (
        <p className="empty-state">No habits yet. Add your first one above!</p>
      ) : (
        <ul className="habits-list">
          {habits.map((habit) => (
            // Передаємо кожній звичці її дані і функції-обробники через props
            <HabitItem
              key={habit.id}
              habit={habit}
              onToggle={toggleDone}
              onDelete={deleteHabit}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
