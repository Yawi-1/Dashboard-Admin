import { createSelector } from '@reduxjs/toolkit';

// Base selector
const selectTeamState = state => state.team || {};

// Memoized selectors
export const selectTeamMembers = createSelector(
  [selectTeamState],
  state => state.teamMembers || []
);

export const selectTeamLoading = createSelector(
  [selectTeamState],
  state => state.loading || false
);

export const selectTeamError = createSelector(
  [selectTeamState],
  state => state.error || null
);

export const selectSelectedTeamMember = createSelector(
  [selectTeamState],
  state => state.selectedTeamMember || null
);