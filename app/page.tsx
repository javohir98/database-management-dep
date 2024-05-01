'use client';

import { EmptyData, LoaderWithOverlay, StickyHeader, UserTable } from '@/components';
import { getUserList } from '@/services/query';
import { TOrderBy } from '@/types';
import { getPaginationCount } from '@/utils/pagination';
import {
  ActionIcon,
  Button,
  Container,
  Group,
  Pagination,
  ScrollArea,
  Select,
  TextInput,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconX } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [activePage, setActivePage] = useState(1);
  const [limit, setLimit] = useState('10');
  const [search, setSearch] = useState<string>('');
  const [orderBy, setOrderBy] = useState<TOrderBy>('createdAt');
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [debouncedSearchName] = useDebouncedValue(search, 200);

  const { data, isLoading } = getUserList({
    page: activePage,
    limit,
    search: debouncedSearchName,
    orderBy,
    order,
  });

  const handleSort = (value: TOrderBy) => {
    if (value === orderBy) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(value);
    }
  };

  return (
    <Container>
      <LoaderWithOverlay visible={isLoading} />

      <StickyHeader align="center" justify="space-between">
        <Group>
          <Select
            data={['10', '15', '20', '25']}
            value={limit}
            w={70}
            onChange={(value) => {
              if (value) setLimit(value);
            }}
          />
          <TextInput
            placeholder="Search"
            value={search}
            onChange={(event) => {
              setSearch(event?.currentTarget?.value);
              setActivePage(1);
            }}
            rightSection={
              search ? (
                <ActionIcon variant="transparent" onClick={() => setSearch('')}>
                  <IconX />
                </ActionIcon>
              ) : null
            }
          />
        </Group>

        <Button ml={'sm'} component={Link} href="add-user">
          Add user
        </Button>
      </StickyHeader>

      {data?.length ? (
        <ScrollArea w="100%">
          <UserTable
            list={data ?? []}
            sort={{
              activeTitle: orderBy,
              order: order,
            }}
            onSort={handleSort}
          />
        </ScrollArea>
      ) : (
        <EmptyData visible={!isLoading} />
      )}

      <Group justify="flex-end" my="xl">
        <Pagination total={getPaginationCount(100, +limit)} onChange={setActivePage} />
      </Group>
    </Container>
  );
}
