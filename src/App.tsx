import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

type Inputs = {
  firstName: string;
  lastName: string;
  age: number | null;
};

function App() {
  const schema = z.object({
    firstName: z.string().min(5, 'Kok pendek banget namanya???'),
    lastName: z.string().nonempty('Jangan kosong weii'),
    age: z.number().nullable(),
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: null,
    },
    resolver: zodResolver(schema),
  });
  const onSubmit: SubmitHandler<Inputs> = (data) =>
    alert(JSON.stringify(data, undefined, 2));

  console.log(errors);

  return (
    <Box
      minH={'100vh'}
      width={'100vw'}
      backgroundColor="blue.900"
      color="white"
    >
      <Box width={500} marginInline="auto" paddingBlock={20}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={8} direction={'column'}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => <Input {...field} />}
              aria-invalid={errors.firstName ? 'true' : 'false'}
            />

            {errors.firstName && <span>{errors.firstName.message}</span>}
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input {...field} />}
              rules={{
                required: 'Wajib isi last name bruh',
                pattern: /^[A-Za-z]+$/i,
              }}
            />
            {errors.lastName && <span>{errors.lastName.message}</span>}
            <Button type="submit">Submit</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default App;
