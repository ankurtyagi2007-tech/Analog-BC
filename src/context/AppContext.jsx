import { createContext, useContext, useReducer } from 'react';
import businesses from '../data/businesses.json';
import user from '../data/user.json';

const AppContext = createContext(null);

const initialState = {
  isAuthenticated: false,
  user: user,
  businesses: businesses,
  activeBusinessFilter: null,
  pollVotes: {},
  redeemedMerch: [],
  expandedThreads: [],
  signedUpExperiences: [],
};

function appReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isAuthenticated: true };
    case 'LOGOUT':
      return { ...state, isAuthenticated: false };
    case 'SET_BUSINESS_FILTER':
      return { ...state, activeBusinessFilter: action.payload };
    case 'VOTE_POLL':
      return {
        ...state,
        pollVotes: { ...state.pollVotes, [action.payload.pollId]: action.payload.optionId },
      };
    case 'REDEEM_MERCH':
      return {
        ...state,
        redeemedMerch: [...state.redeemedMerch, action.payload],
      };
    case 'TOGGLE_THREAD':
      return {
        ...state,
        expandedThreads: state.expandedThreads.includes(action.payload)
          ? state.expandedThreads.filter((id) => id !== action.payload)
          : [...state.expandedThreads, action.payload],
      };
    case 'SIGNUP_EXPERIENCE':
      return {
        ...state,
        signedUpExperiences: [...state.signedUpExperiences, action.payload],
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
