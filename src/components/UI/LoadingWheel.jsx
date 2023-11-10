

import classes from './LoadingWheel.module.css';

const LoadingWheel = () => {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loading}></div>
      <p>on progress</p>
    </div>
  );
};

export default LoadingWheel;
