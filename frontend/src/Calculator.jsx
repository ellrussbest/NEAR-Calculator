import { useState, useCallback, useEffect } from "react";
import "./App.css";
import Numbers from "./Numbers";
import Operators from "./Operators";
import {
  getExpressionResult,
  getExpressionPostfix,
  infixToPostfix,
  solveExpression,
} from "./utils/calculator";

function Calculator() {
  const account = window.walletConnection.account();
  const [expression, setExpresion] = useState("");
  const [result, setResult] = useState(null);
  const [postfix, setPostfix] = useState("");

  const fetchResult = useCallback(async () => {
    if (account.accountId) {
      solveExpression(expression).then(async () => {
        setResult(await getExpressionResult());
      })
    }
  });

  useEffect(() => {
    fetchResult();
  }, [result]);

  const fetchPostfix = useCallback(async () => {
    if(account.accountId) {
      infixToPostfix(expression).then(async () => {
        setPostfix(await getExpressionPostfix());
      })
    }
  });

  useEffect(() => {
    fetchPostfix();
  }, [postfix]);

  function handleChange(e) {
    setExpresion(e.target.value);
  }

  function handleNumberClick(i) {
    setExpresion(expression + i);
  }

  function handleOperatorClick(i) {
    setExpresion(expression + i);
  }

  function handleDelete() {
    setExpresion(expression.slice(0, expression.length - 1));
  }

  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <div className="calculator-wrapper flex justify-center">
      <div>
        <input
              className="mb-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="expression"
              type="text"
              placeholder="Enter the expression to be calculated"
              value={expression}
              onChange={handleChange}
        />

        <div className="App h-56 grid grid-cols-2 gap-4 content-evenly place-items-center ">
          <div className="App h-56 grid grid-cols-3 gap-4 content-start place-items-center ">
            {numbers.map((i) => {
              return (
                <Numbers
                  number={i}
                  key={i}
                  handleNumberClick={handleNumberClick}
                />
              );
            })}
            <button
              className="bg-neutral-200 hover:bg-neutral-400 text-black font-bold py-2 px-4 rounded-full"
              onClick={() => {
                handleNumberClick(0);
              }}
            >
              0
            </button>

            <button className="bg-neutral-200 hover:bg-neutral-400 text-black font-bold py-2 px-4 rounded-full"
              onClick={fetchResult}
            >
              =
            </button>

            <button
              className="bg-neutral-200 hover:bg-neutral-400 text-black font-bold py-2 px-4 rounded"
              onClick={handleDelete}
            >
              DEL
            </button>
          </div>
          <Operators handleOperatorClick={handleOperatorClick} />
        </div>
        <label className="mb-5 block text-gray-500 font-bold bg-gray-300 text-center rounded w-full mt-5 py-2 px-3">
            Answer is: {result}
          </label>

        <div className="grid grid-cols-2 gap-4">

          <button className="bg-blue-100 hover:bg-blue-200 text-black font-bold py-2 px-4 my-5 rounded-full">
            ANS
          </button>

          <label className="mb-5 block text-gray-500 font-bold bg-gray-300 text-center rounded-md w-full mt-5 py-2 px-3">
            Ans: {result}
          </label>

        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="bg-blue-100 hover:bg-blue-200 text-black font-bold py-2 px-4 my-5 rounded-full"
            onClick={fetchPostfix}
          >
            Convert to postfix
          </button>

          <label className="mb-5 block text-gray-500 font-bold bg-gray-300 text-center rounded-md w-full mt-5 py-2 px-3">
            Postfix: <strong>{postfix}</strong>
          </label>
        </div>

      </div>
    </div>
  );
}

export default Calculator;
