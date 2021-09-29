// import { useRef, useEffect, useContext, useCallback } from 'react';
// import { AppContext } from '../context/app-context';

// const useComponentDragged = (start, delta) => {
//   const { appState, dispatch } = useContext(AppContext);
//   const ref = useRef(null);

//   const mouseDown = useCallback((e) => {
//     start = e.pageY;
//   }, []);

//   const mouseUp = useCallback(
//     (e) => {
//       const diffY = Math.abs(e.pageY - start);
//       const direction = e.pageY > start ? 'down' : 'up';
//       console.log(direction);

//       if (diffY > delta) {
//         if (appState.filterMenuExtraHeight && direction === 'down') {
//           dispatch({ type: 'TOGGLE-MENU-HEIGHT' });
//         }
//         if (!appState.filterMenuExtraHeight && direction === 'up') {
//           dispatch({ type: 'TOGGLE-MENU-HEIGHT' });
//         }
//       }
//     },
//     [dispatch, start, appState.filterMenuExtraHeight, delta]
//   );

//   useEffect(() => {
//     document.addEventListener('mousedown', mouseDown, true);
//     document.addEventListener('mouseup', mouseUp, true);

//     return () => {
//       document.removeEventListener('mousedown', mouseDown, true);
//       document.removeEventListener('mouseUp', mouseUp, true);
//     };
//   }, [mouseDown, mouseUp]);

//   return { ref };
// };

// export default useComponentDragged;
