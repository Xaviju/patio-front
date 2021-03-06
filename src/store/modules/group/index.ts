/*!
 * Copyright (C) 2019 Kaleidos Open Source SL
 *
 * This file is part of Dont Worry Be Happy (DWBH).
 * DWBH is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * DWBH is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with DWBH.  If not, see <https://www.gnu.org/licenses/>.
 */

import { ActionTree, GetterTree, Module, MutationTree, Commit } from "vuex";

import api from "@/services/api";
import {
  GetGroupInput,
  GetGroupStatsInput,
  EditGroupInput,
  AddUserToGroupInput,
  LeaveGroupInput,
} from "@/services/api/types";

import { Group, User } from "@/domain";

import { RootState } from "@/store/types";
import { GroupState } from "./types";

const getInitialState = (): GroupState => ({
  group: undefined,
  getGroupIsLoading: false,
  getGroupError: false,
  getGroupStatsIsLoading: false,
  getGroupStatsError: false,
  members: [],
  getGroupMembersIsLoading: false,
  getGroupMembersError: false,
  editIsLoading: false,
  editError: false,
  addUserToGroupIsLoading: false,
  addUserToGroupError: false,
  leaveIsLoading: false,
  leaveError: false,
});

const initialState = getInitialState();

const getters: GetterTree<GroupState, RootState> = {
  group(state: GroupState) { return state.group; },
  getGroupIsLoading(state: GroupState) { return state.getGroupIsLoading; },
  getGroupError(state: GroupState) { return state.getGroupError; },
  getGroupStatsIsLoading(state: GroupState) { return state.getGroupStatsIsLoading; },
  getGroupStatsError(state: GroupState) { return state.getGroupStatsError; },
  members(state: GroupState) { return state.members; },
  getGroupMembersIsLoading(state: GroupState) { return state.getGroupMembersIsLoading; },
  getGroupMembersError(state: GroupState) { return state.getGroupMembersError; },
  editIsLoading(state: GroupState) { return state.editIsLoading; },
  editError(state: GroupState) { return state.editError; },
  addUserToGroupIsLoading(state: GroupState) { return state.addUserToGroupIsLoading; },
  addUserToGroupError(state: GroupState) { return state.addUserToGroupError; },
  leaveIsLoading(state: GroupState) { return state.leaveIsLoading; },
  leaveError(state: GroupState) { return state.leaveError; },
};

const mutations: MutationTree<GroupState> = {
  // getGroup
  getGroupRequest(state: GroupState) {
    state.getGroupIsLoading = true;
    state.getGroupError = false;
  },
  getGroupSuccess(state: GroupState, group: Group ) {
    state.getGroupIsLoading = false;
    state.getGroupError = false;
    state.members = [];
    state.group = group;
  },
  getGroupFail(state: GroupState, error: string) {
    state.getGroupIsLoading = false;
    state.getGroupError = error;
  },
  // getGroupMembers
  getGroupMembersRequest(state: GroupState) {
    state.getGroupMembersIsLoading = true;
    state.getGroupMembersError = false;
  },
  getGroupMembersSuccess(state: GroupState, members: User[] ) {
    state.getGroupMembersIsLoading = false;
    state.getGroupMembersError = false;

    state.members = members;
  },
  getGroupMembersFail(state: GroupState, error: string) {
    state.getGroupMembersIsLoading = false;
    state.getGroupMembersError = error;
  },
  // edit
  editRequest(state: GroupState) {
    state.editIsLoading = true;
    state.editError = false;
  },
  editSuccess(state: GroupState, group: Group) {
    state.editIsLoading = false;
    state.editError = false;

    state.group = Object.assign({}, state.group, group);
  },
  editFail(state: GroupState, error: string) {
    state.editIsLoading = false;
    state.editError = error;
  },
  // addUserToGroup
  addUserToGroupRequest(state: GroupState) {
    state.addUserToGroupIsLoading = true;
    state.addUserToGroupError = false;
  },
  addUserToGroupFail(state: GroupState, error: string) {
    state.addUserToGroupIsLoading = false;
    state.addUserToGroupError = error;
  },
  addUserToGroupReset(state: GroupState) {
    state.addUserToGroupIsLoading = false;
    state.addUserToGroupError = false;
  },
  // leave
  leaveRequest(state: GroupState) {
    state.leaveIsLoading = true;
    state.leaveError = false;
  },
  leaveFail(state: GroupState, error: string) {
    state.leaveIsLoading = false;
    state.leaveError = error;
  },
  leaveReset(state: GroupState) {
    state.leaveIsLoading = false;
    state.leaveError = false;
  },
  // reset
  resetState(state: GroupState) {
    Object.assign(state, getInitialState());
  },
};

const actions: ActionTree<GroupState, RootState> = {
  async getGroup(
    {commit, state}: {commit: Commit, state: GroupState},
    input: GetGroupInput,
  ) {
    commit("getGroupRequest");
    try {
      const group = await api.groups.get(input);
      commit("getGroupSuccess", group);
      return group;
    } catch (error) {
      commit("getGroupFail", error.code);
      return;
    }
  },
  async getGroupStats(
    {commit, state}: {commit: Commit, state: GroupState},
    input: GetGroupStatsInput,
  ) {
    commit("getGroupStatsRequest");
    try {
      const stats = await api.groups.getGroupStats(input);
      commit("getGroupStatsSuccess", stats);
      return stats;
    } catch (error) {
      commit("getGroupStatsFail", error.code);
      return;
    }
  },
  async getGroupMembers(
    {commit, state}: {commit: Commit, state: GroupState},
    input: GetGroupInput,
  ) {
    commit("getGroupMembersRequest");
    try {
      const members = await api.groups.getGroupMembers(input);
      commit("getGroupMembersSuccess", members);
      return members;
    } catch (error) {
      commit("getGroupMembersFail", error.code);
      return;
    }
  },
  async edit(
    {commit, state}: {commit: Commit, state: GroupState},
    input: EditGroupInput,
  ) {
    commit("editRequest");
    try {
      const group = await api.groups.edit(input);
      commit("editSuccess", group);
      return group;
    } catch (error) {
      commit("editFail", error.code);
      return false;
    }
  },
  async addUserToGroup(
    {commit, state}: {commit: Commit, state: GroupState},
    input: AddUserToGroupInput,
  ) {
    commit("addUserToGroupRequest");
    let result = false;

    try {
      result = await api.groups.addUserToGroup(input);
      commit("addUserToGroupReset");
    } catch (error) {
      commit("addUserToGroupFail", error.code);
    }

    return result;
  },
  async leave(
    {commit, state}: {commit: Commit, state: GroupState},
    input: AddUserToGroupInput,
  ) {
    commit("leaveRequest");
    let result = false;

    try {
      result = await api.groups.leave(input);
      commit("leaveReset");
    } catch (error) {
      commit("leaveFail", error.code);
    }

    return result;
  },
};

const module: Module<GroupState, RootState> = {
  namespaced: true,
  state: initialState,
  getters,
  mutations,
  actions,
};

export default module;
