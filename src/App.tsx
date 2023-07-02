import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  firstName: string;
  lastName: string;
  age: number | null;
};

function App() {
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
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

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
            />
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => <Input {...field} />}
              rules={{ required: true, pattern: /^[A-Za-z]+$/i }}
            />
            {errors.lastName && <span>This field is required</span>}
            <Button type="submit">Submit</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default App;
