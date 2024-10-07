const TypingTest = ({ textArray, inputText, handleChange, started, completed, inputRef }) => {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="text-xl mb-4 text-gray-700 dark:text-gray-300">
          {textArray.map((char, index) => (
            <span
              key={index}
              className={
                index < inputText.length
                  ? inputText[index] === char
                    ? "text-green-500"
                    : "text-red-500"
                  : "text-gray-800 dark:text-gray-200"
              }
            >
              {char}
            </span>
          ))}
        </p>
        <textarea
          ref={inputRef} // Attach the inputRef to auto-focus
          value={inputText}
          onChange={handleChange}
          className="w-full p-2 border rounded-md focus:outline-none"
          rows="4"
          placeholder="Start typing here..."
          disabled={completed} // Disable input when completed
        />
      </div>
    );
  };
  
  export default TypingTest;
  