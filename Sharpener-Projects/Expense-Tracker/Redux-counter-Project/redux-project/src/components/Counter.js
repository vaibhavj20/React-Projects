import classes from "./Counter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { counterActions } from "../store"; // Proper import

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => dispatch(counterActions.increment());
  const decrementHandler = () => dispatch(counterActions.decrement());
  const increaseHandler = () => dispatch(counterActions.increase(5)); // Increment by 5
  const decreaseHandler = () => dispatch(counterActions.decrease(5)); // Decrement by 5
  const toggleCounterHandler = () => dispatch(counterActions.toggleCounter());

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}

      <div className={classes.buttons}>
        <button onClick={incrementHandler}>+1</button>
        <button onClick={decrementHandler}>-1</button>
        <button onClick={increaseHandler}>+5</button>
        <button onClick={decreaseHandler}>-5</button>{" "}
        {/* New button to decrement by 5 */}
      </div>
      <button onClick={toggleCounterHandler} className={classes.toggle}>
        Toggle Counter
      </button>
    </main>
  );
};

export default Counter;
