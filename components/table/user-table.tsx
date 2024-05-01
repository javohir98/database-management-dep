import { useUserActions } from '@/services/mutation';
import { IUser, TOrderBy } from '@/types';
import { formatDate } from '@/utils/date';
import { ActionIcon, Badge, Flex, Image, Table } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconEdit, IconSortAscending, IconSortDescending, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';
import { openModal } from '../confirmation-modal';

type Props = {
  list: IUser[];
  sort: {
    activeTitle: TOrderBy;
    order: 'asc' | 'desc';
  };
  onSort: (value: TOrderBy) => void;
};

const UserTable: React.FC<Props> = ({ list, sort, onSort }) => {
  const { deleteUser } = useUserActions();

  const handleDelete = (id: string) => {
    try {
      deleteUser.mutateAsync(id).then(() => {
        showNotification({ message: 'User deleted successfully!', color: 'red' });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Table mt="xl" withTableBorder withColumnBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>№</Table.Th>
          <Table.Th>Photo</Table.Th>
          <Table.Th style={{ cursor: 'pointer' }} onClick={() => onSort('firstName')}>
            <Flex align={'center'} justify="space-between">
              First name{' '}
              {sort?.activeTitle === 'firstName' ? (
                sort?.order === 'asc' ? (
                  <IconSortAscending color="green" />
                ) : (
                  <IconSortDescending color="red" />
                )
              ) : null}
            </Flex>
          </Table.Th>
          <Table.Th style={{ cursor: 'pointer' }} onClick={() => onSort('lastName')}>
            <Flex align={'center'} justify="space-between">
              Last name{' '}
              {sort?.activeTitle === 'lastName' ? (
                sort?.order === 'asc' ? (
                  <IconSortAscending color="green" />
                ) : (
                  <IconSortDescending color="red" />
                )
              ) : null}
            </Flex>
          </Table.Th>
          <Table.Th style={{ cursor: 'pointer' }} onClick={() => onSort('createdAt')}>
            <Flex align={'center'} justify="space-between">
              Created at{' '}
              {sort?.activeTitle === 'createdAt' ? (
                sort?.order === 'asc' ? (
                  <IconSortAscending color="green" />
                ) : (
                  <IconSortDescending color="red" />
                )
              ) : null}
            </Flex>
          </Table.Th>
          <Table.Th>Phone number</Table.Th>
          <Table.Th style={{ cursor: 'pointer' }} onClick={() => onSort('country')}>
            <Flex align={'center'} justify="space-between">
              Country{' '}
              {sort?.activeTitle === 'country' ? (
                sort?.order === 'asc' ? (
                  <IconSortAscending color="green" />
                ) : (
                  <IconSortDescending color="red" />
                )
              ) : null}
            </Flex>
          </Table.Th>
          <Table.Th>User type</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {list?.map((user, index: number) => (
          <Table.Tr key={user?.id}>
            <Table.Td>{index + 1}</Table.Td>
            <Table.Td>
              <Image
                src={user?.avatar}
                w={80}
                h={80}
                fallbackSrc="https://placehold.co/600x400?text=Placeholder"
              />
            </Table.Td>
            <Table.Td>{user?.firstName}</Table.Td>
            <Table.Td>{user?.lastName}</Table.Td>
            <Table.Td>{formatDate(user?.createdAt, 'HH:mm - YYYY/MM/DD')}</Table.Td>
            <Table.Td>{user?.phoneNumber}</Table.Td>
            <Table.Td>{user?.country}</Table.Td>
            <Table.Td>
              {user?.isStaff ? (
                <Badge color="orange">Staff</Badge>
              ) : (
                <Badge color="green">Customer</Badge>
              )}
            </Table.Td>
            <Table.Td>
              <Flex gap={12}>
                <ActionIcon
                  variant="light"
                  color="green"
                  id="edit"
                  component={Link}
                  href={`edit-user/${user?.id}`}
                >
                  <IconEdit />
                </ActionIcon>
                <ActionIcon
                  variant="light"
                  color="red"
                  id="delete"
                  onClick={() => openModal(() => handleDelete(user?.id))}
                >
                  <IconTrash />
                </ActionIcon>
              </Flex>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
};

export default UserTable;
