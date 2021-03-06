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

import { shallowMount, RouterLinkStub } from "@vue/test-utils";

import GroupList from "./GroupList.vue";

const getWrapper = ({...params}) => {
  return shallowMount(
    GroupList,
    {
      stubs: { RouterLink: RouterLinkStub },
      ...params,
    },
  );
};

describe("View: GroupList", () => {
  it("show the groups table", () => {
    const wrapper = getWrapper({});

    expect(wrapper.contains("[data-testid='action-create']")).toBe(true);
    expect(wrapper.contains("[data-testid='groups-table']")).toBe(true);
  });
});
