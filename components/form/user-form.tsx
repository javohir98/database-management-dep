'use client';

import { IUser, IUserForm } from '@/types';
import { navigate } from '@/utils/actions';
import {
  Box,
  Button,
  Container,
  Grid,
  Group,
  NumberInput,
  SegmentedControl,
  TextInput,
  Title,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { schema } from './schema';

type Props = {
  title: string;
  loading: boolean;
  initialValues?: IUser;
  onSubmit: (values: IUserForm) => Promise<void>;
};

const UserForm: React.FC<Props> = ({ loading, title, initialValues, onSubmit }) => {
  const [userType, setUserType] = useState<'Customer' | 'Staff'>('Customer');

  const form = useForm<IUserForm>({ validate: zodResolver(schema) });

  const handleSubmit = (values: typeof form.values) => {
    onSubmit(values).finally(() => navigate('/'));
  };

  useEffect(() => {
    if (initialValues) {
      form.setValues({
        firstName: initialValues?.firstName,
        lastName: initialValues?.lastName,
        country: initialValues?.country,
        phoneNumber: initialValues?.phoneNumber,
        isStaff: initialValues?.isStaff,
        staffId: initialValues?.staffId,
      });
      setUserType(initialValues?.isStaff ? 'Staff' : 'Customer');
    }
  }, [initialValues]);

  return (
    <Container pt={15} pb={15}>
      <Group justify="flex-start" mb={24}>
        <Button variant="outline" component={Link} href="/">
          <IconArrowLeft />
        </Button>
      </Group>

      <Title order={2} mb={15}>
        {title}
      </Title>

      <Box component="form" onSubmit={form.onSubmit(handleSubmit)}>
        <Grid>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              required
              label="First name"
              placeholder="First name"
              {...form.getInputProps('firstName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              required
              label="Last name"
              placeholder="Last name"
              {...form.getInputProps('lastName')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput label="Country" placeholder="Country" {...form.getInputProps('country')} />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <TextInput
              label="Phone number"
              placeholder="Phone number"
              {...form.getInputProps('phoneNumber')}
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
            <SegmentedControl
              mt="lg"
              fullWidth
              value={userType}
              data={['Staff', 'Customer']}
              onChange={(value) => {
                form.setFieldValue('isStaff', value === 'Staff' ? true : false);
                setUserType(value === 'Staff' ? 'Staff' : 'Customer');
              }}
            />
          </Grid.Col>
          {form.values?.isStaff && (
            <Grid.Col span={{ base: 12, md: 6, lg: 6 }}>
              <NumberInput
                hideControls
                label="Staff ID"
                placeholder="Staff ID"
                required={form.values?.isStaff}
                {...form.getInputProps('staffId')}
              />
            </Grid.Col>
          )}
        </Grid>

        <Group mt="md" justify={'flex-end'}>
          <Button type="submit" loading={loading}>
            Save
          </Button>
        </Group>
      </Box>
    </Container>
  );
};

export default UserForm;
