import React from 'react';

export default function Header({ startTest, isTestStarted, isTestCompleted }) {
  return (
    <header className="bg-blue-600 dark:bg-gray-800 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Typing Speed Test</h1>
        {/* Conditionally render the Start Test button based on test status */}
        {(!isTestStarted || isTestCompleted) && (
          <button 
            onClick={startTest} 
            className="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded"
          >
            Start Test
          </button>
        )}
      </div>
    </header>
  );
}
