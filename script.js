const { useState } = React;

const availableSlots = {
  "2024-06-01": ["09:00", "10:00", "14:00"],
  "2024-06-02": ["10:00", "13:00", "15:00"],
  "2024-06-03": ["08:30", "11:30"]
};

function App() {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const dates = Object.keys(availableSlots);

  function handleDateChange(e) {
    setSelectedDate(e.target.value);
    setSelectedTime("");
  }

  function handleTimeSelect(time) {
    setSelectedTime(time);
    setStep(3);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStep(4);
  }

  return (
    React.createElement('div', { className: 'container' },
      step === 1 && (
        React.createElement('div', null,
          React.createElement('h2', null, 'Select a date'),
          React.createElement('input', {
            type: 'date',
            value: selectedDate,
            onChange: handleDateChange,
            min: dates[0],
            max: dates[dates.length - 1]
          }),
          React.createElement('button', {
            disabled: !availableSlots[selectedDate],
            onClick: () => setStep(2)
          }, 'Next')
        )
      ),
      step === 2 && (
        React.createElement('div', null,
          React.createElement('h2', null, 'Select a time'),
          React.createElement('div', { className: 'time-options' },
            availableSlots[selectedDate].map(time =>
              React.createElement('button', { key: time, onClick: () => handleTimeSelect(time) }, time)
            )
          ),
          React.createElement('button', { onClick: () => setStep(1) }, 'Back')
        )
      ),
      step === 3 && (
        React.createElement('form', { onSubmit: handleSubmit },
          React.createElement('h2', null, 'Enter your details'),
          React.createElement('label', null, 'Name'),
          React.createElement('input', {
            type: 'text',
            value: name,
            onChange: e => setName(e.target.value),
            required: true
          }),
          React.createElement('label', null, 'Email'),
          React.createElement('input', {
            type: 'email',
            value: email,
            onChange: e => setEmail(e.target.value),
            required: true
          }),
          React.createElement('button', { type: 'submit' }, 'Confirm'),
          React.createElement('button', { type: 'button', onClick: () => setStep(2) }, 'Back')
        )
      ),
      step === 4 && (
        React.createElement('div', { className: 'confirmation' },
          React.createElement('h2', null, 'Booking Confirmed'),
          React.createElement('p', null, `Date: ${selectedDate}`),
          React.createElement('p', null, `Time: ${selectedTime}`),
          React.createElement('p', null, `Name: ${name}`),
          React.createElement('p', null, `Email: ${email}`)
        )
      )
    )
  );
}

ReactDOM.render(React.createElement(App), document.getElementById('root'));
