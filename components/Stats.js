import React from 'react';

export default function Stats({ wpm, accuracy, time }) {
  return (
    <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded mt-6">
      <h3 className="text-xl font-semibold mb-4">Stats</h3>
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-lg font-bold">{wpm}</p>
          <p>WPM</p>
        </div>
        <div>
          <p className="text-lg font-bold">{accuracy}%</p>
          <p>Accuracy</p>
        </div>
        <div>
          <p className="text-lg font-bold">{time}s</p>
          <p>Time</p>
        </div>
      </div>
    </div>
  );
}
