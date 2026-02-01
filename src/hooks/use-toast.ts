import * as React from 'react';

type ToastProps = {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'destructive';
};

type ToastActionType = { type: 'ADD_TOAST'; toast: ToastProps } | { type: 'REMOVE_TOAST'; id: string };

const toastReducer = (state: ToastProps[], action: ToastActionType): ToastProps[] => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.toast];
    case 'REMOVE_TOAST':
      return state.filter((t) => t.id !== action.id);
    default:
      return state;
  }
};

const listeners: Array<(state: ToastProps[]) => void> = [];
let memoryState: ToastProps[] = [];

function dispatch(action: ToastActionType) {
  memoryState = toastReducer(memoryState, action);
  listeners.forEach((listener) => listener(memoryState));
}

export function toast(props: Omit<ToastProps, 'id'>) {
  const id = Math.random().toString(36).substring(2, 9);
  dispatch({ type: 'ADD_TOAST', toast: { ...props, id } });

  setTimeout(() => {
    dispatch({ type: 'REMOVE_TOAST', id });
  }, 5000);

  return { id };
}

export function useToast() {
  const [state, setState] = React.useState<ToastProps[]>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, []);

  return {
    toasts: state,
    toast,
    dismiss: (id: string) => dispatch({ type: 'REMOVE_TOAST', id }),
  };
}
