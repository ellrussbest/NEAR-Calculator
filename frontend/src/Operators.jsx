export default function Operators({ handleOperatorClick }) {
  return (
    <>
      <div className="h-56 grid grid-cols-2 gap-4 content-evenly place-items-center">
        <button
          className="bg-yellow-700 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full"
          onClick={() => {
            handleOperatorClick("+");
          }}
        >
          +
        </button>

        <button
          className="bg-yellow-700 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full"
          onClick={() => {
            handleOperatorClick("-");
          }}
        >
          -
        </button>

        <button
          className="bg-yellow-700 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full"
          onClick={() => {
            handleOperatorClick("*");
          }}
        >
          *
        </button>

        <button
          className="bg-yellow-700 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full"
          onClick={() => {
            handleOperatorClick("/");
          }}
        >
          /
        </button>

        <button
          className="bg-yellow-700 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full"
          onClick={() => {
            handleOperatorClick("(");
          }}
        >
          (
        </button>

        <button
          className="bg-yellow-700 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full"
          onClick={() => {
            handleOperatorClick(")");
          }}
        >
          )
        </button>

        <button
          className="bg-yellow-700 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full"
          onClick={() => {
            handleOperatorClick("^");
          }}
        >
          ^
        </button>

        <button
          className="bg-yellow-700 hover:bg-red-700 text-black font-bold py-2 px-4 rounded-full"
          onClick={() => {
            handleOperatorClick(".");
          }}
        >
          .
        </button>
      </div>
    </>
  );
}
