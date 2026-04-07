"use client";

import TableManageMent from "@/components/common/table/TableManageMent";
import UserTableColumn from "./UserTableColumn";
import { IUser } from "@/types";

interface UserTableProps {
  users: IUser[];
}

const UserTable = ({ users }: UserTableProps) => {
  return (
    <TableManageMent
      columns={UserTableColumn}
      data={users}
      getRowKey={(u) => u._id!}
      emptyMessage="No users found."
    />
  );
};

export default UserTable;
