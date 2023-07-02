import { Box, Button, Flex, Input } from '@chakra-ui/react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
  firstName: string;
  lastName: string;
  age: number | null;
};

function App() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      age: null,
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('firstName'));

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
            <Input
              defaultValue="test"
              {...register('firstName', { maxLength: 20 })}
            />
            <Input
              {...register('lastName', {
                required: true,
                pattern: /^[A-Za-z]+$/i,
              })}
            />
            {errors.lastName && <span>This field is required</span>}
            <Input
              type="number"
              {...register('age', {
                required: true,
                min: 10,
                max: 100,
              })}
            />
            {errors.age && <span>This field is required</span>}
            <Button type="submit">Submit</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default App;
