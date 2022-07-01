export default function Numbers({ number, handleNumberClick }) {
  function handleClick() {
    handleNumberClick(number);
  }

  return (
    <button
      className="bg-neutral-200 hover:bg-neutral-400 text-black font-bold py-2 px-4 rounded-full"
      onClick={handleClick}
    >
      {number}
    </button>
  );
}
